import { connect } from "../../utils/connection";
const Jimp = require("jimp");

const createComradeCertificate = async (name, dept, comradeClass, date) => {
  const certificate = await Jimp.read("./public/fakeCert.png");
  // const font = await Jimp.loadFont("./public/test.fnt");
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

  const nameText = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  await certificate.scale(1.2);
  // certificate.print(font, 430, 110, nameText);
  certificate.print(
    font,
    0,
    110,
    {
      text: nameText,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      // alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    972,
    500
  );
  await certificate.scale(1.3);
  certificate.print(
    font,
    0,
    230 * 1.3,
    {
      text: dept,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      // alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    972 * 1.3,
    500
  );
  await certificate.scale(0.768);
  certificate.print(
    font2,
    0,
    262,
    {
      text: comradeClass,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      // alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    972,
    500
  );
  certificate.print(
    font2,
    0,
    535,
    {
      text: date,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      // alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    972,
    500
  );
  certificate.write(`./public/certificates/${nameText}.png`);

  return certificate;
};

const handler = async (req, res) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method = req.method;

  //function for catch errors
  const catcher = (error) => res.status(400).json({ error });

  // Potential Responses
  const handleCase = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req, res) => {
      createComradeCertificate(
        "John Doe",
        "Political Vawulence",
        "A",
        "2020-01-01"
      );
      res.json({ message: "hello" });
    },
    // RESPONSE POST REQUESTS
    POST: async (req, res) => {
      const { Comrade } = await connect(); // connect to database

      let { tag, name, choice, secondChoice } = req.body;
      name = name.toLowerCase();
      tag = tag.toLowerCase();
      choice = choice.toLowerCase();
      secondChoice = secondChoice.toLowerCase();

      const checkComrades = await Comrade.find({ tag });
      // console.log(checkComrades, "checkComrades");
      if (checkComrades && checkComrades.length > 0) {
        res.status(409).json({ error: "Comrade Already Exists" });
        return;
      }
      const randomCGPA = (upperLimit) => {
        const cgpas = [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 1];
        // return a random number between 0 and 5
        const lowerLimit =
          cgpas[Math.floor(Math.random() * (cgpas.length - 1))];
        let res = Math.random() * upperLimit + lowerLimit;
        // Round to two decimal places
        res = Math.round(res * 100) / 100;
        return res;
      };

      // Generate random department with high chance of being one of the choices
      const randomDepartment = (choice, secondChoice) => {
        let departments = [
          { name: "Pure and Applied Vawulence", weight: 1 },
          { name: "Vawulence & Communication", weight: 1 },
          { name: "Political Vawulence", weight: 1 },
          { name: "Industrial Vawulence", weight: 1 },
          { name: "Vawulence & Finance", weight: 1 },
          { name: "Vawulence Engineering", weight: 1 },
          { name: "International Vawulence", weight: 1 },
          { name: "Mass Vawulence", weight: 1 },
          { name: "Vawulence Studies", weight: 1 },
          { name: "Vawulence Education", weight: 1 },
          { name: "Advanced Vawulence", weight: 1 },
          { name: "Vawulence Arts", weight: 1 },
          { name: "Medical Vawulence", weight: 1 },
        ];
        let moreDepartments = [
          { name: "Vawulence & Law", weight: 1 },
          { name: "Vawulence & Science", weight: 1 },
          { name: "Bio-Vawulence", weight: 1 },
          { name: "Geo-Vawulence", weight: 1 },
          { name: "Enviromental Vawulence", weight: 1 },
          { name: "Marine Vawulence", weight: 1 },
          { name: "Vawutronics", weight: 1 },
        ];
        departments = departments.map((department) => {
          let size = 50;
          if (department.name === choice) {
            department.weight = department.weight * 26;
          }
          if (department.name === secondChoice) {
            department.weight = department.weight * 13;
          }
          department.weight = department.weight / 50;
          return department;
        });
        function weightedRandom(prob) {
          let i,
            sum = 0,
            r = Math.random();
          for (i in prob) {
            sum += prob[i].weight;
            if (r <= sum) return i;
            return 1;
          }
        }
        const res = weightedRandom(departments);
        return departments[res].name;
      };

      const department = randomDepartment(choice, secondChoice);
      const gpa = randomCGPA(1);
      const details = {
        // Remove spaces, numbers, and special characters from tag
        tag: name
          .toLowerCase()
          .replace(/\s/g, "")
          .replace(/\d/g, "")
          .replace(/[^a-zA-Z]/g, ""),
        name,
        department,
        gpa,
      };
      // console.log(details, "details");
      const newComrade = new Comrade(details);
      await newComrade
        .save()
        .then((comrade) => {
          res.status(200).json(comrade);
        })
        .catch(catcher);
      // res.json(await Comrade.create(req.body).catch(catcher))
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;

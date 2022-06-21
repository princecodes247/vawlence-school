import { connect } from "../../../utils/connection";
const Jimp = require("jimp");

const createComradeCertificate = async (
  name,
  dept,
  comradeClass,
  date,
  tag
) => {
  // console.log(__dirname);
  const certificate = await Jimp.read(
    "https://vawlence-school.vercel.app/fakeCert.png"
  );
  // const font = await Jimp.loadFont("./public/test.fnt");
  const font = await Jimp.loadFont(
    "https://vawlence-school.vercel.app/open-sans-32-black/open-sans-32-black.fnt"
  );
  const font2 = await Jimp.loadFont(
    "https://vawlence-school.vercel.app/open-sans-16-black/open-sans-16-black.fnt"
  );

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

  // certificate.write(`./public/certificates/${tag}.png`);

  return await certificate.getBase64Async(Jimp.MIME_PNG);

  // return "empty";
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
      const { tag } = req.query;
      // console.log("no na here");
      const { Comrade } = await connect(); // connect to database
      const comrades = await Comrade.find({ tag }) // get all comrades
        .then((comrades) => {
          // // console.log(comrades, "qwert")
          res.json(comrades);
        }) // return comrades
        .catch(catcher); // catch errorserr
    },
    // RESPONSE POST REQUESTS
    POST: async (req, res) => {
      const { Comrade } = await connect(); // connect to database

      let { tag, name, choice, secondChoice } = req.body;
      name = name.toLowerCase();
      tag = name
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/\d/g, "")
        .replace(/[^a-zA-Z]/g, "");
      choice = choice.toLowerCase();
      secondChoice = secondChoice.toLowerCase();

      const checkComrades = await Comrade.find({ tag });
      // console.log(checkComrades, "checkComrades");
      if (checkComrades && checkComrades.length > 0) {
        res.status(409).json({ error: "Comrade Already Exists" });
        return;
      }
      const randomCGPA = (upperLimit) => {
        const cgpas = [4, 4, 3, 3, 3, 3, 2, 2, 2, 1];
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
          { name: "Vawulence & Law", weight: 1 },
          { name: "Vawulence & Science", weight: 1 },
          { name: "Bio-Vawulence", weight: 1 },
          { name: "Geo-Vawulence", weight: 1 },
          { name: "Enviromental Vawulence", weight: 1 },
          { name: "Marine Vawulence", weight: 1 },
          { name: "Vawutronics", weight: 1 },
        ];
        const departmentsSize = departments.length - 2;
        const firstWeight = 15;
        const secondWeight = 10;
        departments = departments.map((department) => {
          if (department.name === choice) {
            department.weight = department.weight * firstWeight;
          }
          if (department.name === secondChoice) {
            department.weight = department.weight * secondWeight;
          }
          department.weight =
            department.weight / (departmentsSize + firstWeight + secondWeight);
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
        tag,
        name,
        department,
        gpa,
      };
      await createComradeCertificate(
        details.name,
        details.department,
        details.gpa >= 4.5
          ? "(First-Class)"
          : details.gpa >= 3.5
          ? "(Second-Class Upper)"
          : details.gpa >= 2.5
          ? "(Second-Class Lower)"
          : details.gpa >= 1.5
          ? "(Pass)"
          : "(Peace)",
        "",
        details.tag
      ).then((certificate) => {
        details.certificate = certificate;
      });
      // // console.log(details, "details");
      const newComrade = new Comrade(details);
      await newComrade
        .save()
        .then(async (comrade) => {
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

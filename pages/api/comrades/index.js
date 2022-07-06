import { connect } from "../../../utils/connection";

const handler = async (req, res) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method = req.method;

  //function for catch errors
  const catcher = (error) => res.status(400).json({ error });

  // Potential Responses
  const handleCase = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req, res) => {
      // return res.status(200).json("comrades");
      // console.log("no na here");
      const { Comrade } = await connect(); // connect to database
      Promise.all([
        Comrade.find({}, { certificate: 0 })
          .sort([["date", -1]])
          .limit(20),
        Comrade.countDocuments(),
      ])
        .then((result) => {
          console.log(result[1]);
          return res.status(200).json(result);
        }) // return comrades
        .catch(catcher); // catch errorserrx
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
      // choice = choice.toLowerCase();
      secondChoice = secondChoice.toLowerCase();

      const checkComrades = await Comrade.find({ tag });
      // console.log(checkComrades, "checkComrades");
      if (checkComrades && checkComrades.length > 0) {
        res.status(409).json({ error: "Comrade Already Exists" });
        return;
      }
      const randomCGPA = (upperLimit) => {
        const cgpas = [4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 1];
        // return a random number between 0 and 5
        const lowerLimit =
          cgpas[Math.floor(Math.random() * (cgpas.length - 1))];
        let res = Math.random() * upperLimit + lowerLimit;
        // Round to two decimal places
        res = Math.round(res * 100) / 100;
        Number.parseFloat(res.toString());
        return res;
      };

      // Generate random department with high chance of being one of the choices
      const randomDepartment = (choice, secondChoice) => {
        let departments = [
          { name: "Advanced Vawulence", weight: 1 },
          { name: "Astrovawulence", weight: 1 },
          { name: "Bio-Vawulence", weight: 1 },
          { name: "Business Vawulence", weight: 1 },
          { name: "Criminal Vawolence", weight: 1 },
          { name: "Data & Vawulence Structures", weight: 1 },
          { name: "Enviromental Vawulence", weight: 1 },
          { name: "Geo-Vawulence", weight: 1 },
          { name: "Health & Vawulence", weight: 1 },
          { name: "Industrial Vawulence", weight: 1 },
          { name: "International Vawulence", weight: 1 },
          { name: "Vawulence & Literature", weight: 1 },
          { name: "Marine Vawulence", weight: 1 },
          { name: "Mass Vawulence", weight: 1 },
          { name: "Medical Vawulence", weight: 1 },
          { name: "Political Vawulence", weight: 1 },
          { name: "Pure and Applied Vawulence", weight: 1 },
          { name: "Vawulence Arts", weight: 1 },
          { name: "Vawulence & Communication", weight: 1 },
          { name: "Vawulence Education", weight: 1 },
          { name: "Vawulence Engineering", weight: 1 },
          { name: "Vawulence & Finance", weight: 1 },
          { name: "Vawulence & Law", weight: 1 },
          { name: "Vawulence & Nutrition", weight: 1 },
          { name: "Vawulence & Science", weight: 1 },
          { name: "Vawulence Studies", weight: 1 },
          { name: "Vawulence and Philosophy", weight: 1 },
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
            return -1;
          }
        }
        const res = weightedRandom(departments);
        if (res == -1) return choice;
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
    PUT: async (req, res) => {
      const { Comrade } = await connect(); // connect to database
      const { tag, cgpa } = req.body;
      const comrade = await Comrade.findOne({ tag });
      if (!comrade) {
        res.status(404).json({ error: "Comrade Not Found" });
        return;
      }
      comrade.gpa = cgpa;

      await comrade.save().then(async (comrade) => {
        res.status(200).json(comrade);
      });
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) await response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;

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
      const { Comrade } = await connect(); // connect to database
      const comrades = await Comrade.find() // get all comrades
        .then((comrades) => {
          // console.log(comrades, "qwert")
          res.json(comrades);
        }) // return comrades
        .catch(catcher); // catch errors
    },
    // RESPONSE POST REQUESTS
    POST: async (req, res) => {
      const { Comrade } = await connect(); // connect to database


      let { name, choice, secondChoice } = req.body;
      name = name.toLowerCase();
      choice = choice.toLowerCase();
      secondChoice = secondChoice.toLowerCase();

      const checkComrades = await Comrade.find({ name });
      console.log(checkComrades, "checkComrades");
      if (checkComrades && checkComrades.length > 0) {
        res.status(409).json({ error: "Comrade Already Exists" });
        return;
      }
      const randomCGPA = (upperLimit) => {
        const cgpas = [4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 1];
        // return a random number between 0 and 5
        const lowerLimit = cgpas[Math.floor(Math.random() * (cgpas.length-1))]
        let res = Math.random() * upperLimit + lowerLimit;
        // Round to two decimal places
        res = Math.round(res * 100) / 100;
        return res;
      };

      
      // Generate random department with high chance of being one of the choices
      const randomDepartment = (choice, secondChoice) => {
        let departments = [
          {name: "Pure and Applied Vawulence", weight: 1},
          {name: "Vawulence & Communication", weight: 1},
          {name: "Political Vawulence", weight: 1},
          {name: "Industrial Vawulence", weight: 1},
          {name: "Vawulence & Finance", weight: 1},
          {name: "Vawulence Engineering", weight: 1},
          {name: "International Vawulence", weight: 1},
          {name: "Mass Vawulence", weight: 1},
          {name: "Vawulence Studies", weight: 1},
          {name: "Vawulence Education", weight: 1},
          {name: "Advanced Vawulence", weight: 1},
          {name: "Vawulence Arts", weight: 1},
          {name: "Medical Vawulence", weight: 1},
        ];
        departments = departments.map((department) => {
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
          let i, sum=0, r=Math.random();
          for (i in prob) {
            sum += prob[i].weight;
            if (r <= sum) return i;
          }
      
        }
        const res = weightedRandom(departments)
        return departments[res].name;
      };
      
      const department = randomDepartment("Vawulence & Communication", "Vawulence Education")
      const gpa = randomCGPA(1);
      const details = {
        name,
        department,
        gpa,
      }
      console.log(details, "details");
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

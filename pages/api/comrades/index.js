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

      let { name, department, degree } = req.body;
      name = name.toLowerCase();
      degree = degree.toLowerCase();

      const checkComrades = await Comrade.find({ name });
      if (checkComrades) {
        res.status(400).json({ error: "Comrade Already Exists" });
        return;
      }
      // Create random GPA from degree
      let upper = 1;
      let lower = 1;
      if (degree.includes("first")) {
        upper = 0.5;
        lower = 4.5;
      } else if (degree.includes("upper")) {
        lower = 3.49;
      } else if (degree.includes("lower")) {
        lower = 2.49;
      } else if (degree.includes("pass")) {
        lower = 0.49;
      } else if (degree.includes("withdrawn")) {
        upper = 0.49;
        lower = 0;
      } else {
        upper = -4;
        lower = 1;
      }
      const gpa = Math.random() * upper + lower;
      const newComrade = new Comrade({ name, department, degree, gpa });
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

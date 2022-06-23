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

  // GRAB ID FROM req.query (where next stores params)
  const id = req.query.id;

  // Potential Responses for /todos/:id
  const handleCase = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req, res) => {
      const { id } = req.query;
      const { Comrade } = await connect(); // connect to database
      // console.log("na here", id)
      await Comrade.findOne({ tag: id })
        .then(async (comrade) => {
          res.json(comrade);
          // console.log("comrade", comrade);
          // let certificate = await createComradeCertificate(
          //   comrade.name,
          //   comrade.department,
          //   comrade.gpa >= 4.5
          //     ? "(First-Class)"
          //     : comrade.gpa >= 3.5
          //     ? "(Second-Class Upper)"
          //     : comrade.gpa >= 2.5
          //     ? "(Second-Class Lower)"
          //     : comrade.gpa >= 1.5
          //     ? "(Pass)"
          //     : "(Peace)",
          //   "",
          //   comrade.tag
          // ).then(async (cert) => {
          //   // console.log("comrade", comrade.comradeClass);
          //   res.json({ comrade, certificate: cert });
          //   // return cert;
          // });
        })
        .catch(catcher);
    },
    // RESPONSE PUT REQUESTS
    PUT: async (req, res) => {
      const { Comrade } = await connect(); // connect to database
      res.json(
        await Comrade.findByIdAndUpdate(id, req.body, { new: true }).catch(
          catcher
        )
      );
    },
    // RESPONSE FOR DELETE REQUESTS
    DELETE: async (req, res) => {
      const { Comrade } = await connect(); // connect to database
      res.json(await Comrade.findByIdAndRemove(id).catch(catcher));
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;

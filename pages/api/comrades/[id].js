import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req, res) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method = req.method

  //function for catch errors
  const catcher = (error) => res.status(400).json({ error })

  // GRAB ID FROM req.query (where next stores params)
  const id = req.query.id;

  // Potential Responses for /todos/:id
  const handleCase = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req, res) => {
      const { Comrade } = await connect() // connect to database
      res.json(await Comrade.findById(id).catch(catcher))
    },
    // RESPONSE PUT REQUESTS
    PUT: async (req, res) => {
      const { Comrade } = await connect() // connect to database
      res.json(
        await Comrade.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
      )
    },
    // RESPONSE FOR DELETE REQUESTS
    DELETE: async (req, res) => {
      const { Comrade } = await connect() // connect to database
      res.json(await Comrade.findByIdAndRemove(id).catch(catcher))
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler
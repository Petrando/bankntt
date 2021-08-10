import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const interests = await getInterests();  
        res.json(interests);
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
  }

const getInterests = async () => {
	const { db } = await connectToDatabase();
  
	const interests = await db
	  .collection("interests")
	  .find({})
	  .toArray();
  
	return interests;
}
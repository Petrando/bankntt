import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/mongodb";
//var ObjectID = require('mongodb').ObjectID;

export default async function handler(req, res) {
    console.log(req.body);
    try {
        const updateResult = await updateInterests(req.body);  
        const  {modifiedCount} = updateResult;
        
        res.json({message:modifiedCount===1?"success":"not updated"});
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
  }

const updateInterests = async (updateData) => {
	const { db } = await connectToDatabase();
  
	const updatedInterest = await db
	  .collection("interests")
	  .updateOne(
        { _id: new ObjectId(updateData._id) },
        {
          $set: {rates:updateData.rates },
          $currentDate: { lastModified: true }
        }
     )
  
	return updatedInterest;
}
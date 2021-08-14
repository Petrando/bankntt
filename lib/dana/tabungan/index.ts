
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../mongodb";

export const getSavings = async () => {
	const { db } = await connectToDatabase();
  
	const savings = await db
	  .collection("tabungan")
	  .find({})
	  .toArray();
  
	return savings;
}

export const updateSaving = async (updateData) => {
	const { db } = await connectToDatabase();
  
	const updatedSaving = await db
	  .collection("tabungan")
	  .updateOne(
        { _id: new ObjectId(updateData._id) },
        {
          $set: {rates:updateData.rates },
          $currentDate: { lastModified: true }
        }
     )
  
	return updatedSaving;
}

export const deleteSaving = async (_id) => {
	const { db } = await connectToDatabase();
  
	const deletedSaving = await db
	  .collection("tabungan")
	  .deleteOne(
        { _id: new ObjectId(_id) }
     )
  
	return deletedSaving;
}


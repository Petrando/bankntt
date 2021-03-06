import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../mongodb";
//import { savingI, interestI } from "../../../types";

interface savingProjectionI {
	_id?:number;
	name?:number;
	about?:number;
	photo?:number;
	termsFeatures?:number;
}

export const getSavings = async (projection?:savingProjectionI) => {
	const { db } = await connectToDatabase();
  
	const savings = projection?
		await db
	  		.collection("tabungan")
	  		.find({})
			.project({...projection})
	  		.toArray()
		:
		await db
	  		.collection("tabungan")
	  		.find({})
	  		.toArray();
  
	return savings;
}

export const getSampleSavings = async () => {
	const { db } = await connectToDatabase();

	const sampleSavings = await db
		.collection("tabungan")
		.aggregate(
			[ { $sample: { size: 4 } } ]
		)
		.toArray();

	sampleSavings.forEach(d=>{
		d._id = d._id.toString();
		//d.photo = JSON.stringify(d.photo);
	});

	return sampleSavings;
}

export const getDataForFrontpage = async () => {
	const sampleSavings = await getSampleSavings();

	const { db } = await connectToDatabase();	
  
	const interests = await db
	  .collection("interests")
	  .find({})
	  .project({lastModified:0})
	  .toArray();

	interests.forEach(d => {
		d._id = d._id.toString();
	})

	return {savings:sampleSavings, interests};
}

export const getAllTabunganIds = async ():Promise<{params:{id:string}}[]> => {;
	const { db } = await connectToDatabase();
  
	const savings = await db
	  		.collection("tabungan")
	  		.find({})
			.project({name:0, about:0, photo:0, termsFeatures:0})
	  		.toArray()

	const formattedSavings = savings.map(d=> {
		return {			
			params:{
				id:d._id.toString()
			}
		}
	})

	return formattedSavings;
}

export const getTabunganData = async (id:string) => {
	const { db } = await connectToDatabase();

	const savingData = await db
		.collection("tabungan")
		.find({_id: new ObjectId(id)})
		.toArray();
	
	savingData[0]._id = savingData[0]._id.toString();
	savingData[0].photo = JSON.stringify(savingData[0].photo);
	return savingData[0];
}

export const getSavingGalleryData = async (projection:savingProjectionI) => {
	const { db } = await connectToDatabase();
  
	const savings = await db
	  .collection("tabungan")
	  .find({})
	  .project({...projection})
	  .toArray();

	savings.forEach(element => {
		element._id = element._id.toString();
	});
	return savings;
}

export const getSavingPhoto = async (id:string) => {
	const { db } = await connectToDatabase();

	const savingPhoto = await db
	  .collection("tabungan")
	  .find({_id: new ObjectId(id)})
	  .project({_id:0, name:0, about:0, termsFeatures:0})
	  .toArray();

	return savingPhoto[0];
}

export const addASaving = async (newSavingData) => {
	const { db } = await connectToDatabase();

	const newSaving = await db
		.collection("tabungan")
		.insertOne( { ...newSavingData} );

	return newSaving;
}

export const updateSaving = async (id, updateData) => {
	const { db } = await connectToDatabase();
  
	const updatedSaving = await db
	  .collection("tabungan")
	  .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: { ...updateData },
        }
     )
  
	/*{
          $set: {rates:updateData.rates },
          $currentDate: { lastModified: true }
        }
		*/
	return updatedSaving;
}

export const deleteSaving = async (id) => {
	const { db } = await connectToDatabase();
	const deletedSaving = await db
	  .collection("tabungan")
	  .deleteOne(
        { _id: new ObjectId(id) }
     )
  
	return deletedSaving;
}


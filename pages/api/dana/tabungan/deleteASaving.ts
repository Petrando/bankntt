import { deleteSaving } from "../../../../lib/dana/tabungan";

export  default async function deleteASaving(req, res) {
    try {
        const deleteResult = await deleteSaving(req.body._id);  
        //const  {modifiedCount} = updateResult;
        
        //res.json({message:modifiedCount===1?"success":"not updated"});
        res.json({message:"deleted"});
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
}
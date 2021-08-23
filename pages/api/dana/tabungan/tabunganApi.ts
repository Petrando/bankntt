import { getSavings, updateSaving, deleteSaving } from "../../../../lib/dana/tabungan";

export async function savingList(req, res) {
    try {
        const savings = await getSavings();  
        res.json(savings);
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
}

/*
export  async function updateSavingData(req, res) {
    try {
        const updateResult = await updateSaving(req.body);  
        const  {modifiedCount} = updateResult;
        
        res.json({message:modifiedCount===1?"success":"not updated"});
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
}*/

export  async function deleteASaving(req, res) {
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
import { updateSaving } from "../../../../lib/dana/tabungan";

export  async function updateSavingData(req, res) {
    try {
        const updateResult = await updateSaving(req.body);  
        const  {modifiedCount} = updateResult;
        
        res.json({message:modifiedCount===1?"success":"not updated"});
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
}
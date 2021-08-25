import { NextApiRequest, NextApiResponse } from 'next'
import { deleteSaving } from "../../../../lib/dana/tabungan";

export  default async function deleteASaving(req:NextApiRequest, res:NextApiResponse) {
    const {id} = JSON.parse(req.body);
    
    try {
        const deleteResult = await deleteSaving(id); 
        const {deletedCount} = deleteResult;
        res.json({message:deletedCount===1?"success":"failed to delete"});
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
}
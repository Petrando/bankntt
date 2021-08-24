import { NextApiRequest, NextApiResponse } from 'next'
import { deleteSaving } from "../../../../lib/dana/tabungan";

export  default async function deleteASaving(req:NextApiRequest, res:NextApiResponse) {
    try {
        const deleteResult = await deleteSaving(req.body._id);  
        console.log(deleteResult);
        res.json({message:"deleted"});
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
}
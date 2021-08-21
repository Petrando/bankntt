import { NextApiRequest, NextApiResponse } from 'next'
import { getSavingPhoto } from "../../../../lib/dana/tabungan";

export default async function getPhoto(req:NextApiRequest, res:NextApiResponse) {
    const {id} = JSON.parse(req.body)
    try {
        const photo = await getSavingPhoto(id);  
        console.log(photo);
        console.log(typeof photo);
        
        //res.json({message:modifiedCount===1?"success":"not updated"});
        res.json(photo.photo);
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
}
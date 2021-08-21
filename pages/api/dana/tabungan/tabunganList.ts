import { NextApiRequest, NextApiResponse } from 'next'
import { getSavings } from "../../../../lib/dana/tabungan";

export default async function savingList(req:NextApiRequest, res:NextApiResponse) {
    
    const projection = req.body === "" ?{}:JSON.parse(req.body).projection;
    try {
        const savings = await getSavings(projection);  
        res.json(savings);
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
}
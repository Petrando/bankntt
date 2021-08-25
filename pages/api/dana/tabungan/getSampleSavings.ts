import { NextApiRequest, NextApiResponse } from 'next'
import { getSampleSavings } from "../../../../lib/dana/tabungan";


export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try {
        const savings = await getSampleSavings();  
        res.json(savings);
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
  }
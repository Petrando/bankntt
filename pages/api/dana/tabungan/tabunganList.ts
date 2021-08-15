import { getSavings } from "../../../../lib/dana/tabungan";

export default async function savingList(req, res) {
    try {
        const savings = await getSavings();  
        res.json(savings);
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
}
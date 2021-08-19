const formidable = require('formidable');
import { NextApiRequest, NextApiResponse } from 'next'
import { addASaving } from "../../../../lib/dana/tabungan";

async function addSaving(req:NextApiRequest, res:NextApiResponse) {
    try {
        const form = new formidable.IncomingForm({ keepExtensions: true });
        form.parse(req, async function (err, fields:{name:string, about:string, termsFeatures:string}, files:{photo:File}) {
          if (err) {

          } 
          const {name, about, termsFeatures} = fields;
          const termsNFeatures = JSON.parse(termsFeatures);

          const newSavingData:{name?:string, about?:string, termsFeatures?:any, photo?:any} = {}
          newSavingData.name = name;
          newSavingData.about = about;
          if(termsNFeatures.length > 0){
            newSavingData.termsFeatures = termsNFeatures;
          }
          newSavingData.photo = files.photo;
          const addResult = await addASaving(newSavingData);  
          const  {insertedId} = addResult;
        
          res.json({message:insertedId && (insertedId!=="" || insertedId!==null)?"success":"not added"});
        });
        //res.json({message:"Try play"});
      } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
      }
      
}
    
export const config = {
    api: {
      bodyParser: false,
    },
};

export default addSaving;
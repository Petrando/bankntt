const fs = require('fs');
const formidable = require('formidable');
import { NextApiRequest, NextApiResponse } from 'next'
import { addASaving } from "../../../../lib/dana/tabungan";

async function addSaving(req:NextApiRequest, res:NextApiResponse) {
    try {
        const form = new formidable.IncomingForm({ keepExtensions: true });
        form.parse(req, async function (err, fields:{name:string, about:string, termsFeatures:string, photoDimension:string}, files:{photo:any}) {
          if (err) {

          } 
          const {name, about, termsFeatures, photoDimension} = fields;
          const termsNFeatures = JSON.parse(termsFeatures);

          const newSavingData:{name?:string, about?:string, termsFeatures?:any, photo?:{data?:any, contentType?:any, width?:number, height?:number}} = {}
          newSavingData.name = name;
          newSavingData.about = about;
          if(termsNFeatures.length > 0){
            newSavingData.termsFeatures = termsNFeatures;
          }
          
          newSavingData.photo = {};
          newSavingData.photo.data = fs.readFileSync(files.photo.path);
          newSavingData.photo['Content-Type'] = files.photo.type;
          const {width, height} = JSON.parse(photoDimension);
          newSavingData.photo.width = width;
          newSavingData.photo.height = height;
          const addResult = await addASaving(newSavingData);  
          const  {insertedId} = addResult;
        
          res.json({message:insertedId && (insertedId!=="" || insertedId!==null)?"success":"not added"});                
        });
        
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

function photoDimension(photoDimension: any): { width: any; height: any; } {
  throw new Error('Function not implemented.');
}

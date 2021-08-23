const fs = require('fs');
const formidable = require('formidable');
import { NextApiRequest, NextApiResponse } from 'next'
import { updateSaving } from "../../../../lib/dana/tabungan";

export default async function updateSavingData(req:NextApiRequest, res:NextApiResponse) {
    try {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      form.parse(req, async function (err, fields:{id:string, name:string, about:string, termsFeatures:string, photoDimension:string}, files:{photo:any}) {
        if (err) {

        } 
        const {id, name, about, termsFeatures, photoDimension} = fields;
        const termsNFeatures = JSON.parse(termsFeatures);

        const updatedSavingData:{name?:string, about?:string, termsFeatures?:any, photo?:{data?:any, contentType?:any, width?:number, height?:number}} = {}
        updatedSavingData.name = name;
        updatedSavingData.about = about;
        if(termsNFeatures.length > 0){
          updatedSavingData.termsFeatures = termsNFeatures;
        } 
        
        if(files.photo){
          updatedSavingData.photo = {};
          updatedSavingData.photo.data = fs.readFileSync(files.photo.path);
          updatedSavingData.photo['Content-Type'] = files.photo.type;
          const {width, height} = JSON.parse(photoDimension);
          updatedSavingData.photo.width = width;
          updatedSavingData.photo.height = height;
        }
      
        const updateResult = await updateSaving(id, updatedSavingData);  
        console.log(updateResult);
        const { modifiedCount } = updateResult
              
        res.json({message:modifiedCount===1?"success":"not added"});                
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
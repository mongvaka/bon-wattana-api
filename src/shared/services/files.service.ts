import { constants } from 'buffer';
import * as fs from 'fs'
import { v4 as uuid } from 'uuid';
export function saveFile(
    fileDataBase64: string,moduleName:string
  ):string {
    const path: string = `public/uploads/${moduleName}`
    const fileName = uuid()

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
    const writeStream = fs.createWriteStream(
      `${path}/${fileName}.txt`
    );
      writeStream.write(`${fileDataBase64}`);
 
    writeStream.on("error", (error) => {
      console.log("Error : ", error);
    });
    writeStream.end();
    return fileName;
  }
export async function savefileWithName(fileDataBase64: string,fileName:string,moduleName:string):Promise<boolean>{
  const path: string = `public/uploads/${moduleName}`

  if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    // let buff =  Buffer.allocUnsafe(constants.MAX_LENGTH).re;

    // fs.writeFileSync('fileName', buff.toString());


  //  let binaryData  =   new Buffer(fileDataBase64, 'base64').toString('binary');

// fs.writeFile(fileName, binaryData, "binary", function (err) {
//     console.log(err); // writes out file without error, but it's not a valid image
// });

fs.writeFile(`${path}/${fileName}`, fileDataBase64, 'base64', (err) => {
  console.log(err);
  return false;
});
  // const writeStream = fs.createWriteStream(
  //   `${path}/${fileName}`
  // );
  //   writeStream.write(`${fileDataBase64}`);

  // writeStream.on("error", (error) => {
  //   console.log("Error : ", error);
  //   return false
  // });
  // writeStream.end();
  return true
}
export async function removeFileWithName(fileName:string,moduleName:string) {
  const path: string = `public/uploads/${moduleName}`
  fs.unlink(`${path}/${fileName}`,(err)=>{
  if(err){
      return false
  }
  })

return true;
}
export async function readFileToBase64WithName(fileName:string,moduleName:string):Promise<string>{
  const path: string = `public/uploads/${moduleName}`

 const base64File = await fs.readFileSync(`${path}/${fileName}`,'base64');
  return base64File;
}
export   async function removeFile(fileName:string,moduleName:string):Promise<boolean>{

        const path: string = `public/uploads/${moduleName}`
        fs.unlink(`${path}/${fileName}.txt`,(err)=>{
        if(err){
            return false
        }
        })
    return true;
      }

export async function readFileToBase64(fileName:string,moduleName:string):Promise<string>{
        const path: string = `public/uploads/${moduleName}`
    
       const base64File = await fs.readFileSync(`${path}/${fileName}.txt`,'utf8');
        return base64File;
      }
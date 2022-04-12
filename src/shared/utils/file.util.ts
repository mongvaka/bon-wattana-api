import * as fs from 'fs';
import * as path from 'path';

export const write = (filename: string, body: string) => {
  fs.writeFile(filename, body, function(err) {
    if (err) {
      return console.error(err);
    }
  });
};

export const removeFile = (pathFile: string) => {
  try{
    fs.unlink(pathFile, function(err) {
      if (err) {
        return console.error(err);
      }
    });
  }catch (e) {
    console.log(e)
  }
};
import fs from 'fs'

// write app info to json file
export default function writeAppInfo(apps: Array<AppList> | any, file: string){
  let fd = fs.openSync(file,'r+')
  let rawFileData = fs.readFileSync(fd)

  if(rawFileData === null){
    console.log('an error ocurred while reading apps.json file')
    return
  }

  try{
       
    fs.writeFileSync(file,JSON.stringify(apps,null,2))
    console.log('apps.json updated succefully')
    
    fs.closeSync(fd)
  }catch(err){
    throw err
  }

  return
}

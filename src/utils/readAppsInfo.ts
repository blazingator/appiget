import fs from 'fs'

export const apps = readAppsInfo()
export const filePath = `${process.env.HOME}/.config/appiget/apps.json`

export default function readAppsInfo(){
  let fd = fs.openSync(`${process.env.HOME}/.config/appiget/apps.json`
,'r')
  let rawFileData = fs.readFileSync(fd)

  if(rawFileData === null){
    console.log('an error ocurred while reading apps.json file')
    return
  }

  try{
    let currentFileData = JSON.parse(rawFileData.toString())
    fs.closeSync(fd)
    return currentFileData
  }catch(err){
    throw err
  }
}



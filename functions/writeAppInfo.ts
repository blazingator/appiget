import fs from 'fs'

// write app info to json file
export default function writeAppInfo(app: AppList, file: string){
  let fd = fs.openSync(file,'r+')
  let rawFileData = fs.readFileSync(fd)

  if(rawFileData === null){
    console.log('an error ocurred while reading apps.json file')
    return
  }

  try{
    let currentFileData = JSON.parse(rawFileData.toString())
    let newFileData = currentFileData.map((a: any) => {
      if(a.user === app.user &&
        a.repo === app.repo){
        return app
      }
      return a
    })
    
    fs.writeFileSync(file,JSON.stringify(newFileData,null,2))
    console.log('apps.json updated succefully')
    
    fs.closeSync(fd)
  }catch(err){
    throw err
  }

  return
}

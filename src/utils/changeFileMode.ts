import fs, { promises as fsPromises } from 'fs'

export default function changeFilePermissions(appFilePath: string){
  fsPromises.access(appFilePath, fs.constants.X_OK)
    .then(() => {
      try{
        fs.chmodSync(appFilePath, 0o711)
        console.log("Changed file permissions sucessfully")
      }catch(err){
        throw err
      }
    })
    .catch(err => console.log('Could not access file'))
}

import fs from 'fs'
import axios from 'axios'
import ProgressBar from 'progress'

import { apps, filePath } from '../utils/readAppsInfo'
import singleArrayToObject from '../utils/singleArrayToObject'
import getAppInfo from './getAppInfo'
import writeAppInfo from './writeAppInfo'

const INSTALL_DIR = `${process.env.HOME}/Appimage/`
//const SYMLINK = true

export default async function installApp(app: string){
  let appInfo = apps.filter((a: AppList) => a.repo === app)
    .reduce(singleArrayToObject)

  if(appInfo.assetURL === '?'){
    appInfo = await getAppInfo(app, true)
  }

  const file_name = `${app}.AppImage`.toLowerCase()
  let file = fs.createWriteStream(INSTALL_DIR+file_name)

  const { data, headers } = await axios({
    url: appInfo.assetURL,
    method: 'GET',
    responseType: 'stream'
  })

  const totalLength = headers['content-length']
  console.log(`Downloading ${file_name} ${appInfo.latest}`)

  const progessBar = new ProgressBar('-> [:bar] :percent :etas',{
    width: 40,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 1,
    total: parseInt(totalLength)
  })

  data.on('data', (chunk: any) => progessBar.tick(chunk.length))
  data.pipe(file)

  data.on('end', () => {
  	changeFilePermissions(INSTALL_DIR+file_name)
    file.close()
    
    appInfo = apps.map((a: AppList) => {
      if(a.repo === appInfo.repo){
        a.versionInstalled = appInfo.latest
      }
      return a
    })
    
    writeAppInfo(appInfo, filePath)
  })
 
}

function changeFilePermissions(appFilePath: string){
  try{
  	fs.chmodSync(appFilePath, 0o711)
  	console.log("Changed file permissions sucessfully")
  }catch(err){
  	throw err
  }
}

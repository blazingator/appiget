import api from '../services/ghapi'
import singleArrayToObject from '../utils/singleArrayToObject'
import writeAppInfo from './writeAppInfo'

import apps from '/home/vinicius/.config/appiget/apps.json'

export default async function getAppInfo(app: string){
  let appInfo = apps.filter((a: AppList) => a.repo === app)
    .reduce(singleArrayToObject)
  
  let releaseInfo = Array<ReleaseInfo>()

  try{
    releaseInfo = await api.get(`repos/${appInfo.user}/${appInfo.repo}/releases`)
      .then(res => res.data)
  }catch(err){
    console.log(err.message)
  }

  let releases = releaseInfo.map((r: ReleaseInfo) => {
    return {
      url: r.url,
      tag_name: r.tag_name,
      assets: r.assets.map(a => {
        const { name, browser_download_url } = a
        return { name, browser_download_url }
      })
    }
  })
 
  let {tag_name, assets} = releases[0]
 
  let regex =/.*((amd64)|x(86[\-,\_]?)?64)?(?<!x86)(?<!arm.*)\.appimage$/gi
 
  let asset = assets.map(a => a.name)
    .filter(n => n.match(regex))
    .reduce(singleArrayToObject)
  
  let downloadURL = `https://github.com/${appInfo.user}/${appInfo.repo}/releases/download/${tag_name}/${asset}`
  
  console.log(`
 Name               : ${app}
 latest version     : ${tag_name}
 Installed version  : ${appInfo.versionInstalled}
 Packed by          : ${appInfo.user}
 URL                : https://github.com/${appInfo.user}/${appInfo.repo}
 DownloadURL        : ${downloadURL}
`)

  let { user, repo, versionInstalled } = appInfo
  let fetchedAppInfo = {
    user,
    repo,
    latest: tag_name,
    versionInstalled,
    assetURL: downloadURL
  }

  writeAppInfo(fetchedAppInfo, `${process.env.HOME}/.config/appiget/apps.json`)

}

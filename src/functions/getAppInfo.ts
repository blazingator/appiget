import api from '../services/ghapi'
import singleArrayToObject from '../utils/singleArrayToObject'

import { apps } from '../utils/readAppsInfo'

export default async function getAppInfo(app: string, sync: boolean = false){
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
  
  let { user, repo, versionInstalled } = appInfo
  
  if(sync){
    let fetchedAppInfo = {
      user,
      repo,
      latest: tag_name,
      versionInstalled,
      assetURL: downloadURL
    }

    return fetchedAppInfo
  }
     
  console.log(`
 Name               : ${app}
 latest version     : ${tag_name}
 Installed version  : ${appInfo.versionInstalled}
 Packed by          : ${appInfo.user}
 URL                : https://github.com/${appInfo.user}/${appInfo.repo}
 DownloadURL        : ${downloadURL}
`)

}

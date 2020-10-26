import api from '../services/ghapi'

import appsinstalled from '../apps.json'

export default async function getAppInfo(app: string){
  let appInfo = appsinstalled.filter((a: AppsInstalled) => a.repo === app)
    .reduce((result: any,item: string,index: number) => {
      result[index] = item
      return result
    })
  
  let releaseInfo = Array<ReleaseInfo>()

  try{
    releaseInfo = await api.get(`repos/${appInfo.user}/${appInfo.repo}/releases`).then(res => res.data)
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

  let latestRelease = releases[0]
  
  console.log(`
 Name: ${app}
 latest version: ${latestRelease.tag_name}
 Installed version: ${appInfo.versionInstalled}
 Packed by: ${appInfo.user}
 Github repo: https://github.com/${appInfo.user}/${appInfo.repo}
    `)
}

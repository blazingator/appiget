// import api from '../services/ghapi'
import apps from '../apps.json'


export default async function listApps(){
  apps.forEach((a: AppsInstalled) => {
    console.log(`
  User/app - version
  ${a.user}/${a.repo} - ${a.versionInstalled}`)
  })
}

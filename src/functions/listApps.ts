// import api from '../services/ghapi'
import { apps } from '../utils/readAppsInfo'

export default async function listApps(){
  apps.forEach((a: AppList) => {
  console.log(`
  User     /  app     - latest version
  ${a.user}/${a.repo} - ${a.latest}`)
  })
}

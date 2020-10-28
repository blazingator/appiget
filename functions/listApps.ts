// import api from '../services/ghapi'
import apps from '/home/vinicius/.config/appiget/apps.json'


export default async function listApps(){
  apps.forEach((a: AppList) => {
  console.log(`
  User     /  app     - latest version
  ${a.user}/${a.repo} - ${a.latest}`)
  })
}

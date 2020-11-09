import { apps, filePath } from '../utils/readAppsInfo'
import getAppInfo from './getAppInfo'
import writeAppInfo from './writeAppInfo'

export default function syncAppsInfo(){
  const resolvePromises = apps.map((a: AppList) => {
    return getAppInfo(a.repo, true)
  })

  console.log('Fetching apps release info')

  Promise.all(resolvePromises)
    .then((results: AppList[] | any) => {
      let data: AppList[] = []
      data = results
      if(!data){
        console.log('An unexpected error ocurred when fetching apps info')
        return
      }
      writeAppInfo(data, filePath)
    }) 
}

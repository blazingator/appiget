import { getAppInfo, listApps } from './functions'

const { argv } = process
const [option, app] = argv.slice(2)

function displayHelp(){
  const helpMessage = `
 appiget - Custom AppImage manager

 -U, --update <app> Update an app
 -I, --info <app> Displays information about an app
 -h, --help <app> Display help`
  
  console.log(helpMessage)
}


// function installApp(app: string){
  
// }

if(argv.length === 2) displayHelp()

switch(option){
  case '-h':
  case '--help':
    displayHelp()
    break
  case '':
    displayHelp()
    break
  case '-I':
  case '--info':
    getAppInfo(app)
    break
  case '-L':
  case '--list':
    listApps()
  default:
    break
}


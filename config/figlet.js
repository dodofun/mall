import figlet from 'figlet'
import pkgData from '../package.json'

export const printFiglet = () => {
  figlet(pkgData.name, function (err, data) {
    if (err) {
      console.log('Something went wrong...')
      console.dir(err)
      return
    }
    console.log(data)
  })
}

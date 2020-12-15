import {useEffect} from 'react'
import './app.scss'
import {getConfigData} from './utils/common'

const App = (props) => {
  useEffect(() => {
    console.log('Start', getConfigData('APP_NAME'), getConfigData('API_HOST'))
  }, [])

  return props.children
}

export default App

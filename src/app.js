import {useEffect} from 'react'
import './app.scss'
import {init} from './init'

const App = (props) => {
  useEffect(() => {
    init()
  }, [])

  return props.children
}

export default App

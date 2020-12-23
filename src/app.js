import {useEffect} from 'react'
import './app.scss'
import {init} from './init'

const App = (props) => {
  console.log('eeeeeee')
  useEffect(() => {
    init()
  }, [])

  return props.children
}

export default App

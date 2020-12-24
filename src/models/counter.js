import {useState} from 'react'
import {createModel} from 'hox'
import {getUserInfo} from '../api/user'

function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue ?? 0)
  const decrement = () => setCount(count - 1)
  const increment = async () => {
    setCount(count + 1)
    const res = await getUserInfo()
    console.log('getUserInfo', res)
  }
  return {
    count,
    decrement,
    increment,
  }
}

const useCounterModel = createModel(useCounter)
const useCounterModelWithInitialValue = createModel(useCounter, 20)

export {useCounterModel, useCounterModelWithInitialValue}

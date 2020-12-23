import {useState} from 'react'
import {createModel} from 'hox'

function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue ?? 0)
  const decrement = () => setCount(count - 1)
  const increment = () => setCount(count + 1)
  return {
    count,
    decrement,
    increment,
  }
}

const useCounterModel = createModel(useCounter)
const useCounterModelWithInitialValue = createModel(useCounter, 20)

export {useCounterModel, useCounterModelWithInitialValue}

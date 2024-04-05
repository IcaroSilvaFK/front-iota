import { useCallback, useState } from "react";

type UseBooleanReturn = [boolean, () => void, () => void, () => void]

/**
 * @returns [currentValue, handleSetTrue, handleSetFalse, handleToggle]
*/
export function useBoolean(defaultValue = false): UseBooleanReturn {

  const [state, setState] = useState(defaultValue)


  const handleSetTrue = useCallback(() => {
    setState(true)
  }, [])

  const handleSetFalse = useCallback(() => {
    setState(false)
  }, [])

  const handleToggle = useCallback(() => {
    setState(prev => !prev)
  }, [])


  return [
    state,
    handleSetTrue,
    handleSetFalse,
    handleToggle
  ]
}
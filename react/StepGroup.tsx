import React, { useMemo, useCallback, useRef, useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface StepContext {
  registerStep: (element: HTMLLIElement) => number
  stepListRef: React.MutableRefObject<HTMLLIElement[]>
}

const ctx = React.createContext<StepContext | undefined>(undefined)

export const useStepContext = () => {
  const value = useContext(ctx)

  if (!value) {
    throw new Error('useStepContext must be used inside a StepGroup')
  }

  return value
}

const classes = ['stepGroupWrapper', 'stepGroupList']

const StepGroup: React.FC = ({ children }) => {
  const stepListRef = useRef<HTMLLIElement[]>([])
  const cssHandles = useCssHandles(classes)

  const registerStep = useCallback((element: HTMLLIElement) => {
    return stepListRef.current.push(element)
  }, [])

  const contextValue = useMemo(
    () => ({
      registerStep,
      stepListRef,
    }),
    [registerStep]
  )

  return (
    <ctx.Provider value={contextValue}>
      <div className={cssHandles.stepGroupWrapper}>
        <ol className={cssHandles.stepGroupList}>{children}</ol>
      </div>
    </ctx.Provider>
  )
}

export default StepGroup

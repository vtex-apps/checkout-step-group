import React, { useEffect, useRef, useReducer } from 'react'

import { useStepContext } from './StepGroup'

const useStepIndicator = (elementRef: React.RefObject<HTMLLIElement>) => {
  const indexRef = useRef<number | null>(null)
  const { registerStep, stepListRef } = useStepContext()
  const [, forceUpdate] = useReducer((value: number) => value + 1, 0)

  useEffect(() => {
    const { index, unregister } = registerStep(elementRef.current!)

    indexRef.current = index
    forceUpdate()

    return () => {
      unregister()
    }
  }, [elementRef, registerStep])

  return { index: indexRef.current, lastIndex: stepListRef.current.length }
}

interface StepProps {
  title: React.ReactElement
}

const Step: React.FC<StepProps> = ({ children, title }) => {
  const elementRef = useRef<HTMLLIElement>(null)
  const { index, lastIndex } = useStepIndicator(elementRef)

  return (
    <li className="flex" ref={elementRef}>
      <div className="flex flex-column">
        <span className="w1 h1 pa2 bg-muted-1 br-100 c-on-muted-2 f5 b flex items-center justify-center">
          {index}
        </span>
        {(index ?? 0) < lastIndex && (
          <div
            style={{ width: 1 }}
            className="flex-auto bg-muted-4 self-center mv3"
          />
        )}
      </div>
      <div className="ml4 pb7 mb2 pl3">
        <div className="flex items-center lh-title">{title}</div>
        <div className="pv3">{children}</div>
      </div>
    </li>
  )
}

export default Step

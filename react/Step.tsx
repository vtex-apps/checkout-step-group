import React, { useLayoutEffect, useRef } from 'react'

import { useStepContext } from './StepGroup'

const useStepIndicator = (elementRef: React.RefObject<HTMLLIElement>) => {
  const indexRef = useRef<number>(-1)
  const { assigning, items } = useStepContext()

  useLayoutEffect(() => {
    if (assigning.current) {
      indexRef.current = items.current.push(elementRef.current!) - 1
    }
  })

  // first render its wrong, after a forceUpdate in parent useLayoutEffect it's
  // right, and its all synchronous so we don't get any flashing
  return { index: indexRef.current, lastIndex: items.current.length - 1 }
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
        <span className="w1 h1 pa3 bg-muted-5 br-100 c-on-muted-5 f5 b flex items-center justify-center">
          {index + 1}
        </span>
        {(index ?? 0) < lastIndex && (
          <div
            style={{ width: 1 }}
            className="flex-auto bg-muted-4 self-center mv0"
          />
        )}
      </div>
      <div className="ml4 pb6 pb7-ns pl2">
        <div className="flex items-center lh-copy">{title}</div>
        <div className="pt4">{children}</div>
      </div>
    </li>
  )
}

export default Step

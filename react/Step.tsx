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
        <span className="w1 h1 pa2 bg-muted-1 br-100 c-on-muted-2 f5 b flex items-center justify-center">
          {index + 1}
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

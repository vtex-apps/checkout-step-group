import classNames from 'classnames'
import React, { useEffect, useLayoutEffect, useRef } from 'react'

import { useStepContext } from './StepGroup'

const useStepIndicator = (elementRef: React.RefObject<HTMLLIElement>) => {
  const indexRef = useRef<number>(-1)
  const { assigning, items, updateParent, ...context } = useStepContext()

  useLayoutEffect(() => {
    if (!assigning.current) {
      return
    }

    indexRef.current = items.current.push(elementRef.current!) - 1
    updateParent()
  })

  return {
    // first render its wrong, after a forceUpdate in parent useLayoutEffect it's
    // right, and its all synchronous so we don't get any flashing
    index: indexRef.current,
    lastIndex: items.current.length - 1,
    ...context,
  }
}

interface StepProps {
  title: React.ReactElement
  active?: boolean
}

const Step: React.FC<StepProps> = ({ children, title, active = false }) => {
  const elementRef = useRef<HTMLLIElement>(null)
  const { index, lastIndex, activeIndex, setActive } = useStepIndicator(
    elementRef
  )

  useEffect(() => {
    if (!active) {
      return
    }

    setActive(elementRef.current!)

    return () => setActive(undefined)
  }, [active, index, setActive])

  const isActive = activeIndex === index

  return (
    <li className="flex" ref={elementRef}>
      <div className="flex flex-column">
        <span
          className={classNames(
            'w1 h1 br-100 b flex items-center justify-center',
            {
              'bg-muted-5 c-on-muted-5 pa3 f5': !isActive,
              'bg-muted-4 c-on-muted-4 na2 pa4 f4': isActive,
            }
          )}
        >
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
        <div
          className={classNames('flex items-center lh-copy', {
            'c-muted-1': activeIndex !== undefined && !isActive,
          })}
        >
          {title}
        </div>
        <div className="pt4">{children}</div>
      </div>
    </li>
  )
}

export default Step

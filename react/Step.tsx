import classNames from 'classnames'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useStepContext } from './StepGroup'

const CSS_HANDLES = [
  'step',
  'stepTitle',
  'stepContentWrapper',
  'stepContent',
  'stepDivider',
  'indicator',
  'indicatorActive',
  'indicatorInactive',
] as const

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
    // index is wrong on the first render, but the parent forces a
    // synchronous second render that fixes its value without flashing
    // the component
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

  const handles = useCssHandles(CSS_HANDLES)

  const isActive = activeIndex === index

  return (
    <li
      className={classNames(handles.step, 'flex flex-wrap items-center')}
      ref={elementRef}
    >
      <span
        className={classNames(
          handles.indicator,
          'w1 h1 br-100 b flex items-center justify-center',
          {
            [handles.indicatorInactive]: !isActive,
            [handles.indicatorActive]: isActive,
            'bg-muted-5 c-on-muted-5 pa2 pa3-ns f6 f5-ns': !isActive,
            'bg-muted-4 c-on-muted-4 na2 pa3 pa4-ns f5 f4-ns': isActive,
          }
        )}
      >
        {index + 1}
      </span>
      <span
        className={classNames(
          handles.stepTitle,
          'flex items-center lh-copy ml3 ml4-ns pl2-ns',
          {
            'c-muted-1': activeIndex !== undefined && !isActive,
          }
        )}
      >
        {title}
      </span>
      <div
        className={classNames(
          handles.stepContentWrapper,
          'mt4 mb6 mb7-ns w-100 flex'
        )}
      >
        <div
          style={{ width: (index ?? 0) < lastIndex ? 1 : 0 }}
          className={classNames(
            handles.stepDivider,
            'dn db-ns bg-muted-4 nt4 nb6 nb7-ns mh5'
          )}
        />
        <div className={classNames(handles.stepContent, 'ml5-ns')}>
          {children}
        </div>
      </div>
    </li>
  )
}

export default Step

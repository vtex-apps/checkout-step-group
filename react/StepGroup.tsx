import React, {
  useMemo,
  useRef,
  useContext,
  useLayoutEffect,
  useCallback,
  useState,
} from 'react'
import { useCssHandles } from 'vtex.css-handles'

/**
 * The component below is implemented following the "guidelines" of
 * this [1] gist. It is known that creating compound components in React
 * that have a strong relation of parent-child (like a select and their
 * option's) is hard, and there is currently no good way to implement this
 * because of the lack of primitives in the library.
 *
 * [1] https://gist.github.com/ryanflorence/10e9387f633f9d2e6f444a9bddaabf6e
 */

interface StepContext {
  items: React.MutableRefObject<HTMLLIElement[]>
  assigning: React.MutableRefObject<boolean>
  activeIndex: number | undefined
  updateParent: () => void
  setActive: (element: HTMLLIElement | undefined) => void
}

const ctx = React.createContext<StepContext | undefined>(undefined)

const useForceUpdate = (): [object, () => void] => {
  const [sentinel, setSentinel] = useState<object>({})

  return [
    sentinel,
    useCallback(() => {
      setSentinel({})
    }, []),
  ]
}

export const useStepContext = () => {
  const value = useContext(ctx)

  if (!value) {
    throw new Error('useStepContext must be used inside a <StepGroup />')
  }

  return value
}

const classes = ['stepGroupWrapper', 'stepGroupList']

const StepGroup: React.FC = ({ children }) => {
  const [activeElement, setActive] = useState<HTMLLIElement | undefined>(
    undefined
  )

  const assigning = useRef(true)

  const [sentinel, forceUpdate] = useForceUpdate()
  const stepListRef = useRef<HTMLLIElement[]>([])

  const cssHandles = useCssHandles(classes)

  useLayoutEffect(() => {
    if (assigning.current) {
      // At this point all of the children have pushed into the array so we set
      // assigning to false and force an update. Since we're in
      // useLayoutEffect, we won't get a flash of rendered content, it will all
      // happen synchronously. And now that this is false, children won't push
      // into the array on the forceUpdate
      assigning.current = false
      forceUpdate()
    } else {
      // After the forceUpdate completes, we end up here and set assigning back
      // to true for the next update from the app
      assigning.current = true
    }

    return () => {
      // this cleanup function runs right before the next render, so it's the
      // right time to empty out the array to be reassigned with whatever shows
      // up next render.
      if (assigning.current) {
        // we only want to empty out the array before the next render cycle if
        // it was NOT the result of our forceUpdate, so being guarded behind
        // assigning.current works
        stepListRef.current = []
      }
    }
  })

  const contextValue = useMemo(
    () => ({
      activeIndex: activeElement && stepListRef.current.indexOf(activeElement),
      setActive,
      items: stepListRef,
      assigning,
      updateParent: forceUpdate,
      sentinel,
    }),
    [activeElement, forceUpdate, sentinel]
  )

  return (
    <ctx.Provider value={contextValue}>
      <div className={`${cssHandles.stepGroupWrapper} ph3`}>
        <h3 className="c-muted-1 f5 mb5 mb6-ns mt0">Checkout</h3>
        <ol className={`${cssHandles.stepGroupList} pa0 ma0`}>{children}</ol>
      </div>
    </ctx.Provider>
  )
}

export default StepGroup

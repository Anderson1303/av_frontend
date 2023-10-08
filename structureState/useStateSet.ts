import { useCallback, useRef, useState } from "react"
//created by Anderson

export function useSet<T>(initialValue?: T[]) {
    const [_, setInc] = useState(false)

    const set = useRef(new Set<T>(initialValue))
    
    const add = useCallback(
        (item: T) => {
            if (set.current.has(item)) return
            setInc((prev) => !prev)
            set.current.add(item)
        },
        [setInc],
    )

    const remove = useCallback(
        (item: T) => {
            if (!set.current.has(item)) return
            setInc((prev) => !prev)
            set.current.delete(item)
        },
        [setInc],
    )

    const has = (item: T) => set.current.has(item)

    const toArray = () => Array.from(set.current)

    return {current: set.current, add, remove, has, toArray}
}
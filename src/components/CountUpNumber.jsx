import { useEffect, useState } from 'react'

export default function CountUpNumber({ end, shouldAnimate, prefix = '+', suffix = '', decimals = 0, className = 'blue', useGrouping = false, as = 'span' }) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!shouldAnimate) return

        const duration = 1800
        const startTime = performance.now()
        let animationFrame

        const updateValue = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1)
            const easedProgress = 1 - Math.pow(1 - progress, 3)

            const multiplier = 10 ** decimals
            setValue(Math.round(easedProgress * end * multiplier) / multiplier)

            if (progress < 1) {
                animationFrame = requestAnimationFrame(updateValue)
            } else {
                setValue(end)
            }
        }

        animationFrame = requestAnimationFrame(updateValue)

        return () => cancelAnimationFrame(animationFrame)
    }, [decimals, end, shouldAnimate])
    const ValueElement = as
    const displayedValue = useGrouping ? value.toLocaleString('en-US') : value

    return <ValueElement className={className}>{prefix}{displayedValue}{suffix} </ValueElement>
}
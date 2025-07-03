// src/components/LenisProvider.jsx
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing custom
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenisRef.current = lenis

    return () => {
      lenis.destroy()
    }
  }, [])

  return <div id="scroll-container">{children}</div>
}

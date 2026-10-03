// src/components/LenisProvider.jsx
import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

const LenisContext = createContext(null)

// Ref vers l'instance Lenis (null avant le montage)
export const useLenis = () => useContext(LenisContext)

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing custom
    })

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    lenisRef.current = lenis

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>
      <div id="scroll-container">{children}</div>
    </LenisContext.Provider>
  )
}

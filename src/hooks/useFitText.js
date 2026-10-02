import { useCallback, useLayoutEffect, useRef, useState } from "react"

// Taille de référence servant à mesurer la largeur naturelle du texte.
const REFERENCE = 100

/**
 * Ajuste la taille d'un texte sur une seule ligne pour qu'il remplisse
 * exactement la largeur de son conteneur — quelle que soit la police
 * réellement chargée (Span Condensed ou son repli Playfair Display).
 *
 * `fill` règle la part de la largeur réellement occupée (1 = pleine largeur).
 *
 * Retourne `[refConteneur, refTexte, taillePx]`. Le texte doit être en
 * `inline-block` + `whitespace-nowrap` pour que sa largeur naturelle soit
 * mesurable.
 */
export function useFitText({ max = Infinity, min = 0, fill = 1 } = {}) {
  const boxRef = useRef(null)
  const textRef = useRef(null)
  const [size, setSize] = useState(null)

  const measure = useCallback(() => {
    const box = boxRef.current
    const text = textRef.current
    if (!box || !text) return

    const available = box.clientWidth * fill
    if (!available) return

    // Mesure à taille fixe, puis règle de trois : l'approche de la police
    // (chasse, interlettrage en em) est linéaire avec la taille.
    const previous = text.style.fontSize
    text.style.fontSize = `${REFERENCE}px`
    const natural = text.offsetWidth
    text.style.fontSize = previous
    if (!natural) return

    setSize(Math.max(min, Math.min(max, (available / natural) * REFERENCE)))
  }, [max, min, fill])

  useLayoutEffect(() => {
    measure()

    const box = boxRef.current
    const observer = new ResizeObserver(measure)
    if (box) observer.observe(box)

    // Les polices web arrivent après le premier rendu : on remesure ensuite.
    document.fonts?.ready.then(measure)

    return () => observer.disconnect()
  }, [measure])

  return [boxRef, textRef, size]
}

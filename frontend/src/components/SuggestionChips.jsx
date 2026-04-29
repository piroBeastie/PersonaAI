import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SuggestionChips({ chips, accentColor, onSelect }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || containerRef.current.children.length === 0) return
    gsap.fromTo(containerRef.current.children,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
    )
  }, [chips])

  return (
    <div ref={containerRef} className="chips-wrapper">
      {chips.map((chip, i) => (
        <button
          key={i}
          onClick={() => onSelect(chip)}
          className="chip-btn"
          style={{ borderColor: accentColor + '44', color: accentColor }}
          onMouseEnter={e => e.currentTarget.style.background = accentColor + '18'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}

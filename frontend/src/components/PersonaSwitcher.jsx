import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const PERSONA_COLORS = {
  anshuman: '#a8c7fa',
  abhimanyu: '#c4b5fd',
  kshitij: '#86efac',
}

export default function PersonaSwitcher({ personas, active, onChange }) {
  const tabsRef = useRef([])

  useEffect(() => {
    tabsRef.current.forEach((el, i) => {
      if (!el) return
      const id = Object.keys(personas)[i]
      const isActive = id === active
      gsap.to(el, {
        color: isActive ? PERSONA_COLORS[id] : '#9aa0a6',
        borderBottomColor: isActive ? PERSONA_COLORS[id] : 'transparent',
        duration: 0.25,
        ease: 'power2.out',
      })
    })
  }, [active, personas])

  return (
    <div className="tabs-wrapper">
      {Object.entries(personas).map(([id, data], i) => (
        <button
          key={id}
          ref={el => tabsRef.current[i] = el}
          onClick={() => onChange(id)}
          className="tab-btn"
          style={{
            color: id === active ? PERSONA_COLORS[id] : '#9aa0a6',
            borderBottom: `2px solid ${id === active ? PERSONA_COLORS[id] : 'transparent'}`,
          }}
        >
          <span className="tab-name">{data.name.split(' ')[0]}</span>
          <span className="tab-title">{data.title.split(',')[0]}</span>
        </button>
      ))}
    </div>
  )
}

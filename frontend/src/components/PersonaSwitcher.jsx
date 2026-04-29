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
    // 60vw total, sits inside the centered outer wrapper in ChatPage
    <div style={styles.wrapper}>
      {Object.entries(personas).map(([id, data], i) => (
        <button
          key={id}
          ref={el => tabsRef.current[i] = el}
          onClick={() => onChange(id)}
          style={{
            ...styles.tab,
            color: id === active ? PERSONA_COLORS[id] : '#9aa0a6',
            borderBottom: `2px solid ${id === active ? PERSONA_COLORS[id] : 'transparent'}`,
          }}
        >
          <span style={styles.name}>{data.name.split(' ')[0]}</span>
          <span style={styles.title}>{data.title.split(',')[0]}</span>
        </button>
      ))}
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    // 60vw total strip, each of 3 tabs is 20vw
    width: '60vw',
  },
  tab: {
    // exactly 1/3 of the 60vw strip = 20vw each
    flex: 1,
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '13px 8px 11px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    borderRadius: '6px 6px 0 0',
    transition: 'background 0.2s',
  },
  name: {
    fontSize: '14px',
    fontWeight: '500',
  },
  title: {
    fontSize: '11px',
    color: '#9aa0a6',
  },
}

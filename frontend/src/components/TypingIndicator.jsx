import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function TypingIndicator({ accentColor }) {
  const dotsRef = useRef(null)

  useEffect(() => {
    gsap.to(dotsRef.current.children, {
      y: -5,
      duration: 0.4,
      ease: 'power1.inOut',
      stagger: 0.15,
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <div style={styles.wrapper}>
      <div ref={dotsRef} style={styles.dots}>
        <span style={{ ...styles.dot, background: accentColor }} />
        <span style={{ ...styles.dot, background: accentColor }} />
        <span style={{ ...styles.dot, background: accentColor }} />
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    background: '#1a1a1a',
    borderRadius: '18px 18px 18px 4px',
    width: 'fit-content',
    maxWidth: '80px',
  },
  dots: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    display: 'inline-block',
    opacity: 0.8,
  },
}

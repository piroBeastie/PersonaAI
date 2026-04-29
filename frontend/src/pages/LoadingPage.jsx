import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LoadingPage({ onComplete }) {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const subtitleRef = useRef(null)
  const dotsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(logoRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo(subtitleRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(dotsRef.current.children,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.12, ease: 'power2.out' },
      '-=0.1'
    )

    gsap.to(dotsRef.current.children, {
      y: -6,
      duration: 0.5,
      ease: 'power1.inOut',
      stagger: 0.15,
      repeat: -1,
      yoyo: true,
      delay: 1,
    })

    const exitTimer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.97,
        duration: 0.5,
        ease: 'power2.in',
        onComplete,
      })
    }, 2200)

    return () => clearTimeout(exitTimer)
  }, [])

  return (
    <div ref={containerRef} style={styles.container}>
      <div ref={logoRef} style={styles.logo}>
        {/* Gemini-style gradient across the full "Persona" word */}
        <span style={styles.logoScaler}>Persona</span>
        {/* "AI" plain white, thin */}
        <span style={styles.logoAI}> AI</span>
      </div>

      <p ref={subtitleRef} style={styles.subtitle}>
        Talk to the people who built it
      </p>

      <div ref={dotsRef} style={styles.dots}>
        <span style={{ ...styles.dot, background: '#a8c7fa' }} />
        <span style={{ ...styles.dot, background: '#c4b5fd' }} />
        <span style={{ ...styles.dot, background: '#86efac' }} />
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    background: '#0d0d0d',
  },
  logo: {
    fontSize: 'clamp(36px, 10vw, 52px)',
    fontWeight: '600',
    letterSpacing: '-1px',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'baseline',
  },
  logoScaler: {
    background: 'linear-gradient(90deg, #4b8df5 0%, #9b72cb 45%, #d96570 80%, #e8856a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '600',
  },
  logoAI: {
    color: '#ffffff',
    fontWeight: '300',
    fontSize: '42px',
    letterSpacing: '0',
    WebkitTextFillColor: '#ffffff',
  },
  subtitle: {
    color: '#9aa0a6',
    fontSize: '15px',
    letterSpacing: '0.3px',
  },
  dots: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    display: 'inline-block',
  },
}

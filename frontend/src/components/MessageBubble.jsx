import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function MessageBubble({ message, accentColor }) {
  const ref = useRef(null)
  const isUser = message.role === 'user'

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    )
  }, [])

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', width: '100%', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      {!isUser && (
        <div style={{ ...styles.avatar, background: accentColor }}>AI</div>
      )}
      <div
        className={isUser ? 'bubble-user' : 'bubble-model'}
        style={{
          padding: '11px 15px',
          border: '1px solid',
          lineHeight: '1.6',
          fontSize: '14px',
          color: '#e8eaed',
          whiteSpace: 'pre-wrap',
          background: isUser ? '#1e3a5f' : '#1a1a1a',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          borderColor: isUser ? '#2a4f7f' : '#2a2a2a',
        }}
      >
        {message.content}
      </div>
    </div>
  )
}

const styles = {
  avatar: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '700',
    color: '#0d0d0d',
    flexShrink: 0,
  },
}

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
    <div ref={ref} style={{ ...styles.row, justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      {!isUser && (
        <div style={{ ...styles.avatar, background: accentColor }}>
          AI
        </div>
      )}
      <div style={{
        ...styles.bubble,
        background: isUser ? '#1e3a5f' : '#1a1a1a',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        borderColor: isUser ? '#2a4f7f' : '#2a2a2a',
        maxWidth: isUser ? '70%' : '80%',
      }}>
        <p style={styles.text}>{message.content}</p>
      </div>
    </div>
  )
}

const styles = {
  row: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
    width: '100%',
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '700',
    color: '#0d0d0d',
    flexShrink: 0,
  },
  bubble: {
    padding: '12px 16px',
    border: '1px solid',
    lineHeight: '1.6',
  },
  text: {
    fontSize: '14px',
    color: '#e8eaed',
    whiteSpace: 'pre-wrap',
  },
}

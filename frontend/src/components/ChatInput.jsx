import { useState, useRef } from 'react'

export default function ChatInput({ onSend, isLoading, accentColor }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || isLoading) return
    onSend(trimmed)
    setValue('')
    // Reset height after clearing
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = (e) => {
    setValue(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.container, borderColor: value ? accentColor + '66' : '#2a2a2a' }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          rows={1}
          style={styles.textarea}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          style={{
            ...styles.sendBtn,
            background: value.trim() && !isLoading ? accentColor : '#2a2a2a',
            color: value.trim() && !isLoading ? '#0d0d0d' : '#555',
            cursor: value.trim() && !isLoading ? 'pointer' : 'not-allowed',
          }}
        >
          ↑
        </button>
      </div>
      <p style={styles.hint}>Enter to send · Shift+Enter for new line</p>
    </div>
  )
}

const styles = {
  wrapper: {
    padding: '12px 24px 20px',
    flexShrink: 0,
  },
  container: {
    display: 'flex',
    // center keeps textarea and button vertically aligned when textarea is 1 line
    alignItems: 'center',
    gap: '10px',
    background: '#1a1a1a',
    border: '1px solid',
    borderRadius: '16px',
    // equal top+bottom padding so single-line text sits dead center
    padding: '10px 10px 10px 16px',
    transition: 'border-color 0.2s',
    maxWidth: '760px',
    margin: '0 auto',
  },
  textarea: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#e8eaed',
    fontSize: '14px',
    // No extra line-height that inflates single-line height
    lineHeight: '22px',
    resize: 'none',
    fontFamily: 'inherit',
    maxHeight: '160px',
    overflowY: 'auto',
    // Remove browser default textarea padding that causes top-heavy feel
    padding: '0',
    display: 'block',
  },
  sendBtn: {
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '18px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s, color 0.2s',
    flexShrink: 0,
    lineHeight: 1,
  },
  hint: {
    textAlign: 'center',
    color: '#555',
    fontSize: '11px',
    marginTop: '8px',
  },
}

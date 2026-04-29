import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import SuggestionChips from './SuggestionChips'

export default function ChatWindow({ messages, isTyping, chips, accentColor, onChipSelect }) {
  const bottomRef = useRef(null)
  const isEmpty = messages.length === 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div style={styles.window}>
      {isEmpty ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>Ask me anything</p>
          <SuggestionChips chips={chips} accentColor={accentColor} onSelect={onChipSelect} />
        </div>
      ) : (
        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} accentColor={accentColor} />
          ))}
          {isTyping && (
            <div style={styles.typingRow}>
              <TypingIndicator accentColor={accentColor} />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}

const styles = {
  window: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  emptyText: {
    color: '#9aa0a6',
    fontSize: '15px',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '760px',
    margin: '0 auto',
  },
  typingRow: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}

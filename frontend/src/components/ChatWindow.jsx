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
    <div className="chat-window-scroll">
      {isEmpty ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>Ask me anything</p>
          <SuggestionChips chips={chips} accentColor={accentColor} onSelect={onChipSelect} />
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} accentColor={accentColor} />
          ))}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  emptyText: { color: '#9aa0a6', fontSize: '15px' },
}

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PersonaSwitcher from '../components/PersonaSwitcher'
import ChatWindow from '../components/ChatWindow'
import ChatInput from '../components/ChatInput'

const API = 'http://localhost:8000'

const ACCENT_COLORS = {
  anshuman: '#a8c7fa',
  abhimanyu: '#c4b5fd',
  kshitij: '#86efac',
}

export default function ChatPage() {
  const [personas, setPersonas] = useState({})
  const [activePersona, setActivePersona] = useState('anshuman')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const pageRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(pageRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
  }, [])

  useEffect(() => {
    fetch(`${API}/personas`)
      .then(r => r.json())
      .then(setPersonas)
      .catch(() => setError('Could not connect to backend.'))
  }, [])

  const handlePersonaChange = (id) => {
    if (id === activePersona) return
    gsap.to('.chat-window', {
      opacity: 0, y: 10, duration: 0.2,
      onComplete: () => {
        setActivePersona(id)
        setMessages([])
        setError(null)
        gsap.to('.chat-window', { opacity: 1, y: 0, duration: 0.3 })
      }
    })
  }

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setIsTyping(true)
    setError(null)

    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ persona_id: activePersona, messages: updatedMessages }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Something went wrong')
      }
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'model', content: data.response }])
    } catch (e) {
      setError(e.message)
    } finally {
      setIsTyping(false)
    }
  }

  const accentColor = ACCENT_COLORS[activePersona]
  const currentPersona = personas[activePersona]

  return (
    <div ref={pageRef} style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.logo}>
          {/* Light grey "Persona", white thin "AI" — no gradient on the nav logo */}
          <span style={styles.logoScaler}>Persona</span>
          <span style={styles.logoAI}> AI</span>
        </span>
        {currentPersona && (
          <span style={{ ...styles.activeLabel, color: accentColor }}>
            {currentPersona.name}
          </span>
        )}
      </div>

      {/* Tabs — centered, 60vw total, 20vw each */}
      {Object.keys(personas).length > 0 && (
        <div style={styles.tabsOuter}>
          <PersonaSwitcher
            personas={personas}
            active={activePersona}
            onChange={handlePersonaChange}
          />
        </div>
      )}

      {error && <div style={styles.error}>{error}</div>}

      <div className="chat-window" style={styles.chatWrapper}>
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          chips={currentPersona?.chips || []}
          accentColor={accentColor}
          onChipSelect={sendMessage}
        />
      </div>

      <ChatInput onSend={sendMessage} isLoading={isTyping} accentColor={accentColor} />
    </div>
  )
}

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#0d0d0d',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px 12px',
    borderBottom: '1px solid #2a2a2a',
    flexShrink: 0,
  },
  logo: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
    fontSize: '20px',
    fontWeight: '600',
    letterSpacing: '-0.5px',
  },
  logoScaler: {
    color: '#9aa0a6',
    fontWeight: '600',
  },
  logoAI: {
    color: '#ffffff',
    fontWeight: '300',
    fontSize: '18px',
  },
  activeLabel: {
    fontSize: '13px',
    fontWeight: '500',
  },
  // Outer wrapper centers the tab strip and limits its width to 60vw
  tabsOuter: {
    display: 'flex',
    justifyContent: 'flex-start',
    borderBottom: '1px solid #2a2a2a',
    flexShrink: 0,
    paddingLeft: '24px',
  },
  chatWrapper: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    background: '#2d1515',
    border: '1px solid #5c2626',
    color: '#f87171',
    padding: '10px 24px',
    fontSize: '13px',
    flexShrink: 0,
  },
}

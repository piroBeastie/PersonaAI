import { useState } from 'react'
import LoadingPage from './pages/LoadingPage'
import ChatPage from './pages/ChatPage'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return loaded
    ? <ChatPage />
    : <LoadingPage onComplete={() => setLoaded(true)} />
}

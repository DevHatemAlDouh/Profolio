import { useState } from 'react'
import GameDevPage from './components/GameDevPage'
import WebDevPage from './components/WebDevPage'

function App() {
  const [isGamePage, setIsGamePage] = useState(false)
  const onPageChange = (isGame: boolean) => setIsGamePage(isGame)

  return isGamePage
    ? <GameDevPage onPageChange={onPageChange} />
    : <WebDevPage onPageChange={onPageChange} />
}

export default App

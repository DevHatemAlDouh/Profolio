import GameDevPage from './components/GameDevPage'
import WebDevPage from './components/WebDevPage'

function App() {
  const isGamePage = window.location.pathname.replace(/\/+$/, '') === '/game-dev'
  return isGamePage ? <GameDevPage /> : <WebDevPage />
}

export default App

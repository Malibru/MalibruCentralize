import './App.css'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import ChamadosRcnPage from './pages/ChamadosRcnPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div>
      <header style={{ padding: 12, borderBottom: '1px solid #333', display: 'flex', gap: 12 }}>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/login">Login</Link>
          <Link to="/chamados">Chamados</Link>
        </nav>
      </header>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chamados" element={<ChamadosRcnPage />} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App

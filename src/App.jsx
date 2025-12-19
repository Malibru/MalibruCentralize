import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ChamadosRcnPage from './pages/ChamadosRcnPage'
import LoginPage from './pages/LoginPage'
import Header from './components/header'
import EquipamentosPage from './pages/EquipamentosPage'
import CertificadosPage from './pages/CertificadosPage'
import LicencasOfficePage from './pages/LicencasOfficePage'
import UsuariosPage from './pages/UsuariosPage'
import SystemInfoPage from './pages/SystemInfoPage'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <div>
     <Header />
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chamados" element={<ProtectedRoute><ChamadosRcnPage /></ProtectedRoute>} />
          <Route path="/equipamentos" element={<ProtectedRoute><EquipamentosPage /></ProtectedRoute>} />
          <Route path="/certificados" element={<ProtectedRoute><CertificadosPage /></ProtectedRoute>} />
          <Route path="/licencas" element={<ProtectedRoute><LicencasOfficePage /></ProtectedRoute>} />
          <Route path="/usuarios" element={<ProtectedRoute><UsuariosPage /></ProtectedRoute>} />
          <Route path="/system-info" element={<ProtectedRoute><SystemInfoPage /></ProtectedRoute>} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App

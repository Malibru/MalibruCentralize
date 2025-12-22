import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ChamadosRcnPage from './pages/ChamadosRcnPage'
import LoginPage from './pages/LoginPage'
import EquipamentosPage from './pages/EquipamentosPage'
import CertificadosPage from './pages/CertificadosPage'
import LicencasOfficePage from './pages/LicencasOfficePage'
import UsuariosPage from './pages/UsuariosPage'
import SystemInfoPage from './pages/SystemInfoPage'
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PerfilPage from './pages/PerfilPage'

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><Layout><PerfilPage /></Layout></ProtectedRoute>} />
          <Route path="/chamados" element={<ProtectedRoute><Layout><ChamadosRcnPage /></Layout></ProtectedRoute>} />
          <Route path="/equipamentos" element={<ProtectedRoute><Layout><EquipamentosPage /></Layout></ProtectedRoute>} />
          <Route path="/certificados" element={<ProtectedRoute><Layout><CertificadosPage /></Layout></ProtectedRoute>} />
          <Route path="/licencas" element={<ProtectedRoute><Layout><LicencasOfficePage /></Layout></ProtectedRoute>} />
          <Route path="/usuarios" element={<ProtectedRoute><Layout><UsuariosPage /></Layout></ProtectedRoute>} />
          <Route path="/system-info" element={<ProtectedRoute><Layout><SystemInfoPage /></Layout></ProtectedRoute>} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
    </div>
  )
}

export default App

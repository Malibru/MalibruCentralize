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

function App() {
  return (
    <div>
     <Header />
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chamados" element={<ChamadosRcnPage />} />
          <Route path="/equipamentos" element={<EquipamentosPage />} />
          <Route path="/certificados" element={<CertificadosPage />} />
          <Route path="/licencas" element={<LicencasOfficePage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/system-info" element={<SystemInfoPage />} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App

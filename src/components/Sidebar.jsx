import React from 'react'
import { NavLink } from 'react-router-dom'
// Alterar a sidebar para ela ficar recolhida e expandir assim
// que o cursor do mouse passar por cima
const itemStyle = {
  display: 'block',
  padding: '10px 12px',
  borderRadius: 8,
  color: 'var(--color-text)',
  textDecoration: 'none',
}

const activeStyle = {
  backgroundColor: 'var(--color-accent)',
  border: '1px solid var(--color-border)',
  color: '#fff',
}

export default function Sidebar() {
  return (
    <aside style={{
      width: 220,
      borderRight: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-bg)',
      padding: 12,
    }}>
      <nav style={{ display: 'grid', gap: 6 }}>
        <NavLink to="/home" style={({isActive}) => ({...itemStyle, ...(isActive ? activeStyle : {})})}>Home</NavLink>
        <NavLink to="/chamados" style={({isActive}) => ({...itemStyle, ...(isActive ? activeStyle : {})})}>Chamados</NavLink>
        <NavLink to="/equipamentos" style={({isActive}) => ({...itemStyle, ...(isActive ? activeStyle : {})})}>Equipamentos</NavLink>
        <NavLink to="/certificados" style={({isActive}) => ({...itemStyle, ...(isActive ? activeStyle : {})})}>Certificados</NavLink>
        <NavLink to="/licencas" style={({isActive}) => ({...itemStyle, ...(isActive ? activeStyle : {})})}>Licenças</NavLink>
        <NavLink to="/usuarios" style={({isActive}) => ({...itemStyle, ...(isActive ? activeStyle : {})})}>Usuários</NavLink>
        <NavLink to="/system-info" style={({isActive}) => ({...itemStyle, ...(isActive ? activeStyle : {})})}>Sistema</NavLink>
      </nav>
    </aside>
  )
}
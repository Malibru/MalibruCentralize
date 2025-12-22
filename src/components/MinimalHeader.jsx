import React from 'react'

const IG_URL = import.meta.env.VITE_COMPANY_INSTAGRAM_URL || 'https://instagram.com/'

export default function MinimalHeader() {
  const headerStyle = {
    position: 'sticky', top: 0, zIndex: 50,
    borderBottom: '1px solid var(--color-border)',
    backdropFilter: 'blur(6px)',
    backgroundColor: 'rgba(255,255,255,0.85)',
    width: '100%',
  }
  const containerStyle = {
    height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', gap: 12,
  }
  const linkStyle = {
    padding: '6px 10px', borderRadius: 8, textDecoration: 'none', color: 'var(--color-text)', border: '1px solid var(--color-border)'
  }
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ height: 28, width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: 'var(--color-accent)', color: 'white' }}>M</div>
          <strong>Malibru</strong>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href={IG_URL} target="_blank" rel="noreferrer" style={linkStyle}>Instagram</a>
          <a href="#" style={linkStyle}>Link 1</a>
          <a href="#" style={linkStyle}>Link 2</a>
        </nav>
      </div>
    </header>
  )
}
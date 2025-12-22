import React from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/Sidebar'

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 16 }}>{children}</main>
      </div>
    </div>
  )
}
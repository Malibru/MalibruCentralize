import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'home_notes'
// Essa notas tbm não ficaram legais, alterar para escrever a nota e adiconar ela em um
// array de notas, e mostrar as notas criadas em um lista, com possibilidade de alterar, excluir, marcar como importante
export default function NotesWidget() {
  const [notes, setNotes] = useState('')
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY)
      if (existing) setNotes(existing)
    } catch {}
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, notes)
        setSavedAt(new Date())
      } catch {}
    }, 400)
    return () => clearTimeout(t)
  }, [notes])

  function clearNotes() {
    if (confirm('Limpar anotações?')) {
      setNotes('')
      try { localStorage.removeItem(STORAGE_KEY) } catch {}
    }
  }

  return (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>Anotações</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <small className="muted-text">
            {savedAt ? `Salvo ${savedAt.toLocaleTimeString('pt-BR')}` : '—'}
          </small>
          <button onClick={clearNotes} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-primary-muted)' }}>Limpar</button>
        </div>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Escreva suas anotações aqui..."
        style={{ width: '100%', minHeight: 160, marginTop: 8, padding: 10, borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-primary-muted)', color: 'var(--color-text)' }}
      />
    </div>
  )
}
import React from 'react'

const EMBED_URL = import.meta.env.VITE_GOOGLE_CALENDAR_EMBED_URL || ''
// Base do calendario, ainda estudar como usar, caso contrario, encontrar uma outra opção para exibir o calendario
export default function CalendarWidget() {
  if (!EMBED_URL) {
    return (
      <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, padding: 16 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>Calendário</h3>
        <p className="muted-text" style={{ marginTop: 8 }}>
          Configure <code>VITE_GOOGLE_CALENDAR_EMBED_URL</code> para exibir seu Google Agenda. Exemplo:
        </p>
        <pre style={{ background: 'var(--color-primary-muted)', padding: 12, borderRadius: 8 }}>
{`VITE_GOOGLE_CALENDAR_EMBED_URL=https://calendar.google.com/calendar/embed?src=SEU_CALENDAR_ID&ctz=America/Sao_Paulo`}
        </pre>
      </div>
    )
  }

  return (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 12, overflow: 'hidden' }}>
      <iframe
        title="Google Calendar"
        src={EMBED_URL}
        style={{ width: '100%', height: 480, border: 0 }}
      />
    </div>
  )
}
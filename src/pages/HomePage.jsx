import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import CalendarWidget from '@/components/widgets/CalendarWidget'
import NotesWidget from '@/components/widgets/NotesWidget'
// Não achei que ficou legal, mas é uma forma de organizar as seções,
// OBS: Pensar em ideias para melhorar essa pagina Home
export default function HomePage() {
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Home</h1>
        <p className="muted-text">Visão geral e atalhos do dia</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agenda</CardTitle>
          <CardDescription>Sincronize seu calendário para organizar seus compromissos</CardDescription>
        </CardHeader>
        <CardContent>
          <CalendarWidget />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anotações</CardTitle>
          <CardDescription>Registre tarefas e ideias importantes</CardDescription>
        </CardHeader>
        <CardContent>
          <NotesWidget />
        </CardContent>
      </Card>
    </div>
  )
}
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function PerfilPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Configurações e detalhes do usuário (em breve)</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="muted-text">A página de perfil será integrada com a API posteriormente.</p>
        </CardContent>
      </Card>
    </div>
  )
}
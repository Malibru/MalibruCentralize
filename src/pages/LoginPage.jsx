"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const API_BASE = "http://localhost:8080"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
     
      const resp = await fetch(`${API_BASE}/Usuarios/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, senha: password }),
      })
      const text = await resp.text()
      if (!resp.ok) {
        setError(text || "Falha no login")
        return
      }
      alert("Login realizado com sucesso")
   
    } catch (err) {
      setError("Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgba(18,18,18,1), rgba(60,60,60,0.2))",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#fff", margin: 0 }}>Bem-vindo</h1>
          <p style={{ color: "#bbb", marginTop: 4 }}>Acesse sua conta para continuar</p>
        </div>

        <Card style={{ backdropFilter: "blur(6px)", borderColor: "#3a3a3a", backgroundColor: "rgba(255,255,255,0.05)" }}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Informe suas credenciais abaixo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div style={{ color: "#ff6b6b", fontSize: 14 }}>{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p style={{ color: "#888", fontSize: 12, marginTop: 12 }}>
          Dica: use o mesmo esquema visual da página de chamados para manter consistência.
        </p>
      </div>
    </div>
  )
}
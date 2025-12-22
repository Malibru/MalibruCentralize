"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { setToken, setUser } from "@/lib/auth"
import MinimalHeader from "@/components/MinimalHeader"

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"

export default function LoginPage() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

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
      const data = await resp.json().catch(async () => ({ raw: await resp.text() }))
      if (!resp.ok) {
        setError(data?.mensagem || data?.raw || "Falha no login")
        return
      }
      if (data?.autenticado ?? data?.isAutenticado) {
        const token = data?.token || data?.jwt || data?.accessToken || data?.tokenJwt
        if (token) setToken(token)
        const user = data?.usuario || data?.user || data?.pessoa || { login }
        setUser(user)
        navigate("/home")
      } else {
        setError(data?.mensagem || "Credenciais inválidas")
      }
   
    } catch (err) {
      setError("Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <MinimalHeader />
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "var(--color-text)", margin: 0 }}>Bem-vindo</h1>
          <p className="muted-text" style={{ marginTop: 4 }}>Acesse sua conta para continuar</p>
        </div>

        <Card style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-primary-muted)" }}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Informe suas credenciais abaixo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="login">Login</Label>
                <Input
                  id="login"
                  type="text"
                  placeholder="seu_login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
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
         Sistema Malibru Centralize
        </p>
      </div>
    </div>
    </>
  )
}
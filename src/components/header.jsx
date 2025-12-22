"use client"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AuthService } from "@/services/auth"
import { isAuthenticated, clearToken, getUser, clearUser } from "@/lib/auth"

export default function Header() {
  const navigate = useNavigate()
  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    borderBottom: "1px solid var(--color-border)",
    backdropFilter: "blur(6px)",
    backgroundColor: "rgba(255,255,255,0.85)",
    width: "100%",
  }

  const containerStyle = {
    width: "100%",
    maxWidth: "100%",
    margin: 0,
    height: 48, // menor que h-16 (~64px)
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
    gap: 12,
  }

  const logoBoxStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
  }

  const logoStyle = {
    height: 28,
    width: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "var(--color-primary)",
    color: "var(--color-text)",
  }

  const titleStyle = { fontSize: 16, fontWeight: 700, margin: 0, lineHeight: 1 }
  const subtitleStyle = { fontSize: 11, opacity: 0.75, margin: 0 }

  const navStyle = { display: "flex", alignItems: "center", gap: 8 }
  const pillStyle = { padding: "6px 10px", borderRadius: 999, border: "1px solid var(--color-border)" }
  const user = getUser() || {}
  const userLabel = user?.nome || user?.name || user?.login || "Usuário"

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <div style={logoBoxStyle}>
          <div style={logoStyle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ height: 16, width: 16 }}
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </div>
          <div>
            <h2 style={titleStyle}>Malibru System</h2>
            <p style={subtitleStyle}>Gestão...</p>
          </div>
        </div>

        {/* Ações do usuário */}
        <nav style={navStyle}>
          {isAuthenticated() ? (
            <>
              <span style={pillStyle}>{userLabel}</span>
              <Button size="sm" variant="outline" onClick={() => navigate('/perfil')}>Perfil</Button>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  try { await AuthService.logout() } catch {}
                  clearToken(); clearUser();
                  navigate('/login')
                }}
              >
                Sair
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={() => navigate('/login')}>Login</Button>
          )}
        </nav>
      </div>
    </header>
  )
}

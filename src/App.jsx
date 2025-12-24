import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Certificados from "./pages/Certificados";
import Equipamentos from "./pages/Equipamentos";
import Licencas from "./pages/Licencas";
import Usuarios from "./pages/Usuarios";
import Monitoramento from "./pages/Monitoramento";
import Perfil from "./pages/Perfil";
import ChamadosRCN from "./pages/ChamadosRcn";
import ChamadosInternos from "./pages/ChamadosInternos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="certificados" element={<Certificados />} />
              <Route path="equipamentos" element={<Equipamentos />} />
              <Route path="licencas" element={<Licencas />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="monitoramento" element={<Monitoramento />} />
              <Route path="perfil" element={<Perfil />} />
              <Route path="chamados-rcn" element={<ChamadosRCN />} />
              <Route path="chamados-internos" element={<ChamadosInternos />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

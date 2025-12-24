import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Award, 
  Monitor, 
  FileText, 
  Users, 
  Activity, 
  User, 
  Ticket, 
  MessageSquare,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const menuItems = [
  { path: '/home', label: 'Dashboard', icon: Home, exact: true },
  { path: '/home/certificados', label: 'Certificados', icon: Award },
  { path: '/home/equipamentos', label: 'Equipamentos', icon: Monitor },
  { path: '/home/licencas', label: 'Licenças Office', icon: FileText },
  { path: '/home/usuarios', label: 'Usuários', icon: Users },
  { path: '/home/monitoramento', label: 'Monitoramento', icon: Activity },
  { path: '/home/perfil', label: 'Perfil', icon: User },
  { path: '/home/chamados-rcn', label: 'Chamados RCN', icon: Ticket },
  { path: '/home/chamados-internos', label: 'Chamados Internos', icon: MessageSquare },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "bg-sidebar text-sidebar-foreground h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path) && item.path !== '/home';
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    "hover:bg-sidebar-accent",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
}

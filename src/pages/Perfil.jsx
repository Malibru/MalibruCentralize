import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export default function Perfil() {
  const { user } = useAuth();

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <User className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Perfil</h2>
          <p className="text-muted-foreground">Informações do usuário</p>
        </div>
      </div>

      <Card className="border-0 shadow-md max-w-md">
        <CardHeader>
          <CardTitle>Dados do Usuário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user?.name ? getInitials(user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{user?.name || 'Usuário'}</h3>
              <p className="text-muted-foreground">{user?.username || 'username'}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div>
              <label className="text-sm text-muted-foreground">Nome de usuário</label>
              <p className="font-medium">{user?.username || '-'}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Status</label>
              <p className="font-medium text-success">Ativo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

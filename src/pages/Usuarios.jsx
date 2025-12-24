import CrudPage from '../components/crud/CrudPage';
import { Users } from 'lucide-react';

const fields = [
  { key: 'nome', label: 'Nome Completo', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'usuario', label: 'Usuário', required: true },
  { key: 'departamento', label: 'Departamento', required: false },
  { key: 'cargo', label: 'Cargo', required: false },
  { key: 'telefone', label: 'Telefone', required: false },
];

export default function Usuarios() {
  return <CrudPage title="Usuários" fields={fields} icon={Users} />;
}

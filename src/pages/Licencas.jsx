import CrudPage from '../components/crud/CrudPage';
import { FileText } from 'lucide-react';

const fields = [
  { key: 'email', label: 'Email da Licença', required: true },
  { key: 'produto', label: 'Produto', required: true },
  { key: 'tipo', label: 'Tipo de Licença', required: true },
  { key: 'validade', label: 'Validade', type: 'date', required: false },
  { key: 'usuario', label: 'Usuário Atribuído', required: false },
  { key: 'status', label: 'Status', required: false },
];

export default function Licencas() {
  return <CrudPage title="Licenças Office" fields={fields} icon={FileText} />;
}

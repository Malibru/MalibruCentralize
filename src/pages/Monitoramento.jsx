import CrudPage from '../components/crud/CrudPage';
import { Activity } from 'lucide-react';

const fields = [
  { key: 'servico', label: 'Serviço', required: true },
  { key: 'servidor', label: 'Servidor', required: true },
  { key: 'status', label: 'Status', required: true },
  { key: 'ip', label: 'IP', required: false },
  { key: 'porta', label: 'Porta', required: false },
  { key: 'ultimaVerificacao', label: 'Última Verificação', required: false },
];

export default function Monitoramento() {
  return <CrudPage title="Monitoramento" fields={fields} icon={Activity} />;
}

import CrudPage from '../components/crud/CrudPage';
import { Ticket } from 'lucide-react';

const fields = [
  { key: 'numero', label: 'Número do Chamado', required: true },
  { key: 'titulo', label: 'Título', required: true },
  { key: 'descricao', label: 'Descrição', required: true },
  { key: 'prioridade', label: 'Prioridade', required: true },
  { key: 'status', label: 'Status', required: true },
  { key: 'solicitante', label: 'Solicitante', required: false },
  { key: 'dataAbertura', label: 'Data de Abertura', type: 'date', required: false },
];

export default function ChamadosRCN() {
  return <CrudPage title="Chamados RCN" fields={fields} icon={Ticket} />;
}

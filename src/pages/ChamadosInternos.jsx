import CrudPage from '../components/crud/CrudPage';
import { MessageSquare } from 'lucide-react';

const fields = [
  { key: 'numero', label: 'Número do Chamado', required: true },
  { key: 'titulo', label: 'Título', required: true },
  { key: 'descricao', label: 'Descrição', required: true },
  { key: 'categoria', label: 'Categoria', required: true },
  { key: 'prioridade', label: 'Prioridade', required: true },
  { key: 'status', label: 'Status', required: true },
  { key: 'responsavel', label: 'Responsável', required: false },
];

export default function ChamadosInternos() {
  return <CrudPage title="Chamados Internos" fields={fields} icon={MessageSquare} />;
}

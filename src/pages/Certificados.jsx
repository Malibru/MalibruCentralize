import CrudPage from '../components/crud/CrudPage';
import { Award } from 'lucide-react';

const fields = [
  { key: 'nome', label: 'Nome do Certificado', required: true },
  { key: 'tipo', label: 'Tipo', required: true },
  { key: 'validade', label: 'Validade', type: 'date', required: true },
  { key: 'responsavel', label: 'Responsável', required: false },
  { key: 'status', label: 'Status', required: false },
];

export default function Certificados() {
  return <CrudPage title="Certificados" fields={fields} icon={Award} />;
}

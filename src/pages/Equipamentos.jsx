import CrudPage from '../components/crud/CrudPage';
import { Monitor } from 'lucide-react';

const fields = [
  { key: 'nome', label: 'Nome do Equipamento', required: true },
  { key: 'patrimonio', label: 'Patrimônio', required: true },
  { key: 'tipo', label: 'Tipo', required: true },
  { key: 'marca', label: 'Marca', required: false },
  { key: 'modelo', label: 'Modelo', required: false },
  { key: 'localizacao', label: 'Localização', required: false },
  { key: 'responsavel', label: 'Responsável', required: false },
];

export default function Equipamentos() {
  return <CrudPage title="Equipamentos" fields={fields} icon={Monitor} />;
}

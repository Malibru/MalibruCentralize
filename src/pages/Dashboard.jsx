import KanbanBoard from '../components/dashboard/KanbanBoard';
import NotesSection from '../components/dashboard/NotesSection';

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
        <p className="text-muted-foreground">Bem-vindo ao sistema de gestão centralizada</p>
      </div>
      
      <KanbanBoard />
      
      <NotesSection />
    </div>
  );
}

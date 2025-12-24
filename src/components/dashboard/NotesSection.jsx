import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus, Star, Trash2, Edit2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const importanceOptions = [
  { value: 'low', label: 'Baixa', color: 'bg-muted text-muted-foreground' },
  { value: 'medium', label: 'Média', color: 'bg-warning/20 text-warning' },
  { value: 'high', label: 'Alta', color: 'bg-destructive/20 text-destructive' },
];

export default function NotesSection() {
  const [notes, setNotes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    importance: 'low',
  });

  const resetForm = () => {
    setFormData({ title: '', content: '', importance: 'low' });
    setIsAdding(false);
    setEditingId(null);
  };

  const addNote = () => {
    if (!formData.title.trim()) return;

    const note = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setNotes((prev) => [note, ...prev]);
    resetForm();
  };

  const updateNote = () => {
    if (!formData.title.trim()) return;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === editingId ? { ...note, ...formData } : note
      )
    );
    resetForm();
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const startEdit = (note) => {
    setEditingId(note.id);
    setFormData({
      title: note.title,
      content: note.content,
      importance: note.importance,
    });
    setIsAdding(false);
  };

  const getImportanceStyle = (importance) => {
    return importanceOptions.find((opt) => opt.value === importance)?.color || '';
  };

  const getImportanceLabel = (importance) => {
    return importanceOptions.find((opt) => opt.value === importance)?.label || '';
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Notas</CardTitle>
          {!isAdding && !editingId && (
            <Button size="sm" onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Nota
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {(isAdding || editingId) && (
          <div className="mb-4 p-4 bg-muted rounded-lg space-y-3">
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Título da nota"
              className="font-medium"
            />
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Conteúdo da nota..."
              rows={3}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={formData.importance}
                  onValueChange={(value) => setFormData({ ...formData, importance: value })}
                >
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {importanceOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
                <Button size="sm" onClick={editingId ? updateNote : addNote}>
                  <Check className="h-4 w-4 mr-1" />
                  {editingId ? 'Salvar' : 'Adicionar'}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={cn(
                'p-4 rounded-lg border bg-card hover:shadow-md transition-shadow group'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm line-clamp-1">{note.title}</h4>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => startEdit(note)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {note.content && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {note.content}
                </p>
              )}
              
              <Badge className={cn('text-xs', getImportanceStyle(note.importance))}>
                {getImportanceLabel(note.importance)}
              </Badge>
            </div>
          ))}

          {notes.length === 0 && !isAdding && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              Nenhuma nota adicionada. Clique em "Nova Nota" para começar.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

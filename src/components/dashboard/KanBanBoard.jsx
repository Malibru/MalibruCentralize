import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, GripVertical, X, Edit2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialColumns = {
  todo: { title: 'A Fazer', items: [] },
  progress: { title: 'Em Progresso', items: [] },
  done: { title: 'Concluído', items: [] },
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState('');
  const [addingTo, setAddingTo] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);

  const addTask = (columnId) => {
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now().toString(),
      title: newTask,
      createdAt: new Date().toISOString(),
    };

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: [...prev[columnId].items, task],
      },
    }));
    setNewTask('');
    setAddingTo(null);
  };

  const deleteTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter((item) => item.id !== taskId),
      },
    }));
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditValue(task.title);
  };

  const saveEdit = (columnId, taskId) => {
    if (!editValue.trim()) return;
    
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.map((item) =>
          item.id === taskId ? { ...item, title: editValue } : item
        ),
      },
    }));
    setEditingTask(null);
    setEditValue('');
  };

  const handleDragStart = (e, columnId, task) => {
    setDraggedItem({ columnId, task });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.columnId === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    setColumns((prev) => {
      const sourceItems = prev[draggedItem.columnId].items.filter(
        (item) => item.id !== draggedItem.task.id
      );
      const targetItems = [...prev[targetColumnId].items, draggedItem.task];

      return {
        ...prev,
        [draggedItem.columnId]: { ...prev[draggedItem.columnId], items: sourceItems },
        [targetColumnId]: { ...prev[targetColumnId], items: targetItems },
      };
    });
    setDraggedItem(null);
  };

  const getColumnColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'bg-kanban-todo';
      case 'progress':
        return 'bg-kanban-progress';
      case 'done':
        return 'bg-kanban-done';
      default:
        return 'bg-muted';
    }
  };

  const getBadgeVariant = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'secondary';
      case 'progress':
        return 'default';
      case 'done':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Quadro de Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className={cn('rounded-lg p-4 min-h-[300px]', getColumnColor(columnId))}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, columnId)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant={getBadgeVariant(columnId)}>{column.items.length}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setAddingTo(addingTo === columnId ? null : columnId)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {addingTo === columnId && (
                <div className="mb-3 flex gap-2">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nova tarefa..."
                    className="h-8 text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && addTask(columnId)}
                    autoFocus
                  />
                  <Button size="sm" onClick={() => addTask(columnId)}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                {column.items.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, columnId, task)}
                    className={cn(
                      'bg-card p-3 rounded-md shadow-sm border cursor-move',
                      'hover:shadow-md transition-shadow group'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {editingTask === task.id ? (
                        <div className="flex-1 flex gap-2">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="h-7 text-sm"
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit(columnId, task.id)}
                            autoFocus
                          />
                          <Button size="icon" className="h-7 w-7" onClick={() => saveEdit(columnId, task.id)}>
                            <Check className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1 text-sm">{task.title}</span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => startEdit(task)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive hover:text-destructive"
                              onClick={() => deleteTask(columnId, task.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

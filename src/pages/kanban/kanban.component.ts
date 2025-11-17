import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Status = 'Aberto' | 'Em Andamento' | 'Resolvido' | 'Fechado';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {
  columns: { name: Status, items: { id: number, titulo: string }[] }[] = [
    { name: 'Aberto', items: [{ id: 1, titulo: 'Computador não liga' }] },
    { name: 'Em Andamento', items: [{ id: 2, titulo: 'Impressora travada' }] },
    { name: 'Resolvido', items: [] },
    { name: 'Fechado', items: [] },
  ];

  move(item: any, from: Status, to: Status) {
    if (from === to) return;
    const src = this.columns.find(c => c.name === from)!;
    const dst = this.columns.find(c => c.name === to)!;
    src.items = src.items.filter(i => i.id !== item.id);
    dst.items.push(item);
  }
}
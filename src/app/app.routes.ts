import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from '../pages/login/login.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { CertificadosComponent } from '../pages/certificados/certificados.component';
import { EquipamentosComponent } from '../pages/equipamentos/equipamentos.component';
import { LicencasComponent } from '../pages/licencas/licencas.component';
import { ChamadosPageComponent } from '../pages/chamados/chamados.component';
import { KanbanComponent } from '../pages/kanban/kanban.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] },
  { path: 'certificados', component: CertificadosComponent, canActivate: [authGuard] },
  { path: 'equipamentos', component: EquipamentosComponent, canActivate: [authGuard] },
  { path: 'licencas', component: LicencasComponent, canActivate: [authGuard] },
  { path: 'chamados', component: ChamadosPageComponent, canActivate: [authGuard] },
  { path: 'kanban', component: KanbanComponent, canActivate: [authGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

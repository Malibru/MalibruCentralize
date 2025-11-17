import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  modoRegistrar = false;

  loginData = { login: '', senha: '' };
  registrarData = { nome: '', login: '', email: '', senha: '' };

  loading = false;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  toggleModo() {
    this.modoRegistrar = !this.modoRegistrar;
    this.errorMsg = '';
  }

  submitLogin() {
    this.loading = true;
    this.auth.login(this.loginData).subscribe({
      next: (res: any) => {
        const token = res?.token || res?.jwt || undefined;
        this.auth.setSession(res?.usuario || res, token);
        this.router.navigateByUrl('/usuarios');
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Falha ao autenticar';
      },
      complete: () => (this.loading = false)
    });
  }

  submitRegistrar() {
    this.loading = true;
    this.auth.registrar(this.registrarData).subscribe({
      next: (res: any) => {
        const token = res?.token || res?.jwt || undefined;
        this.auth.setSession(res?.usuario || res, token);
        this.router.navigateByUrl('/usuarios');
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Falha ao registrar';
      },
      complete: () => (this.loading = false)
    });
  }
}
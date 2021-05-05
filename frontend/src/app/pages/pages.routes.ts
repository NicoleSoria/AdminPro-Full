import { Routes, RouterModule, CanActivate } from '@angular/router';

import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsauriosComponent } from './usaurios/usaurios.component';


const pagesRoutes: Routes = [
    { path: '', 
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
      { path: 'account-setting', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observadores' }},

      //Configuracion de pagina
      { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
      { path: 'usuarios', component: UsauriosComponent, data: {titulo: 'Mantenimiento de usuarios'}},

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

import { PAGES_ROUTES } from './pages.routes';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsauriosComponent } from './usaurios/usaurios.component';


@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsauriosComponent
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        UsauriosComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ComponentsModule,
        PipesModule
    ]
})
export class PagesModule {}
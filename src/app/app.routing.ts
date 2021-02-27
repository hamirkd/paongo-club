import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './auth/auth.component';
import { EspaceCustomerComponent } from './espace-customer/espace-customer.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }],
    canActivate: [
      AuthGuardService
  ]
  }, {
    path: '',
    component: AuthComponent,
    children: [{
      path: '',
      loadChildren: './auth/auth.module#AuthModule'
    }]
  }, {
    path: '',
    component: EspaceCustomerComponent,
    children: [{
      path: '',
      loadChildren: './espace-customer/espace-customer.module#EspaceCustomerModule'
    }],
    canActivate: [
      AuthGuardService
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

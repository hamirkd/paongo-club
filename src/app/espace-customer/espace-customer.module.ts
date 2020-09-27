import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMoneyComponent } from './my-money/my-money.component';
import { MyMembersComponent } from './my-members/my-members.component';
import { EspaceCustomerComponent } from './espace-customer.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { EspaceCustomerRoutes } from './espace-customer.routing';
import { ComponentsModule } from 'app/components/components.module';


@NgModule({
  declarations: [
    MyMoneyComponent, 
    MyMembersComponent, 
    EspaceCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EspaceCustomerRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ComponentsModule,
  ],
})
export class EspaceCustomerModule { }
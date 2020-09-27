import { Routes } from '@angular/router';
import { MyMembersComponent } from './my-members/my-members.component';
import { MyMoneyComponent } from './my-money/my-money.component';

export const EspaceCustomerRoutes: Routes = [

    { path: 'my-members',      component: MyMembersComponent },
    { path: 'my-money',   component: MyMoneyComponent },
    
];

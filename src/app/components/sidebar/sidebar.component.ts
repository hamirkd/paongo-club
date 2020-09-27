import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },
    { path: '/my-money', title: 'Mon argent',  icon:'money', class: '' },
    { path: '/my-members', title: 'Mes abonnés',  icon:'users', class: '' },
    { path: '/user-profile', title: 'Profile utilisateur',  icon:'user', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
  seDeconnecter(){
    this.router.navigate(['/login']);
  }
}

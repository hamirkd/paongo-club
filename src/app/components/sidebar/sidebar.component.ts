import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES_USER: RouteInfo[] = [
    { path: '/mes-titres', title: 'Mes Titres',  icon:'money', class: '' },
    // { path: '/my-members', title: 'Mes abonnés',  icon:'users', class: '' },
    { path: '/user-profile', title: 'Profil utilisateur',  icon:'user', class: '' },
];
export const ROUTES_ADMIN: RouteInfo[] = [
    // { path: '/my-members', title: 'Mes abonnés',  icon:'users', class: '' },
    { path: '/my-titres', title: 'Mes Titres',  icon:'money', class: '' },
    { path: '/user-profile', title: 'Profil utilisateur',  icon:'user', class: '' },
    { path: '/users-list', title: 'Liste des utilisateurs',  icon:'users', class: '' },
    { path: '/titres-list', title: 'Liste des titres',  icon:'file-o', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router,private userService:UserService) { }

  ngOnInit() {
    if(this.userService.isAdmin()){
      this.menuItems = ROUTES_ADMIN.filter(menuItem => menuItem);
    }
    else{
      this.menuItems = ROUTES_USER.filter(menuItem => menuItem);
    }
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
  seDeconnecter(){
    this.userService.logout();
  }
}

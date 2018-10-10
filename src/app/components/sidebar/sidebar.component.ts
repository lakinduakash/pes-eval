import {Component, OnInit} from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: ''},
  {path: '/dashboard', title: 'Invite Evaluator', icon: 'education_atom', class: ''},
  {path: '/dashboard', title: 'Notifications', icon: 'ui-1_bell-53', class: ''},

  {path: '/dashboard', title: 'User Profile', icon: 'users_single-02', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}

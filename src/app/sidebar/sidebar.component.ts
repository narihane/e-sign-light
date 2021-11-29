import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../shared/_models/role.model';
import { User } from '../shared/_models/user.model';
import { AuthenticationService } from '../shared/_services/authentication.service';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  user:boolean;
}

export const ROUTES: RouteInfo[] = [
{ path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', user:false },
{ path: '/add-invoice', title: 'Add Invoice', icon: 'nc-bank', class: '', user:true},
{ path: '/pending-invoices', title: 'Pending Invoices', icon:'nc-diamond',class: '', user:false },
{ path: '/submitted-documents', title: 'Submitted Documents', icon: 'nc-diamond', class: '', user:false },
{ path: '/received-documents', title: 'Received Documents', icon: 'nc-diamond', class: '', user:false },
{ path: '/codemap', title: 'Code Mapping', icon: 'nc-tile-56', class: '', user:false },
{ path: '/admin-settings', title: 'Admin Settings', icon: 'nc-single-02', class: '', user:false },
];

@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  currentUser!: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isAdmin()
    {
      return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout(){
    this.authenticationService.logout();
  }
}

import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/home/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
  { path: '/home/add-invoice', title: 'Add Invoice', icon: 'nc-bank', class: '' },
  { path: '/home/pending-invoices', title: 'Pending Invoices', icon:'nc-diamond',class: '' },
  { path: '/home/submitted-documents', title: 'Submitted Documents', icon: 'nc-diamond', class: '' },
  { path: '/home/received-documents', title: 'Received Documents', icon: 'nc-diamond', class: '' },
  { path: '/home/codemap', title: 'Code Mapping', icon: 'nc-tile-56', class: '' },
  { path: '/home/admin-settings', title: 'Admin Settings', icon: 'nc-single-02', class: '' },
];

@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}

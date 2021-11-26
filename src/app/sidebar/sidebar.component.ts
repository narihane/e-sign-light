import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/submit-invoice', title: 'Submit Invoice', icon: 'nc-bank', class: '' },
  { path: '/get-invoices', title: 'Get Documents', icon: 'nc-diamond', class: '' },
  { path: '/pending-invoices',         title: 'Pending Invoices',             icon:'nc-diamond',    class: '' },
  { path: '/admin-settings', title: 'Admin Settings', icon: 'nc-single-02', class: '' },
  { path: '/codemap', title: 'Code Mapping', icon: 'nc-tile-56', class: '' },

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

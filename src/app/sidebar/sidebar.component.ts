import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/submit-invoice',     title: 'Submit Invoice',         icon:'nc-bank',       class: '' },
    { path: '/pending',         title: 'Pending Invoices',             icon:'nc-diamond',    class: '' },
    { path: '/approved',          title: 'Approved Invoices',              icon:'nc-pin-3',      class: '' },
    { path: '/rejected', title: 'Rejected Invoices',     icon:'nc-bell-55',    class: '' },
    { path: '/submitted',    title: 'Submitted Invoices',        icon:'nc-caps-small', class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/codemap',         title: 'Code Mapping',        icon:'nc-tile-56',    class: '' },

];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[]=[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}

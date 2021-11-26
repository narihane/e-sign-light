import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { CodeMappingComponent } from './code-mapping/code-mapping.component';
import { GetInvoicesComponent } from './get-invoices/get-invoices.component';
import { LoginComponent } from './login/login.component';
import { PendingInvoicesComponent } from './pending-invoices/pending-invoices.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubmitInvoiceComponent } from './submit-invoice/submit-invoice.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', component: SidebarComponent, //canActivate: [AuthorizeGuard],
    children:
      [{ path: '', redirectTo: 'get-invoices', pathMatch: 'full', },
      { path: 'submit-invoice', component: SubmitInvoiceComponent },
      { path: 'pending-invoices', component: PendingInvoicesComponent },
      { path: 'admin-settings', component: AdminSettingsComponent },
      { path: 'codemap', component: CodeMappingComponent },
      { path: 'get-invoices', component: GetInvoicesComponent }, //canActivate: [AdminGuard]},
      { path: '**', redirectTo: '**' }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

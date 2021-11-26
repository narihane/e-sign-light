import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { CodeMappingComponent } from './code-mapping/code-mapping.component';
import { GetInvoicesComponent } from './get-invoices/get-invoices.component';
import { LoginComponent } from './login/login.component';
import { PendingInvoicesComponent } from './pending-invoices/pending-invoices.component';
import { AuthGuard } from './shared/_guards/authGuard';
import { Role } from './shared/_models/role.model';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubmitInvoiceComponent } from './submit-invoice/submit-invoice.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', component: SidebarComponent, canActivate: [AuthGuard],
    children:
      [{ path: '', redirectTo: 'get-invoices', pathMatch: 'full', },
      { path: 'submit-invoice', component: SubmitInvoiceComponent },
      { path: 'pending-invoices', component: PendingInvoicesComponent, data: { roles: [Role.Admin] } },
      { path: 'admin-settings', component: AdminSettingsComponent, data: { roles: [Role.Admin] } },
      { path: 'codemap', component: CodeMappingComponent, data: { roles: [Role.Admin] } },
      { path: 'get-invoices', component: GetInvoicesComponent, data: { roles: [Role.Admin] } }, //canActivate: [AdminGuard]},
      { path: '**', redirectTo: '**' }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

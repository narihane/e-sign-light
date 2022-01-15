import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { CodeMappingComponent } from './code-mapping/code-mapping.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubmittedDocumentsComponent } from './submitted-documents/submitted-documents.component';
import { LoginComponent } from './login/login.component';
import { PendingInvoicesComponent } from './pending-invoices/pending-invoices.component';
import { AuthGuard } from './shared/_guards/authGuard';
import { Role } from './shared/_models/role.model';
import { ReceivedDocumentsComponent } from './received-documents/received-documents.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubmitInvoiceComponent } from './submit-invoice/submit-invoice.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'e-sign-light', component: LoginComponent },
  {
    path: '', component: SidebarComponent, canActivate: [AuthGuard],
    children:
      [{ path: '', redirectTo: 'add-invoice', pathMatch: 'prefix', },
      { path: 'dashboard', component: DashboardComponent, data: { roles: [Role.Admin] } },
      { path: 'add-invoice', component: SubmitInvoiceComponent },
      { path: 'admin-settings', component: AdminSettingsComponent, data: { roles: [Role.Admin] } },
      { path: 'pending-invoices', component: PendingInvoicesComponent , data: { roles: [Role.Admin] } },
      { path: 'codemap', component: CodeMappingComponent, data: { roles: [Role.Admin] } },
      { path: 'submitted-documents', component: SubmittedDocumentsComponent, data: { roles: [Role.Admin] } }, //canActivate: [AdminGuard]},
      { path: 'received-documents', component: ReceivedDocumentsComponent , data: { roles: [Role.Admin] } },
      { path: '**', redirectTo: '**' }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

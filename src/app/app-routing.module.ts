import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { CodeMappingComponent } from './code-mapping/code-mapping.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubmittedDocumentsComponent } from './submitted-documents/submitted-documents.component';
import { LoginComponent } from './login/login.component';
import { ReceivedDocumentsComponent } from './received-documents/received-documents.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubmitInvoiceComponent } from './submit-invoice/submit-invoice.component';
import { PendingInvoicesComponent } from './pending-invoices/pending-invoices.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', component: SidebarComponent, //canActivate: [AuthorizeGuard],
    children:
      [{ path: '', redirectTo: 'submitted-invoices', pathMatch: 'full', },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-invoice', component: SubmitInvoiceComponent },
      { path: 'admin-settings', component: AdminSettingsComponent },
      { path: 'pending-invoices', component: PendingInvoicesComponent },
      { path: 'codemap', component: CodeMappingComponent },
      { path: 'submitted-documents', component: SubmittedDocumentsComponent }, //canActivate: [AdminGuard]},
      { path: 'received-documents', component: ReceivedDocumentsComponent },
      { path: '**', redirectTo: '**' }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

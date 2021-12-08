import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubmitInvoiceComponent } from './submit-invoice/submit-invoice.component';
import { PrintInvoiceComponent } from './shared/print-invoice/print-invoice.component';
import { NgxPrintModule } from 'ngx-print';
import { AuthGuard } from './shared/_guards/authGuard';
import { APP_BASE_HREF } from '@angular/common';
import { AuthenticationService } from './shared/_services/authentication.service';
import { UserService } from './shared/_services/user.service';
import { UploadFilesService } from './shared/_services/upload-file.service';
import { AppService } from './shared/_services/app.service';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/_helpers/jwt.interceptor';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { CodeMappingComponent } from './code-mapping/code-mapping.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SubmittedDocumentsComponent } from './submitted-documents/submitted-documents.component';
import { LoginComponent } from './login/login.component';
import { MatSortModule } from '@angular/material/sort';
import { CodesService } from './shared/_services/codes.service';
import { DocumentService } from './shared/_services/document.service';
import { IssuerService } from './shared/_services/issuer.service';
import { NotificationService } from './shared/_services/notifications.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InvoiceService } from './shared/_services/invoice.service';
import { PendingInvoicesComponent } from './pending-invoices/pending-invoices.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { ErrorInterceptor } from './shared/_helpers/error.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceivedDocumentsComponent } from './received-documents/received-documents.component';
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { PercentageMaskDirective } from './shared/_directives/percentage-mask.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SubmitInvoiceComponent,
    PrintInvoiceComponent,
    AdminSettingsComponent,
    CodeMappingComponent,
    RegisteredUsersComponent,
    LoginComponent,
    PendingInvoicesComponent,
    DialogComponent,
    SubmittedDocumentsComponent,
    LoginComponent,
    DashboardComponent,
    ReceivedDocumentsComponent,
    PendingInvoicesComponent,
    PercentageMaskDirective,
  ],
  exports: [MatInputModule, MatFormFieldModule, PercentageMaskDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxPrintModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    MatCurrencyFormatModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    AuthenticationService,
    UserService,
    CodesService,
    UploadFilesService,
    DocumentService,
    IssuerService,
    InvoiceService,
    NotificationService,
    InvoiceService,
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

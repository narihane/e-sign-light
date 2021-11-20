import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubmitInvoiceComponent } from './submit-invoice/submit-invoice.component';
import { PrintInvoiceComponent } from './shared/print-invoice/print-invoice.component';
import {NgxPrintModule} from 'ngx-print';
import { AuthGuard } from './shared/_guards/authGuard';
import { APP_BASE_HREF } from '@angular/common';
import { AuthenticationService } from './shared/_services/authentication.service';
import { UserService } from './shared/_services/user.service';
import { UploadFilesService } from './shared/_services/upload-file.service';
import { AppService } from './shared/_services/app.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/_helpers/jwt.interceptor';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { CodeMappingComponent } from './code-mapping/code-mapping.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetInvoicesComponent } from './get-invoices/get-invoices.component';
import { LoginComponent } from './login/login.component';
import { CodesService } from './shared/_services/codes.service';
import { DocumentService } from './shared/_services/document.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SubmitInvoiceComponent,
    PrintInvoiceComponent,
    AdminSettingsComponent,
    CodeMappingComponent,
    RegisteredUsersComponent,
    GetInvoicesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },
  AuthGuard,
  AuthenticationService,
  UserService,
  CodesService,
  UploadFilesService,
  DocumentService,
  AppService
  // ,
  // {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: JwtInterceptor,
  //     multi: true
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SubmitInvoiceComponent,
    PrintInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },
  AuthGuard,
  AuthenticationService,
  UserService,
  UploadFilesService,
  AppService,
  {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

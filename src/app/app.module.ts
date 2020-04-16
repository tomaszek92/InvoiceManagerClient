import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesListComponent,
    InvoiceDetailsComponent,
    ClientsListComponent,
    ClientDetailsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

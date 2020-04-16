import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';

const routes: Routes = [
  { path: 'clients', component: ClientsListComponent },
  { path: 'clients/:id', component: ClientDetailsComponent },
  { path: 'invoices', component: InvoicesListComponent },
  { path: 'invoices/:id', component: InvoiceDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

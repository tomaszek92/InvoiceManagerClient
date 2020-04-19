import { Component, OnInit } from '@angular/core';
import { Invoice } from '../invoice.model';
import { InvoicesService } from '../invoices.service';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent implements OnInit {

  isLoading: boolean;
  invoices: Invoice[] = [];

  constructor(private invoicesService: InvoicesService) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.isLoading = true;
    this.invoicesService
      .getAll()
      .subscribe(
        invoices => this.invoices = invoices,
        error => {},
        () => this.isLoading = false);
  }

  deleteInvoice(invoiceId: number) {
    this.isLoading = true;
    this.invoicesService
      .delete(invoiceId)
      .subscribe(
        () => this.invoices = this.invoices.filter(invoice => invoice.id !== invoiceId),
        error => {},
        () => this.isLoading = false);
  }

}

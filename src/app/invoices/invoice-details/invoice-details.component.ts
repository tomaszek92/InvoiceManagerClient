import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../invoices.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentType } from '../payment-type.model';
import { Client } from 'src/app/clients/client.model';
import { ClientsService } from 'src/app/clients/clients.service';
import { Months } from './month-list';
import { PaymentTypes } from './payment-type-list';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

  isLoading: boolean;
  invoiceForm: FormGroup;
  clients: Client[];
  months = Months;
  paymentTypes = PaymentTypes;

  constructor(
    private invoicesService: InvoicesService,
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.clientsService
      .getAll()
      .subscribe(clients => {
        this.clients = clients;
        this.clients.sort((client1, clinet2) => client1.name.localeCompare(clinet2.name));
      });

    this.initInvoiceForm();

    const invoiceId = parseInt(this.route.snapshot.params.id, 10);
    if (invoiceId) {
      this.getInvoice(invoiceId);
    }
  }

  initInvoiceForm() {
    this.invoiceForm = new FormGroup({
      id: new FormControl(0),
      year: new FormControl(new Date().getFullYear(), [Validators.min(2000)]),
      month: new FormControl(new Date().getMonth() + 1),
      number: new FormControl(null, [Validators.min(1)]),
      clientId: new FormControl(null, [Validators.required]),
      sellDate: new FormControl(new Date(), [Validators.required]),
      issueDate: new FormControl(new Date(), [Validators.required]),
      paytime: new FormControl(1, [Validators.min(1)]),
      paymentType: new FormControl(PaymentType.BankTransfer),
      isPayed: new FormControl(false)
    });
  }

  getInvoice(id: number) {
    this.isLoading = true;
    this.invoicesService
      .getById(id)
      .subscribe(
        invoice => this.invoiceForm.setValue(invoice),
        error => {},
        () => this.isLoading = false
      );
  }

  saveInvoice(invoice) {
    this.isLoading = true;

    if (invoice === 0) {
      this.invoicesService
        .create(invoice)
        .subscribe(
          i => this.invoiceForm.setValue(i),
          error => {},
          () => this.isLoading = false
        );
    } else {
      this.invoicesService
        .update(invoice)
        .subscribe(
          () => {},
          error => {},
          () => this.isLoading = false
        );
    }
  }

  deleteInvoice() {
    const invoiceId = parseInt(this.route.snapshot.params.id, 10);
    this.isLoading = true;
    this.invoicesService
      .delete(invoiceId)
      .subscribe(
        () => this.cancel(),
        error => {},
        () => this.isLoading = false
      );
  }

  hasError(controlName: string, errorName: string) {
    return this.invoiceForm.controls[controlName].hasError(errorName);
  }

  cancel() {
    this.location.back();
  }

  getTitle(): string {
    const id = this.invoiceForm.get('id').value;
    return id === 0 ? 'Dodaj' : 'Edytuj';
  }

}

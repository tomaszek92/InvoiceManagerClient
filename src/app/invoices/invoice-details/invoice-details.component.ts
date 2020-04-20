import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../invoices.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PaymentType } from '../payment-type.model';
import { Client } from 'src/app/clients/client.model';
import { ClientsService } from 'src/app/clients/clients.service';
import { Months } from './month-list';
import { PaymentTypes } from './payment-type-list';
import { Invoice } from '../invoice.model';
import { Month } from '../month.model';
import { InvoiceRow } from '../invoice-row.model';

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

    this.initInvoiceForm(new Invoice());
    const invoiceId = parseInt(this.route.snapshot.params.id, 10);
    if (invoiceId) {
      this.getInvoice(invoiceId);
    }
  }

  initInvoiceForm(invoice: Invoice) {
    this.invoiceForm = new FormGroup({
      id: new FormControl(invoice.id),
      year: new FormControl(invoice.year, [Validators.required, Validators.min(2000)]),
      month: new FormControl(invoice.month, [Validators.required]),
      number: new FormControl(invoice.number, [Validators.required, Validators.min(1)]),
      clientId: new FormControl(invoice.clientId, [Validators.required]),
      sellDate: new FormControl(invoice.sellDate, [Validators.required]),
      issueDate: new FormControl(invoice.issueDate, [Validators.required]),
      paytime: new FormControl(invoice.paytime, [Validators.required, Validators.min(1)]),
      paymentType: new FormControl(invoice.paymentType, [Validators.required]),
      isPayed: new FormControl(invoice.isPayed),
      rows: new FormArray(invoice.rows.map(row => this.initInvoiceRowForm(row)), [Validators.required])
    });
  }

  initInvoiceRowForm(row: InvoiceRow) {
    return new FormGroup({
      id: new FormControl(row.id),
      name: new FormControl(row.name, [Validators.required]),
      count: new FormControl(row.count, [Validators.required, Validators.min(1)]),
      vatRate: new FormControl(row.vatRate, [Validators.required, Validators.min(0)]),
      unitPriceNet: new FormControl(row.unitPriceNet, [Validators.required, Validators.min(0)])
    });
  }

  getInvoice(id: number) {
    this.isLoading = true;
    this.invoicesService
      .getById(id)
      .subscribe(
        invoice => this.initInvoiceForm(invoice),
        error => {},
        () => this.isLoading = false
      );
  }

  saveInvoice(invoice) {
    this.isLoading = true;

    if (invoice.id) {
      this.invoicesService
        .update(invoice)
        .subscribe(
          () => {},
          error => {},
          () => this.isLoading = false
        );
    } else {
      this.invoicesService
        .create(invoice)
        .subscribe(
          i => this.initInvoiceForm(i),
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

  hasRowError(controlName: string, index: number, errorName: string) {
    const rowFormGroup = (this.invoiceForm.get('rows') as FormArray).controls[index] as FormGroup;
    return rowFormGroup.controls[controlName].hasError(errorName);
  }

  getRowControls() {
    return (this.invoiceForm.get('rows') as FormArray).controls;
  }

  cancel() {
    this.location.back();
  }

  getTitle(): string {
    const id = this.invoiceForm.get('id').value;
    return id ? 'Edytuj' : 'Dodaj';
  }

  addRow() {
    const control = this.invoiceForm.get('rows') as FormArray;
    control.push(this.initInvoiceRowForm(new InvoiceRow()));
  }

  deleteRow(i: number) {
    const control = this.invoiceForm.get('rows') as FormArray;
    control.removeAt(i);
  }

}

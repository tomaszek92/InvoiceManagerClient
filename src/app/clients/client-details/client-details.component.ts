import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NipValidator } from './nip.validator';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  isLoading: boolean;
  clientForm: FormGroup;

  constructor(private clientsService: ClientsService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.initClientForm();

    const clientId = parseInt(this.route.snapshot.params.id, 10);
    if (clientId) {
      this.getClient(clientId);
    }
  }

  initClientForm() {
    this.clientForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      nip: new FormControl('', [Validators.required, NipValidator()]),
      address: new FormControl('', [Validators.required]),
      country: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      phoneNumber: new FormControl('')
    });
  }

  getClient(id: number) {
    this.isLoading = true;
    this.clientsService
      .getById(id)
      .subscribe(
        client => this.clientForm.setValue(client),
        error => {},
        () => this.isLoading = false
      );
  }

  saveClient(client) {
    this.isLoading = true;

    if (client.id === 0) {
      this.clientsService
        .create(client)
        .subscribe(
          c => this.clientForm.setValue(c),
          error => {},
          () => this.isLoading = false
        );
    } else {
      this.clientsService
        .update(client)
        .subscribe(
          () => {},
          error => {},
          () => this.isLoading = false
        );
    }
  }

  deleteClient() {
    const clientId = parseInt(this.route.snapshot.params.id, 10);
    this.isLoading = true;
    this.clientsService
      .delete(clientId)
      .subscribe(
        () => this.cancel(),
        error => {},
        () => this.isLoading = false
      );
  }

  hasError(controlName: string, errorName: string) {
    return this.clientForm.controls[controlName].hasError(errorName);
  }

  cancel() {
    this.location.back();
  }

  getTitle(): string {
    const id = this.clientForm.get('id').value;
    return id === 0 ? 'Dodaj' : 'Edytuj';
  }

}

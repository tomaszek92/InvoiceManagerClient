import { Component, OnInit } from '@angular/core';
import { ClientsService  } from '../clients.service';
import { Client } from '../client.model';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  clients: Client[];
  isLoading: boolean;

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.clientsService
      .getAll()
      .subscribe(
        clients => {
          this.clients = clients;
          this.clients.sort((client1, clinet2) => client1.name.localeCompare(clinet2.name));
        },
        error => {},
        () => this.isLoading = false);
  }

}

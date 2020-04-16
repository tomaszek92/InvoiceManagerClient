import { Component, OnInit } from '@angular/core';
import { ClientsService  } from '../services/clients.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  clients: Client[];

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.clientsService
      .getAll()
      .subscribe((clients: Client[]) => {
        this.clients = clients;
      });
  }

}

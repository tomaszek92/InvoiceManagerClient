import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.getUrl());
  }

  getById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.getUrl()}/${id}`);
  }

  create(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.getUrl(), client);
  }

  update(client: Client) {
    return this.httpClient.put(`${this.getUrl()}/${client.id}`, client);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.getUrl()}/${id}`);
  }

  private getUrl(): string {
    return `${environment.apiUrl}/clients`;
  }
}

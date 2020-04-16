import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${environment.apiUrl}/clients`);
  }

  getById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/clients/${id}`);
  }
}

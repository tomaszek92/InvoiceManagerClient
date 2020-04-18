import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Invoice } from './invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(this.getUrl());
  }

  getById(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${this.getUrl()}/${id}`);
  }

  create(invoice: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(this.getUrl(), invoice);
  }

  update(invoice: Invoice) {
    return this.httpClient.put(`${this.getUrl()}/${invoice.id}`, invoice);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.getUrl()}/${id}`);
  }

  private getUrl(): string {
    return `${environment.apiUrl}/invoices`;
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Constants } from '../../../commons/constants/constants.enum';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = `${environment.API_URL}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, this.setHeaders());
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, this.setHeaders());
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.apiUrl, product, this.setHeaders());
  }

  updateProduct(id: string, product: Product): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      product,
      this.setHeaders()
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.setHeaders());
  }

  private setHeaders() {
    const token = localStorage.getItem(Constants.TOKEN_KEY) ?? '';
    const headers = new HttpHeaders().set('Authorization', token);
    return { headers };
  }
}

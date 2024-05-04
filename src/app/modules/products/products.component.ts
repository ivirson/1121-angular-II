import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { first } from 'rxjs';
import { Product } from './models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products?: Product[];
  apiUrl = 'https://crudcrud.com/api/05384c6e8e9346029c11d6e78d41f312/products';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.http
      .get<Product[]>(this.apiUrl)
      .pipe(first())
      .subscribe({
        next: (response: Product[]) => {
          this.products = response;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

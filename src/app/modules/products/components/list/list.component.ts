import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Subject, first } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject();

  products?: Product[];

  // observable = new Observable((observer) => {
  //   let counter = 0;
  //   setInterval(() => {
  //     observer.next(++counter);
  //   }, 1000);
  // });

  constructor(private productsService: ProductsService) {}

  // Executado uma só vez, quando o componente é iniciado e após receber todos os dados provenientes de @Input()
  ngOnInit(): void {
    this.getProducts();

    // this.observable
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((response) => console.log(response));
  }

  getProducts(): void {
    this.productsService
      .getProducts()
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

  // Executado quando o componente for destruído, ou seja, quando ele for removido da tela
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Subject, first } from 'rxjs';
import { ConfirmationModalComponent } from '../../../../commons/components/confirmation-modal/confirmation-modal.component';
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

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private router: Router
  ) {}

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

  onDelete(id: string): void {
    this.productsService
      .deleteProduct(id)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.getProducts();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  openDialog(id: string): void {
    const dialog = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      disableClose: true,
      data: {
        id,
      },
    });

    dialog
      .afterClosed()
      .pipe(first())
      .subscribe((res) => {
        if (res) {
          this.onDelete(id);
        }
      });
  }

  editProduct(id: string): void {
    this.router.navigate(['products', 'edit', id]);
  }

  // Executado quando o componente for destruído, ou seja, quando ele for removido da tela
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}

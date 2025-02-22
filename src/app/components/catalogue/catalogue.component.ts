import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Router} from '@angular/router';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {CurrencyPipe} from '@angular/common';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {MapleSyrupTypePipe} from '@shared-pipes/maple-syrup-type.pipe';
import {CatalogueItemModel} from '@shared-models/catalogue-item.model';
import {ProductService} from '@shared-services/product.service';
import {CustomerService} from '@shared-services/customer.service';
import {CartService} from '@shared-services/cart.service';
import {ErrorService} from '@shared-services/error.service';
import {SnackbarService} from '@shared-services/snackbar.service';

@UntilDestroy()
@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIcon,
    MatChip,
    MatChipSet,
    MapleSyrupTypePipe,
    CurrencyPipe
  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'price', 'maxQty', 'type', 'actions'];
  dataSource$: Observable<CatalogueItemModel[]>;
  private currentCustomer: number | undefined;

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private cartService: CartService,
    private errorService: ErrorService,
    private snackBarService: SnackbarService,
    private router: Router
  ) {
    this.dataSource$ = this.productService
      .getProductCatalogue()
      .pipe(
        catchError(err => {
          this.errorService.handleError(err.error);
          return of([]);
        }),
        untilDestroyed(this)
      );
  }

  ngOnInit(): void {
    this.customerService.getCurrentCustomer()
      .pipe(untilDestroyed(this))
      .subscribe(customer => this.currentCustomer = customer);
  }

  onRowClicked(row: CatalogueItemModel) {
    this.router.navigate([`/produits/${row.id}`]);
  }

  onAddToCart(row: CatalogueItemModel) {
    if (!this.currentCustomer) {
      console.error('user must be found !');
      return;
    }
    const quantiy = 1;
    const cartId = 1;
    this.cartService.addToCart(Number(row.id), cartId, this.currentCustomer, quantiy)
      .pipe(
        catchError(err => {
          this.errorService.handleError(err.error);
          return EMPTY;
        }),
        untilDestroyed(this))
      .subscribe(() => this.snackBarService.showSuccess("Produit ajouté", "Merci!", {duration: 1000}));
  }

}

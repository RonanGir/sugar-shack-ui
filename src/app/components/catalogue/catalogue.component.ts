import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ProductService} from '../../shared/services/product.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {CatalogueItemModel} from '../../shared/models/catalogue-item.model';
import {Router} from '@angular/router';
import {CartService} from '../../shared/services/cart.service';
import {CustomerService} from '../../shared/services/customer.service';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {MapleSyrupTypePipe} from '../../shared/pipes/maple-syrup-type.pipe';

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
    MapleSyrupTypePipe
  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'price', 'maxQty', 'type', 'actions'];
  dataSource = new MatTableDataSource<CatalogueItemModel>([]);
  private currentCustomer: number | undefined

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private cartService: CartService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.productService
      .getProductCatalogue()
      .pipe(untilDestroyed(this))
      .subscribe(catalogueItems => {
        this.dataSource.data = catalogueItems;
      })

    this.customerService.getCurrentCustomer()
      .pipe(untilDestroyed(this))
      .subscribe(customer => this.currentCustomer = customer);
  }

  onRowClicked(row: CatalogueItemModel) {
    this.router.navigate([`/produits/${row.id}`]);
  }

  onAddToCart(row: CatalogueItemModel) {
    if (!this.currentCustomer) {
      console.error('user must be found !')
      return
    }
    const quantiy = 1
    const cartId = 1
    this.cartService.addToCart(Number(row.id), cartId, this.currentCustomer, quantiy).pipe(untilDestroyed(this)).subscribe();
  }

}

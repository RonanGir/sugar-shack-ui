import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ProductService} from '../../shared/services/product.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {CatalogueItemModel} from '../../shared/models/catalogue-item.model';
import {Router} from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'price', 'maxQty', 'type', 'actions'];
  dataSource = new MatTableDataSource<CatalogueItemModel>([]);

  constructor(
    private productService: ProductService,
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
  }

  onRowClicked(row: CatalogueItemModel) {
    this.router.navigate([`/produits/${row.id}`]);
  }

}

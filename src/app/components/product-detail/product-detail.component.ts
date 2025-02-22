import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {MapleSyrupTypePipe} from '@shared-pipes/maple-syrup-type.pipe';
import {ProductDetailModel} from '@shared-models/product-detail.model';
import {ProductService} from '@shared-services/product.service';
import {catchError, EMPTY, Observable} from 'rxjs';
import {ErrorService} from '@shared-services/error.service';

@UntilDestroy()
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    MapleSyrupTypePipe,
    CurrencyPipe,
    AsyncPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  product$: Observable<ProductDetailModel>;

  constructor(
    private productService: ProductService,
    private errorService: ErrorService,
    private route: ActivatedRoute
  ) {
    const productId = this.route.snapshot.paramMap.get('productId');
    this.product$ = this.productService.getProductDetail(Number(productId))
      .pipe(
        catchError(err => {
          this.errorService.handleError(err.error);
          return EMPTY;
        }),
        untilDestroyed(this));
  }

}

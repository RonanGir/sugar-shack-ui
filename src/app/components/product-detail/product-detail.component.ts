import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {ProductDetailModel} from '../../shared/models/product-detail.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {MapleSyrupTypePipe} from "../../shared/pipes/maple-syrup-type.pipe";

@UntilDestroy()
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    MapleSyrupTypePipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  product: ProductDetailModel | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (!isNaN(Number(productId)))
      this.productService.getProductDetail(Number(productId))
        .pipe(untilDestroyed(this))
        .subscribe(prod => this.product = prod);
  }


}

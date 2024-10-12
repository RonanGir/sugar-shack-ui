import {Injectable} from '@angular/core';
import {ProductControllerClient} from '@api/product-controller.client';
import {map, Observable} from 'rxjs';
import {CatalogueItemModel} from '../models/catalogue-item.model';
import {TypeEnum} from '../models/enums/type.enum';
import {CatalogueItemDto} from '../../../../generated/maple-orders-api/model/catalogue-item-dto';
import {ProductDetailModel} from '../models/product-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private productController: ProductControllerClient
  ) {
  }

  getProductDetail(id: number): Observable<ProductDetailModel> {
    return this.productController.getProductDetails(id)
      .pipe(map((product: any) => ({...product, type: product.type as TypeEnum})));
  }

  getProductCatalogue(): Observable<CatalogueItemModel[]> {
    return this.productController.getProducts()
      .pipe(map((products: CatalogueItemDto[]) => {
        return products.map(product => ({
          ...product,
          type: product.type as TypeEnum
        }))
      }))
  }
}

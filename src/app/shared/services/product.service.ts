import {Injectable} from '@angular/core';
import {ProductControllerClient} from '@maple-orders-api/product-controller.client';
import {map, Observable} from 'rxjs';
import {CatalogueItemModel} from '@shared-models/catalogue-item.model';
import {TypeEnum} from '@shared-models/enums/type.enum';
import {CatalogueItemDto} from '@maple-orders-api/catalogue-item-dto';
import {ProductDetailModel} from '@shared-models/product-detail.model';

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
      .pipe(
        map((products: CatalogueItemDto[]) => {
          return products.map(product => ({
            ...product,
            type: product.type as TypeEnum
          }));
        }));
  }
}

import {Injectable} from '@angular/core';
import {ProductControllerClient} from '@api/product-controller.client';
import {map, Observable} from 'rxjs';
import {CatalogueItemModel} from '../models/catalogue-item.model';
import {TypeEnum} from '../models/enums/type.enum';
import {CatalogueItemDto} from '../../../../generated/maple-orders-api/model/catalogue-item-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private productController: ProductControllerClient
  ) {
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

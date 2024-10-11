import {TypeEnum} from './enums/type.enum';

export interface CatalogueItemModel {
  id: string;
  image: string;
  name: string;
  price: number;
  maxQty: number;
  type: TypeEnum
}

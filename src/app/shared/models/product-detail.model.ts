import {TypeEnum} from './enums/type.enum';

export interface ProductDetailModel {
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
  type: TypeEnum
}

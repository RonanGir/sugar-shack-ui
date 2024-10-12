import {ProductOrderItemModel} from './catalogue-item.model';

export interface OrderItemModel {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  quantity?: number;
  totalPrice?: number;
  productDto?: ProductOrderItemModel;
  orderId?: number;
  customerId?: number;
}

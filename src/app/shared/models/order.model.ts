import {TransactionEnum} from './enums/transaction.enum';

export interface OrderModel {
  id?: number;
  updatedAt?: Date;
  quantity?: number;
  totalPrice?: number;
  status?: TransactionEnum
}

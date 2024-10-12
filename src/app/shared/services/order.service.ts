import {Injectable} from '@angular/core';
import {OrderControllerClient} from '@api/order-controller.client';
import {map, Observable} from 'rxjs';
import {OrderValidationModel} from '../models/order-validation.model';
import {OrderModel} from '../models/order.model';
import {TransactionEnum} from '../models/enums/transaction.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private orderController: OrderControllerClient
  ) {
  }

  placeOrder(cartId: number, userId: number): Observable<OrderValidationModel> {
    return this.orderController.placeOrder({cartId, userId});
  }

  getOrdersByCustomer(id: number): Observable<OrderModel[]> {
    return this.orderController.getOrdersByUser(id)
      .pipe(map(orders => orders.map(order => {
        let date;
        if (order.updatedAt) {
          date = new Date(order.updatedAt)
        }
        return ({...order, updatedAt: date, status: order.status as TransactionEnum})
      })));
  }
}

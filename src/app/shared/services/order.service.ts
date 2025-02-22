import {Injectable} from '@angular/core';
import {OrderControllerClient} from '@maple-orders-api/order-controller.client';
import {map, Observable, switchMap} from 'rxjs';
import {CustomerService} from '@shared-services/customer.service';
import {OrderValidationModel} from '@shared-models/order-validation.model';
import {OrderModel} from '@shared-models/order.model';
import {TransactionEnum} from '@shared-models/enums/transaction.enum';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(
    private orderController: OrderControllerClient,
    private customerService: CustomerService
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
          date = new Date(order.updatedAt);
        }
        return ({...order, updatedAt: date, status: order.status as TransactionEnum});
      })));
  }

  getCurrentCustomerOrder(): Observable<OrderModel[]> {
    return this.customerService.getCurrentCustomer()
      .pipe(switchMap(customer => {
        return this.getOrdersByCustomer(customer);
      }));
  }
}

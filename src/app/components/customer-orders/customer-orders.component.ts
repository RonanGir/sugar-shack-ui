import {Component} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {AsyncPipe, CurrencyPipe, DatePipe} from '@angular/common';
import {catchError, Observable, of} from 'rxjs';
import {OrderStatusPipe} from '@shared-pipes/order-status.pipe';
import {OrderModel} from '@shared-models/order.model';
import {OrderService} from '@shared-services/order.service';
import {ErrorService} from '@shared-services/error.service';

@UntilDestroy()
@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatTable,
    OrderStatusPipe,
    DatePipe,
    CurrencyPipe,
    AsyncPipe
  ],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent {

  displayedColumns: string[] = ['id', 'totalPrice', 'status', 'updatedAt'];
  dataSource$: Observable<OrderModel[]>;

  constructor(
    private orderService: OrderService,
    private errorService: ErrorService
  ) {
    this.dataSource$ = this.orderService.getCurrentCustomerOrder()
      .pipe(
        catchError(err => {
          this.errorService.handleError(err);
          return of(([]));
        }),
        untilDestroyed(this)
      );
  }

}

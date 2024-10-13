import {Component, OnInit} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CustomerService} from '../../shared/services/customer.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {OrderModel} from '../../shared/models/order.model';
import {OrderService} from '../../shared/services/order.service';
import {switchMap} from 'rxjs';
import {OrderStatusPipe} from '../../shared/pipes/order-status.pipe';
import {CurrencyPipe, DatePipe} from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatTable,
    OrderStatusPipe,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'totalPrice', 'status', 'updatedAt'];
  dataSource = new MatTableDataSource<OrderModel>([]);
  private currentCustomer: number | undefined;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {


    this.customerService.getCurrentCustomer()
      .pipe(switchMap(customer => {
          this.currentCustomer = customer;
          return this.orderService
            .getOrdersByCustomer(customer);
        }),
        untilDestroyed(this))
      .subscribe(catalogueItems => {
        this.dataSource.data = catalogueItems;
      });
  }

}

import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Router, RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {catchError, EMPTY} from 'rxjs';
import {ChangeQuantityComponent} from '@app/shared/components/change-quantity/change-quantity.component';
import {CartService} from '@shared-services/cart.service';
import {OrderService} from '@shared-services/order.service';
import {CartItemModel} from '@shared-models/cart-item.model';
import {CustomerService} from '@shared-services/customer.service';
import {ErrorService} from '@shared-services/error.service';
import {SnackbarService} from '@shared-services/snackbar.service';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIcon,
    ChangeQuantityComponent,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'totalLine', 'actions'];
  dataSource = new MatTableDataSource<CartItemModel>([]);
  subTotal: number = 0;
  cartId: number | undefined;
  userId: number | undefined;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private errorService: ErrorService,
    private snackBarService: SnackbarService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cartService.getCurrentCart()
      .pipe(
        catchError(err => {
          this.errorService.handleError(err);
          return EMPTY;
        }),
        untilDestroyed(this))
      .subscribe((currentCart: number) => {
        this.cartId = currentCart;
        this.refreshItems(currentCart);
      });

    this.customerService.getCurrentCustomer()
      .pipe(
        catchError(err => {
          this.errorService.handleError(err);
          return EMPTY;
        }),
        untilDestroyed(this))
      .subscribe(user => this.userId = user);
  }

  onUpdateQuantity($event: { newQty: number, productId: number }) {
    this.cartService.changeQty($event.productId, 1, $event.newQty)
      .pipe(
        catchError(err => {
          this.errorService.handleError(err);
          return EMPTY;
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        if (this.cartId) {
          this.refreshItems(this.cartId);
        }
      });
  }

  onRemoveFromCart(element: CartItemModel) {
    this.cartService.removeFromCart(element.productId, element.cartId)
      .pipe(
        catchError(err => {
          this.errorService.handleError(err);
          return EMPTY;
        }),
        untilDestroyed(this))
      .subscribe(() => {
        this.refreshItems(element.cartId);
      });
  }

  onPlaceOrder() {
    if (this.userId && this.cartId) {
      this.orderService.placeOrder(this.cartId, this.cartId)
        .pipe(untilDestroyed(this))
        .subscribe(orderValidation => {
          if (!orderValidation.isOrderValid) {
            orderValidation.errors?.forEach((msg, index) => {
              setTimeout(() => {
                this.snackBarService.showSuccess(msg, "Let's go", {duration: 1000});
              }, index * 1000);
            });
          } else {
            this.snackBarService.showSuccess("Commande validée", "'Fait Plaisir !", {duration: 1000});
            this.router.navigate(['/mes-commandes']);
          }
        });
    }
  }


  private refreshItems(cartId: number) {
    this.cartService.getCartItems(cartId)
      .pipe(untilDestroyed(this))
      .subscribe(cartItems => {
        this.dataSource.data = cartItems;
        this.subTotal = cartItems.reduce((accumulator, item) => accumulator + (item.price * item.qty),
          0);
      });
  }

}

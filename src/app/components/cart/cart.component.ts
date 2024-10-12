import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {CartService} from '../../shared/services/cart.service';
import {CartItemModel} from '../../shared/models/cart-item.model';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ChangeQuantityComponent} from '../../shared/components/change-quantity/change-quantity.component';
import {Router, RouterLink} from '@angular/router';
import {OrderService} from '../../shared/services/order.service';
import {CustomerService} from '../../shared/services/customer.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIcon,
    ChangeQuantityComponent,
    RouterLink
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
  private _snackBar = inject(MatSnackBar);

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cartService.getCurrentCart()
      .pipe(
        untilDestroyed(this))
      .subscribe((currentCart: number) => {
        this.cartId = currentCart;
        this.refreshItems(currentCart);
      })

    this.customerService.getCurrentCustomer()
      .pipe(untilDestroyed(this))
      .subscribe(user => this.userId = user);
  }

  onUpdateQuantity($event: { newQty: number, productId: number }) {
    this.cartService.changeQty($event.productId, 1, $event.newQty)
      .pipe(untilDestroyed(this)).subscribe(() => {
      if (this.cartId) {
        this.refreshItems(this.cartId);
      }
    });
  }

  onRemoveFromCart(element: CartItemModel) {
    this.cartService.removeFromCart(element.productId, element.cartId)
      .pipe(untilDestroyed(this)).subscribe(() => {
      this.refreshItems(element.cartId);
    });
  }

  onPlaceOrder() {
    if (this.userId && this.cartId) {
      this.orderService.placeOrder(this.cartId, this.cartId)
        .pipe(untilDestroyed(this))
        .subscribe(orderValidation => {
          if (!orderValidation.isOrderValid) {
            orderValidation.errors?.forEach(msg => {
              this.openSnackBar(msg, "Let's go", {duration: 2000})
            });
          } else {
            this.openSnackBar("Commande validée", "'Fait Plaisir !", {duration: 1000})
            this.router.navigate(['/mes-commandes']);
          }
        });
    }
  }


  private refreshItems(cartId: number) {
    this.cartService.getCartItems(cartId).pipe(untilDestroyed(this)).subscribe(cartItems => {
      this.dataSource.data = cartItems
      this.subTotal = cartItems.reduce((accumulator, item) => accumulator + (item.price * item.qty),
        0);
    });
  }

  openSnackBar(message
                 :
                 string, action
                 :
                 string, p0
                 :
                 {
                   duration: number;
                 }) {
    this._snackBar.open(message, action);
  }

}

import {Injectable} from '@angular/core';
import {CartControllerClient} from '@maple-orders-api//cart-controller.client';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {CartItemModel} from '@shared-models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private currentCart$ = new BehaviorSubject<number>(1);

  constructor(
    private cartController: CartControllerClient
  ) {
  }

  getCurrentCart(): Observable<number> {
    return this.currentCart$.asObservable();
  }

  getCartItems(cartId: number): Observable<CartItemModel[]> {
    return this.cartController.getCartItemsById(cartId)
      .pipe(
        map(cartLines => cartLines.map(cartLine => ({...cartLine}))));
  }

  createCart(id: number): Observable<any> {
    return this.cartController.createCart(id);
  }

  addToCart(productId: number, id: number, userId: number, qty: number): Observable<void> {
    return this.cartController.addToCart(productId, id, userId, qty);
  }

  removeFromCart(productId: number, id: number): Observable<void> {
    return this.cartController.removeFromCart(productId, id);
  }

  changeQty(productId: number, id: number, newQty: number): Observable<void> {
    return this.cartController.changeQty(id, productId, newQty);
  }

}

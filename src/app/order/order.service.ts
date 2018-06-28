import {Injectable} from '@angular/core';
import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order} from './order.model';
import {Observable} from 'rxjs';
import {MEAT_API} from '../app.api';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OrderService {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private http: HttpClient
  ) {
  }

  cartItems(): CartItem[] {
    return this.shoppingCartService.items;
  }

  increaseQty(item: CartItem) {
    this.shoppingCartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.shoppingCartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.shoppingCartService.removeItem(item);
  }

  itemsValue(): number {
    return this.shoppingCartService.total();
  }

  checkOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${MEAT_API}/orders`, order);
  }

  clear() {
    this.shoppingCartService.clear();
  }
}

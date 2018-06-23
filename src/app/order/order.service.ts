import {Injectable} from '@angular/core';
import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order} from './order.model';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {MEAT_API} from '../app.api';

@Injectable()
export class OrderService {

  constructor(private shoppingCartService: ShoppingCartService, private http: Http) {
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
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      `${MEAT_API}/orders`,
      JSON.stringify(order),
      new RequestOptions({headers: headers}))
      .map(response => response.json());
  }

  clear() {
    this.shoppingCartService.clear();
  }
}

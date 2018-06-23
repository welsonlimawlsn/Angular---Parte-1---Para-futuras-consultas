import {Component, OnInit} from '@angular/core';
import {RadioOption} from '../shared/radio/radio-option.model';
import {OrderService} from './order.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from './order.model';
import {Router} from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ];

  delivery = 8;

  constructor(private orderService: OrderService, private router: Router) {
  }

  ngOnInit() {
  }

  cartItems() {
    return this.orderService.cartItems();
  }

  increaseItem(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseItem(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  removeItem(item: CartItem) {
    this.orderService.remove(item);
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  checkOrder(order: Order) {
    order.orderItems =
      this.cartItems().map(item => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order).subscribe(orderResponse => {
      this.router.navigate(['/order-summary']);
      this.orderService.clear();
    });
  }

}

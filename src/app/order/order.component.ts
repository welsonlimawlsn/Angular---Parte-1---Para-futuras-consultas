import {Component, OnInit} from '@angular/core';
import {RadioOption} from '../shared/radio/radio-option.model';
import {OrderService} from './order.service';
import {CartItem} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from './order.model';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationErrors} from '@angular/forms/src/directives/validators';
import {Title} from '@angular/platform-browser';
import {NotificationService} from '../shared/messages/notification.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  viewProviders: [Title]
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ];

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;

  delivery = 8;

  order: Order;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private title: Title,
    private notificationService: NotificationService
  ) {
    this.title.setTitle('Meat | Pedido');
  }

  ngOnInit() {

    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required , Validators.minLength(5)],
        updateOn: 'blur'
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'});
  }

  static equalsTo(group: AbstractControl): ValidationErrors {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    if (!email || !emailConfirmation) {
      return undefined;
    }
    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true};
    }
    return undefined;
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
    this.orderService.checkOrder(order).pipe(
      tap(orderResponse => this.order = orderResponse)
    ).subscribe(orderResponse => {
      this.router.navigate(['/order-summary']);
      this.orderService.clear();
    }, response => this.notificationService.nofify(response.error.message));
  }

  isOrderCompleted(): boolean {
    return this.order !== undefined;
  }
}

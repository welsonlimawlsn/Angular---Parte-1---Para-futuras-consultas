import {CartItem} from './cart-item.model';
import {MenuItem} from '../menu-item/menu-item.model';

export class ShoppingCartService {

  items: CartItem[] = [];

  clear(): void {
    this.items = [];
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, current) => prev + current, 0);
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find(items => items.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
  }

  increaseQty(item: CartItem) {
    item.incrementQuantity();
  }

  decreaseQty(item: CartItem) {
    item.decrementQuantity();
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}

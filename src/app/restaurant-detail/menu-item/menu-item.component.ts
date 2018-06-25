import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from './menu-item.model';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menu-item-appeared', [
      state('ready', style({
        opacity: 1
      })),
      transition('void => ready', [
        style({
          opacity: 0,
          transform: 'translate(0, -30px)'
        }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  @Input()
  menuItem: MenuItem;
  @Output()
  add = new EventEmitter();

  menuItemState = 'ready';

  constructor() {
  }

  ngOnInit() {
  }

  emitAddEvent() {
    this.add.emit(this.menuItem);
  }

}

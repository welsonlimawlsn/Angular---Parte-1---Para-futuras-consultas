import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../restaurants/restaurants.service';
import {Restaurant} from '../restaurants/restaurant/restaurant.model';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  viewProviders: [Title]
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.restaurantsService.restaurantById(this.route.snapshot.params['id']).subscribe(restaurant => {
      this.restaurant = restaurant;
      this.title.setTitle(`Meat | ${this.restaurant.name}`);
    });
  }

}

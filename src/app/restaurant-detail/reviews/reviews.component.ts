import {Component, OnInit} from '@angular/core';
import {RestaurantsService} from '../../restaurants/restaurants.service';
import {Observable} from 'rxjs';
import {Review} from './review.model';
import {ActivatedRoute} from '@angular/router';
import {trigger, animate, style, transition, state} from '@angular/animations';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  animations: [
    trigger('review-appeared', [
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
export class ReviewsComponent implements OnInit {

  reviews: Observable<Review[]>;

  reviewState = 'ready';

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.reviews = this.restaurantsService
      .reviewsOfRestaurant(this.route.parent.snapshot.params['id']);
  }

}

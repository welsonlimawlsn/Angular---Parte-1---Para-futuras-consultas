import {Restaurant} from './restaurant/restaurant.model';
import {Injectable} from '@angular/core';
import {MEAT_API} from '../app.api';
import {Observable} from 'rxjs';
import {Review} from '../restaurant-detail/reviews/review.model';
import {MenuItem} from '../restaurant-detail/menu-item/menu-item.model';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) {
  }

  restaurants(search?: string): Observable<Restaurant[]> {
    // let params: HttpParams = undefined;
    // if (search) {
    //   params = new HttpParams().set('q', search);
    // }
    // return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params});

    let params = search ? {params: new HttpParams().set('q', search)} : {};
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, params)
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
  }

  reviewsOfRestaurant(id: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${MEAT_API}/restaurants/${id}/reviews`);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    // return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
    //   .map(response => response.json())
    //   .catch(error => ErrorHandler.handleError(error));
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
  }
}

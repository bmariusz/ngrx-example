import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';

import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';


@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    // return of(true);
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded)
      .pipe(tap(loaded => {
        if (!loaded) {
          return this.store.dispatch(new fromStore.LoadPizzas())
        }
      }))
      .pipe(filter(loaded => loaded))
      .pipe(take(1))
  }
}

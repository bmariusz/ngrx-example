import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Effect, Actions} from '@ngrx/effects';

import {of} from 'rxjs/observable/of';
import {map, catchError, exhaustMap, tap} from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import {Pizza} from "../../models/pizza.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PizzasEffects {


  constructor(private router: Router,
              private pizzaService: fromServices.PizzasService,
              private actions$: Actions) {
  }

  @Effect()
  loadPizzas$ = this.actions$
    .ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(exhaustMap(() => {
      return this.pizzaService.getPizzas()
    }))
    .pipe(
      map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
      catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
    )

  @Effect()
  createPizza$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA)
    .pipe(exhaustMap((action: pizzaActions.CreatePizza) => {
      return this.pizzaService.createPizza(action.payload)
    }))
    .pipe(
      map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
      catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
    )

  @Effect({dispatch: false})
  createPizzaSuccess = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(map((action: pizzaActions.CreatePizzaSuccess) => action.payload))
    .pipe(tap(pizza => this.router.navigate([`/products/${pizza.id}`])));


  @Effect()
  updatePizza$ = this.actions$
    .ofType(pizzaActions.UPDATE_PIZZA)
    .pipe(map((action: pizzaActions.UpdatePizza) => action.payload))
    .pipe(exhaustMap((pizza: Pizza) => {
      return this.pizzaService.createPizza(pizza)
    }))
    .pipe(
      map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
      catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
    )

  @Effect({dispatch: false})
  updatePizzaSuccess = this.actions$
    .ofType(pizzaActions.UPDATE_PIZZA_SUCCESS, pizzaActions.REMOVE_PIZZA_SUCCESS)
    .pipe(map((action: pizzaActions.UpdatePizzaSuccess) => action.payload))
    .pipe(tap(pizza => this.router.navigate([`/products/${pizza.id}`])));

  @Effect()
  removePizza$ = this.actions$
    .ofType(pizzaActions.REMOVE_PIZZA)
    .pipe(map((action: pizzaActions.RemovePizza) => action.payload))
    .pipe(exhaustMap((pizza: Pizza) =>
      this.pizzaService.removePizza(pizza)
        .pipe(
          map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
          catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
        )
    ));

  @Effect({dispatch: false})
  removePizzaSuccess = this.actions$
    .ofType(pizzaActions.UPDATE_PIZZA_SUCCESS)
    .pipe(map((action: pizzaActions.UpdatePizzaSuccess) => action.payload))
    .pipe(tap(pizza => this.router.navigate([`/products/${pizza.id}`])));
}

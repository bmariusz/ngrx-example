import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

export const MY_ACTION = '[Feature] My Action';
export const LOAD_PIZZAS = '[Feature] Load pizzas';
export const LOAD_PIZZAS_FAIL = '[Feature] Load pizzas fail';
export const LOAD_PIZZAS_SUCCESS = '[Feature] Load pizzas success';
export const SELECT_PIZZA = '[Feature] Select pizza';
export const CREATE_PIZZA = '[Feature] Create pizza';
export const CREATE_PIZZA_FAIL = '[Feature] Create pizza fail';
export const CREATE_PIZZA_SUCCESS = '[Feature] Create pizza success';
export const UPDATE_PIZZA = '[Feature] Update pizza';
export const UPDATE_PIZZA_FAIL = '[Feature] Update pizza fail';
export const UPDATE_PIZZA_SUCCESS = '[Feature] Update pizza success';
export const REMOVE_PIZZA = '[Feature] Remove pizza';
export const REMOVE_PIZZA_SUCCESS = '[Feature] Remove pizza success';
export const REMOVE_PIZZA_FAIL = '[Feature] Remove pizza fail';

export class MyAction implements Action {
  readonly type = MY_ACTION;
  constructor(public payload: any) {}
}

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
  constructor() {}
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export class SelectPizza implements Action {
  readonly type = SELECT_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

export class UpdatePizza implements Action {
  readonly type = UPDATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaSuccess implements Action {
  readonly type = UPDATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail implements Action {
  readonly type = UPDATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class RemovePizza implements Action {
  readonly type = REMOVE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class RemovePizzaFail implements Action {
  readonly type = REMOVE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class RemovePizzaSuccess implements Action {
  readonly type = REMOVE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// action types
export type PizzasAction = MyAction | LoadPizzas | LoadPizzasFail | LoadPizzasSuccess | SelectPizza | CreatePizza |
  CreatePizzaFail | CreatePizzaSuccess | UpdatePizza | UpdatePizzaFail | UpdatePizzaSuccess | RemovePizza |
  RemovePizzaFail | RemovePizzaSuccess;

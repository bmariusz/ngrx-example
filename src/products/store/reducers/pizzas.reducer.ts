import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  selected?: Pizza
  loaded: boolean
  loading: boolean
  pizzas: Pizza[]
}

const initialState: PizzaState = {
  selected: null,
  loaded: false,
  loading: false,
  pizzas: []
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      console.log('LoadPizzas', state);
      return {
        ...state,
        loading: true,
        loaded: false
      }
    }
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      return {
        pizzas: action.payload,
        loading: false,
        loaded: true
      }
    }
    case fromPizzas.SELECT_PIZZA: {
      return {
        ...state,
        selected: action.payload
      }
    }
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      return {
        ...state,
        pizzas: [...state.pizzas, action.payload]
      }
    }
    case fromPizzas.UPDATE_PIZZA_SUCCESS: {
      return {
        ...state,
        pizzas: [...state.pizzas.filter(pizza => pizza.id !== action.payload.id), action.payload]
      }
    }
    case fromPizzas.REMOVE_PIZZA_SUCCESS: {
      return {
        ...state,
        pizzas: state.pizzas.filter(pizza => pizza !== action.payload)
      }
    }
  }

  return state;
}

export const getPizzas = (state: PizzaState) => state.pizzas;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getSelectedPizza = (state: PizzaState) => state.selected;

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
// import { PizzasService } from '../../services/pizzas.service';

import * as fromStore from '../../store';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush, // comment in case of service
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;


  constructor(/*private pizzaService: PizzasService, */private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    /*this.pizzaService.getPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
    });*/
    this.pizzas$ = this.store.select(fromStore.getPizzas);

    // this.store.dispatch(new fromStore.LoadPizzas());
  }
}

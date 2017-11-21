import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {map, switchMap, tap} from 'rxjs/operators';

import {Pizza} from '../../models/pizza.model';
import {PizzasService} from '../../services/pizzas.service';
import {ToppingsService} from '../../services/toppings.service';

import * as fromStore from '../../store';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

@Component({
  selector: 'product-item',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="selected$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza: Pizza;
  selected: Pizza;
  toppings$: Observable<string[]>;
  selected$: Observable<Pizza>;
  pizza$: Observable<Pizza>;

  constructor(private pizzaService: PizzasService,
              /*private toppingsService: ToppingsService,*/
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromStore.ProductsState>) {
  }

  ngOnInit() {
    /*this.pizzaService.getPizzas().subscribe(pizzas => {
      const param = this.route.snapshot.params.id;
      let pizza;
      if (param === 'new') {
        pizza = {};
      } else {
        pizza = pizzas.find(pizza => pizza.id == parseInt(param, 10));
      }
      this.pizza = pizza;

      this.store.dispatch(new fromStore.SelectPizza(pizza));

      this.selected = pizza;
      this.toppingsService.getToppings().subscribe(toppings => {
        this.toppings = toppings;
      });
    });*/

    this.pizza$ = this.route.params
      .pipe(
        switchMap(params => {
          if (params.id === 'new') {
            this.store.dispatch(new fromStore.SelectPizza({}));
            return of({});
          }
          return this.store.select(fromStore.getPizzas)
            .pipe(map(pizzas => pizzas.find(pizza => pizza.id === params.id)))
        }))
      .pipe(
        tap((pizza: Pizza) => this.store.dispatch(new fromStore.SelectPizza(pizza)))
      );

    this.selected$ = this.store.select(fromStore.getSelectedPizza);
    // this.store.dispatch(new fromStore.LoadPizzas());

    this.toppings$ = this.store.select(fromStore.getToppings);
    this.store.dispatch(new fromStore.LoadToppings());
  }

  onSelect(event: Pizza) {
    this.selected = event;
    this.store.dispatch(new fromStore.SelectPizza(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));

    /*this.pizzaService.createPizza(event).subscribe(pizza => {
      this.router.navigate([`/products/${pizza.id}`]);
    });*/
  }

  onUpdate(event: Pizza) {
    /*this.pizzaService.updatePizza(event).subscribe(() => {
      this.router.navigate([`/products`]);
    });*/

    this.store.dispatch(new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      /*this.pizzaService.removePizza(event).subscribe(() => {
        this.router.navigate([`/products`]);
      });*/
      this.store.dispatch(new fromStore.RemovePizza(event));
    }
  }
}

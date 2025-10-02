import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../../core/services/food.service';

@Pipe({ name: 'vegFilter' })
export class VegFilterPipe implements PipeTransform {
  transform(foods: Food[], showVegOnly: boolean): Food[] {
    return showVegOnly ? foods.filter(f => f.veg) : foods;
  }
}

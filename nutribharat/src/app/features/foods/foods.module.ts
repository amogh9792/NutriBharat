import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  

import { FoodListComponent } from './food-list/food-list.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { VegFilterPipe } from '../../shared/pipes/veg-filter.pipe';
import { SearchFilterPipe } from '../../shared/pipes/search-filter.pipe';   // ✅ Import pipe
import { HighlightCalorieDirective } from '../../shared/directives/highlight-calorie.directive';

@NgModule({
  declarations: [
    FoodListComponent,
    FoodDetailComponent,
    VegFilterPipe,
    SearchFilterPipe,                  // ✅ Add here
    HighlightCalorieDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    FoodListComponent,
    FoodDetailComponent,
    VegFilterPipe,
    SearchFilterPipe,                  // ✅ Export too if needed outside FoodsModule
    HighlightCalorieDirective
  ]
})
export class FoodsModule {}

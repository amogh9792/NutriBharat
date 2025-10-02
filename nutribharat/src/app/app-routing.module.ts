import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FoodListComponent } from './features/foods/food-list/food-list.component';
import { FoodDetailComponent } from './features/foods/food-detail/food-detail.component';
import { MealTrackerComponent } from './features/meals/meal-tracker/meal-tracker.component';

const routes: Routes = [
  { path: '', component: FoodListComponent },          // homepage → foods
  { path: 'foods/:id', component: FoodDetailComponent },
  { path: 'meals', component: MealTrackerComponent },  // ✅ meals page
  { path: '**', redirectTo: '' }                       // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

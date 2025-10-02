import { Component } from '@angular/core';
import { FoodService, Food } from '../../../core/services/food.service';
import { MealService, MealEntry, MealType } from '../../../core/services/meal.service';

@Component({
  selector: 'app-meal-tracker',
  templateUrl: './meal-tracker.component.html',
  styleUrls: ['./meal-tracker.component.scss']
})
export class MealTrackerComponent {
  meals: MealType[] = ['breakfast', 'lunch', 'dinner', 'snacks'];

  selectedMeal: MealType = 'breakfast';
  selectedFood: Food | null = null;
  mealSearch = '';
  quantityValue: number = 1;

  constructor(
    public foodService: FoodService,
    public mealService: MealService
  ) {}

  getEntries(meal: MealType): MealEntry[] {
    return this.mealService[meal]();
  }

  addMeal() {
    if (this.selectedFood && this.quantityValue > 0) {
      this.mealService.addFood(this.selectedMeal, this.selectedFood, this.quantityValue);
      this.selectedFood = null;
      this.quantityValue = 1;
    }
  }

  removeMeal(meal: MealType, index: number) {
    this.mealService.removeFood(meal, index);
  }
}

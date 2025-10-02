import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService, Food } from '../../../core/services/food.service';
import { BmiService } from '../../../core/services/bmi.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent {
  food = computed<Food | null>(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.foodService.foods().find(f => f.id === id) || null;
  });

  quantity = signal(0); // user input

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    public bmiService: BmiService
  ) {
    this.foodService.loadFoods();
  }

  // Helper to scale nutrient by quantity vs baseQuantity
  private scale(value: number): number {
    if (!this.food()) return 0;
    const base = this.food()!.baseQuantity || 1;
    return +(value * (this.quantity() / base)).toFixed(1);
  }

  scaledCalories = computed(() => this.food() ? this.scale(this.food()!.calories) : 0);
  scaledProtein  = computed(() => this.food() ? this.scale(this.food()!.protein)  : 0);
  scaledCarbs    = computed(() => this.food() ? this.scale(this.food()!.carbs)    : 0);
  scaledFat      = computed(() => this.food() ? this.scale(this.food()!.fat)      : 0);
}

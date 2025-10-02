import { Component, OnInit, signal, computed } from '@angular/core';
import { FoodService, Food } from '../../../core/services/food.service';
import { MealService } from '../../../core/services/meal.service';

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {
  search = signal('');
  selectedRegion = signal('All');
  selectedDietType = signal('All');

  foods = this.foodService.foods;
  mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snacks'];

  // Meal state
  selectedMeal: { [foodId: number]: MealType | '' } = {};
  selectedQuantity: { [foodId: number]: number } = {};

  // BMI inputs
  height: number = 170;
  weight: number = 70;
  age: number = 25;

  constructor(
    private foodService: FoodService,
    private mealService: MealService
  ) {}

  ngOnInit() {
    this.foodService.loadFoods();
  }

  get searchValue() {
    return this.search();
  }
  set searchValue(value: string) {
    this.search.set(value);
  }

  // Filtered foods
  filteredFoods = computed(() => {
    return this.foods()
      .filter(f => f.name.toLowerCase().includes(this.search().toLowerCase()))
      .filter(f => this.selectedRegion() === 'All' ? true : f.region === this.selectedRegion())
      .filter(f => this.selectedDietType() === 'All' ? true : f.dietType === this.selectedDietType());
  });

  // Add food with quantity
  addToMeal(food: Food) {
    const meal = this.selectedMeal[food.id];
    const qty = this.selectedQuantity[food.id] || food.baseQuantity;

    if (!meal) {
      alert('Please select a meal');
      return;
    }

    this.mealService.addFood(meal, food, qty);
    alert(`${qty} ${food.unit} of ${food.name} added to ${meal}`);

    this.selectedMeal[food.id] = '';
    this.selectedQuantity[food.id] = food.baseQuantity;
  }

  // BMI calculation
  get bmi(): number {
    if (!this.height || !this.weight) return 0;
    return this.weight / Math.pow(this.height / 100, 2);
  }

  get bmiCategory(): string {
    if (this.bmi < 18.5) return 'Underweight';
    if (this.bmi < 25) return 'Normal';
    if (this.bmi < 30) return 'Overweight';
    return 'Obese';
  }

  get calorieNeeds() {
    const bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5; // Mifflin-St Jeor
    return {
      maintenance: Math.round(bmr * 1.55),
      muscleGain: Math.round(bmr * 1.8),
      fatLoss: Math.round(bmr * 1.2)
    };
  }
}

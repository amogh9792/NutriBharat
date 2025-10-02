import { Injectable, signal, computed } from '@angular/core';
import { Food } from './food.service';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface MealEntry {
  food: Food;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class MealService {
  // Signals for each meal
  breakfast = signal<MealEntry[]>([]);
  lunch = signal<MealEntry[]>([]);
  dinner = signal<MealEntry[]>([]);
  snacks = signal<MealEntry[]>([]);

  calorieGoal = signal(2000);
  proteinGoal = signal(100);

  addFood(meal: MealType, food: Food, quantity: number) {
    const entry: MealEntry = { food, quantity };
    this[meal].update(list => [...list, entry]);
    this.saveToStorage();
  }

  removeFood(meal: MealType, index: number) {
    this[meal].update(list => list.filter((_, i) => i !== index));
    this.saveToStorage();
  }

  private totalForMeal(meal: MealEntry[]) {
    return meal.reduce(
      (acc, entry) => {
        const factor = entry.quantity / entry.food.baseQuantity;
        acc.calories += entry.food.calories * factor;
        acc.protein += entry.food.protein * factor;
        acc.carbs += entry.food.carbs * factor;
        acc.fat += entry.food.fat * factor;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }

  breakfastTotals = computed(() => this.totalForMeal(this.breakfast()));
  lunchTotals = computed(() => this.totalForMeal(this.lunch()));
  dinnerTotals = computed(() => this.totalForMeal(this.dinner()));
  snacksTotals = computed(() => this.totalForMeal(this.snacks()));

  dailyTotals = computed(() => {
    const b = this.breakfastTotals();
    const l = this.lunchTotals();
    const d = this.dinnerTotals();
    const s = this.snacksTotals();
    return {
      calories: b.calories + l.calories + d.calories + s.calories,
      protein: b.protein + l.protein + d.protein + s.protein,
      carbs: b.carbs + l.carbs + d.carbs + s.carbs,
      fat: b.fat + l.fat + d.fat + s.fat
    };
  });

  saveToStorage() {
    const data = {
      breakfast: this.breakfast(),
      lunch: this.lunch(),
      dinner: this.dinner(),
      snacks: this.snacks(),
      calorieGoal: this.calorieGoal(),
      proteinGoal: this.proteinGoal()
    };
    localStorage.setItem('meals', JSON.stringify(data));
  }

  loadFromStorage() {
    const raw = localStorage.getItem('meals');
    if (raw) {
      try {
        const data = JSON.parse(raw);
        this.breakfast.set(data.breakfast || []);
        this.lunch.set(data.lunch || []);
        this.dinner.set(data.dinner || []);
        this.snacks.set(data.snacks || []);
        this.calorieGoal.set(data.calorieGoal || 2000);
        this.proteinGoal.set(data.proteinGoal || 100);
      } catch {
        console.warn('Failed to load meals from storage');
      }
    }
  }
}

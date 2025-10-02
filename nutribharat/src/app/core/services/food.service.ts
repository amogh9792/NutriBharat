import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Food {
  id: number;
  name: string;
  region: string;
  veg: boolean;
  dietType: string;
  baseQuantity: number;
  unit: 'g' | 'ml' | 'piece';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}


@Injectable({ providedIn: 'root' })
export class FoodService {
  private foodsSignal = signal<Food[]>([]);
  foods = this.foodsSignal.asReadonly();

  constructor(private http: HttpClient) {}

  loadFoods() {
    this.http.get<Food[]>('/assets/foods.json').subscribe(data => {
      this.foodsSignal.set(data);
    });
  }
}

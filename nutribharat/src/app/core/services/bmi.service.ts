import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BmiService {
  private _bmi = signal(0);

  bmi = this._bmi.asReadonly();

  bmiCategory = computed(() => {
    const value = this._bmi();
    if (value === 0) return '';
    if (value < 18.5) return 'Underweight';
    if (value < 25) return 'Normal';
    if (value < 30) return 'Overweight';
    return 'Obese';
  });

  // Calorie needs (very rough baseline for adults)
  calorieNeeds = computed(() => {
    const bmi = this._bmi();
    if (bmi === 0) return null;

    // Assume maintenance ~ 30 kcal/kg
    const weightKg = this._lastWeight;
    if (!weightKg) return null;

    const maintenance = weightKg * 30;
    return {
      maintenance: Math.round(maintenance),
      muscleGain: Math.round(maintenance + 300),
      fatLoss: Math.round(maintenance - 300)
    };
  });

  private _lastWeight = 0;

  calculate(heightCm: number, weightKg: number) {
    if (heightCm > 0 && weightKg > 0) {
      const heightM = heightCm / 100;
      const bmiVal = weightKg / (heightM * heightM);
      this._bmi.set(Number(bmiVal.toFixed(1)));
      this._lastWeight = weightKg;
    }
  }
}

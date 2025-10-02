import { Component } from '@angular/core';
import { BmiService } from '../../../core/services/bmi.service';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
})
export class BmiCalculatorComponent {
  height = 0;
  weight = 0;

  constructor(public bmiService: BmiService) {}

  calculateBMI() {
    this.bmiService.calculate(this.height, this.weight);
  }
}

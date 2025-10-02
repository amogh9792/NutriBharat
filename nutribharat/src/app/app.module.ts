import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodsModule } from './features/foods/foods.module';

// 👇 import your component
import { MealTrackerComponent } from './features/meals/meal-tracker/meal-tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    MealTrackerComponent   // ✅ declare here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FoodsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

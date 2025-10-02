import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightCalorie]'
})
export class HighlightCalorieDirective implements OnInit {
  @Input() appHighlightCalorie = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlightCalorie > 300) {
      this.el.nativeElement.style.backgroundColor = '#ffe5e5'; // light red background
    }
  }
}

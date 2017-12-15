import { Component } from '@angular/core';
import { NgxSiemaOptions, NgxSiemaService } from 'ngx-siema';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  constructor(private siemaSvc: NgxSiemaService) { }

  prevSlide() {
    this.siemaSvc.prev();
  }
  nextSlide() {
    this.siemaSvc.next();
  }


  slidesPaths = [1, 2, 3, 4].map(num => `assets/img/slides/${num}.jpg`);
  options: NgxSiemaOptions = {
    selector: '.siema',
    duration: 1000,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    threshold: 20,
    loop: true,
    onInit: () => {
      // runs immediately after first initialization
    },
    onChange: () => {
      // runs after slide change
    },
  };

}

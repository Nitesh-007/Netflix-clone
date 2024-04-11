import { NgFor, NgForOf, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../models/video-content.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
  standalone: true,
  imports: [NgFor, DescriptionPipe, ImagePipe, NgIf],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() videoContents: IVideoContent[] = [];
  
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;
  private swiper: Swiper | undefined;



  constructor() { 
    
  }
  ngAfterViewInit(): void {
   this.initSwiper();
  }

  ngOnInit() {
  }

  

  private initSwiper() {
  const breakpoints: Record<number, SwiperOptions> = {};
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1800) {
    breakpoints[1800] = {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 5,
      centeredSlides: false,
    };
  } else if (screenWidth >= 1500) {
    breakpoints[1500] = {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 5,
      centeredSlides: false,
    };
  } else if (screenWidth >= 1200) {
    breakpoints[1200] = {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 5,
      centeredSlides: false,
    };
  } else if (screenWidth >= 900) {
    breakpoints[900] = {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 5,
      centeredSlides: true,
    };
  } else if (screenWidth >= 600) {
    breakpoints[600] = {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 5,
      centeredSlides: true,
    };
  }

  const swiperOptions: SwiperOptions = {
    slidesPerView:'auto',
    slidesPerGroup: 2,
    centeredSlides: true,
    loop: false,
    breakpoints: breakpoints,
    simulateTouch: true,
    grabCursor: true, // Allow cursor to grab and drag/swipe slides
      navigation: {
        nextEl: '.swiper-button-next', // Use Swiper's built-in navigation buttons
        prevEl: '.swiper-button-prev'
      }
  };

  if (this.swiper) {
    this.swiper.destroy(true, true);
  }

  this.swiper = new Swiper(this.swiperContainer.nativeElement, swiperOptions);
 }


  setHoverMovie(movie: IVideoContent) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Testimonial, TestimonialsContent } from '../../core/models/testimonials.models';
import { TestimonialsService } from '../../core/services/testimonials.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export default class TestimonialsComponent {

  // Content data
  content: TestimonialsContent;

  // Testimonials data
  testimonials: Testimonial[];

  // Carousel configuration optimized for testimonials
  carouselOptions: OwlOptions;

  constructor(private testimonialsService: TestimonialsService) {
    this.content = this.testimonialsService.fetchTestimonialsContent();
    this.testimonials = this.testimonialsService.fetchTestimonials();
    this.carouselOptions = this.testimonialsService.fetchCarouselOptions();
  }

  // TrackBy function for performance optimization
  trackByTestimonial(index: number, testimonial: Testimonial): string {
    return testimonial.id;
  }
}

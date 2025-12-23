import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeContent, StatisticSlide } from '../../core/models/about-me.models';
import { AboutMeService } from '../../core/services/about-me.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export default class AboutMeComponent {
  // Content data
  content: AboutMeContent;

  // Statistics carousel configuration
  carouselId: string;

  // Statistics data - organized by slides
  statisticSlides: StatisticSlide[];

  constructor(private aboutMeService: AboutMeService) {
    this.content = this.aboutMeService.fetchAboutMeContent();
    this.carouselId = this.aboutMeService.getCarouselId();
    this.statisticSlides = this.aboutMeService.fetchStatisticsData();
  }
}

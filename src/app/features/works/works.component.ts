import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Technology, WorkExperience, WorksContent } from '../../core/models/works.models';
import { WorksService } from '../../core/services/works.service';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css'
})
export default class WorksComponent {

  // Content data
  content: WorksContent;

  // Work experiences data (from CV)
  workExperiences: WorkExperience[];

  // Carousel configuration optimized for work experience cards
  carouselOptions: OwlOptions;

  constructor(private worksService: WorksService) {
    this.content = this.worksService.fetchWorksContent();
    this.workExperiences = this.worksService.fetchWorkExperiences();
    this.carouselOptions = this.worksService.fetchCarouselOptions();
  }

  // TrackBy functions for performance optimization
  trackByWork(index: number, work: WorkExperience): string {
    return work.id;
  }

  trackByAchievement(index: number, achievement: string): number {
    return index;
  }

  trackByTechnology(index: number, tech: Technology): string {
    return tech.name;
  }
}

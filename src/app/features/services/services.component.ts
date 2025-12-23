import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Service, ServicesContent, TechnologyTag } from '../../core/models/services.models';
import { PortfolioServicesService } from '../../core/services/portfolio-services.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export default class ServicesComponent {

  // Content data
  content: ServicesContent;

  // Services data
  services: Service[];

  // Enhanced carousel configuration
  carouselOptions: OwlOptions;

  constructor(private portfolioServicesService: PortfolioServicesService) {
    this.content = this.portfolioServicesService.fetchServicesContent();
    this.services = this.portfolioServicesService.fetchServices();
    this.carouselOptions = this.portfolioServicesService.fetchCarouselOptions();
  }

  // TrackBy functions for performance
  trackByService(index: number, service: Service): string {
    return service.id;
  }

  trackByTechnology(index: number, tech: TechnologyTag): string {
    return tech.name;
  }
}

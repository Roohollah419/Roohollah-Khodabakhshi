import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Education, EducationContent } from '../../core/models/education.models';
import { EducationService } from '../../core/services/education.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export default class EducationComponent {

  // Content data
  content: EducationContent;

  // Education data
  education: Education[];

  constructor(private educationService: EducationService) {
    this.content = this.educationService.fetchEducationContent();
    this.education = this.educationService.fetchEducation();
  }

  // TrackBy function for performance optimization
  trackByEducation(index: number, edu: Education): string {
    return edu.id;
  }
}

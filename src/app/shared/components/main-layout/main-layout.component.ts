import { Component } from '@angular/core';
import { CvGeneratorService } from '../../../core/services/cv-generator.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(private cvGeneratorService: CvGeneratorService) {}

  /**
   * Downloads CV as PDF with current date
   */
  downloadCV(): void {
    this.cvGeneratorService.generateAndDownloadCV();
  }
}

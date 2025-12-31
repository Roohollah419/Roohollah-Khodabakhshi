import { Component, inject } from '@angular/core';
import { CvGeneratorService } from '../../../core/services/cv-generator.service';
import { TelegramService } from '../../../core/services/telegram.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  private readonly cvGeneratorService = inject(CvGeneratorService);
  readonly telegramService = inject(TelegramService);

  /**
   * Downloads CV as PDF with current date
   */
  downloadCV(): void {
    this.cvGeneratorService.generateAndDownloadCV();
  }
}

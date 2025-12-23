import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language, LanguageContent } from '../../core/models/language.models';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export default class LanguageComponent {

  // Content data
  content: LanguageContent;

  // Language data
  languages: Language[];

  constructor(private languageService: LanguageService) {
    this.content = this.languageService.fetchLanguageContent();
    this.languages = this.languageService.fetchLanguages();
  }

  // Get skill color based on score
  getSkillColor(score: number): string {
    return this.languageService.getSkillColor(score);
  }

  // Get skill level text
  getSkillLevelText(score: number): string {
    return this.languageService.getSkillLevelText(score);
  }

  // Calculate percentage for progress bar
  getPercentage(score: number): number {
    return (score / 5) * 100;
  }

  // TrackBy function for performance optimization
  trackByLanguage(index: number, lang: Language): string {
    return lang.id;
  }
}

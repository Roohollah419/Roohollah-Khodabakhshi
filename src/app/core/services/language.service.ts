import { Injectable } from '@angular/core';
import { Language, LanguageContent, ProficiencyLevel } from '../models/language.models';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  /**
   * Fetches Language content data (heading and subheading)
   * @returns LanguageContent object
   */
  fetchLanguageContent(): LanguageContent {
    return {
      heading: 'LANGUAGES',
      subheading: 'Language proficiency and communication skills'
    };
  }

  /**
   * Fetches all language proficiency data
   * @returns Array of Language objects sorted by order
   */
  fetchLanguages(): Language[] {
    return [
      {
        id: 'lang-english',
        name: 'English',
        level: ProficiencyLevel.C1,
        levelDescription: 'Advanced Professional Proficiency',
        skills: {
          reading: 5,
          writing: 4.5,
          speaking: 4.5,
          listening: 5
        },
        flag: '🇬🇧',
        order: 1,
        ariaLabel: 'English language - C1 level with reading 5/5, writing 4.5/5, speaking 4.5/5, listening 5/5'
      },
      {
        id: 'lang-persian',
        name: 'Persian (Farsi)',
        level: ProficiencyLevel.NATIVE,
        levelDescription: 'Native Speaker',
        skills: {
          reading: 5,
          writing: 5,
          speaking: 5,
          listening: 5
        },
        flag: '🇮🇷',
        order: 2,
        ariaLabel: 'Persian language - Native speaker with perfect proficiency in all skills'
      }
    ];
  }

  /**
   * Get skill category color based on score
   * @param score Skill score out of 5
   * @returns Color hex code
   */
  getSkillColor(score: number): string {
    if (score === 5) return '#51cf66'; // Perfect - Green
    if (score >= 4.5) return '#a78bfa'; // Excellent - Purple
    if (score >= 4) return '#4dabf7'; // Very Good - Blue
    if (score >= 3.5) return '#ffd43b'; // Good - Yellow
    return '#ff6b6b'; // Needs Improvement - Red
  }

  /**
   * Get skill level text based on score
   * @param score Skill score out of 5
   * @returns Skill level description
   */
  getSkillLevelText(score: number): string {
    if (score === 5) return 'Perfect';
    if (score >= 4.5) return 'Excellent';
    if (score >= 4) return 'Very Good';
    if (score >= 3.5) return 'Good';
    if (score >= 3) return 'Intermediate';
    return 'Basic';
  }
}

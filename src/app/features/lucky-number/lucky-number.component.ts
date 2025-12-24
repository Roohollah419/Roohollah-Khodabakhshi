import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Surah } from '../../core/models';
import { QuranService } from '../../core/services/quran.service';
import { QuranStorageService } from '../../core/services/quran-storage.service';

@Component({
  selector: 'app-lucky-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lucky-number.component.html',
  styleUrl: './lucky-number.component.css'
})
export default class LuckyNumberComponent implements OnInit {
  luckyNumber: number | null = null;
  selectedSurah: Surah | null = null;
  quranData: Surah[] = [];
  isButtonDisabled: boolean = false;

  constructor(
    private quranService: QuranService,
    private storageService: QuranStorageService
  ) {}

  ngOnInit(): void {
    this.loadQuranData();
  }

  /**
   * Loads Quran data from JSON file using the service and initializes recitation counts from localStorage
   */
  loadQuranData(): void {
    this.quranService.fetchAllSurahs().subscribe({
      next: (data) => {
        // Add recitation count from localStorage to each Surah
        this.quranData = data.map(surah => ({
          ...surah,
          recitationCount: this.storageService.getRecitationCount(surah.index)
        }));
      },
      error: (error) => {
        console.error('Error loading Quran data:', error);
      }
    });
  }

  /**
   * Generates a random number between 1 and 114 and shows the corresponding Surah
   */
  generateLuckyNumber(): void {
    this.luckyNumber = this.quranService.generateRandomSurahIndex();
    this.selectedSurah = this.quranService.getSurahByIndex(this.quranData, this.luckyNumber);

    if (this.selectedSurah) {
      // Get the current count from localStorage
      this.selectedSurah.recitationCount = this.storageService.getRecitationCount(
        this.selectedSurah.index
      );
    }

    // Disable the button after generating
    this.isButtonDisabled = true;
  }

  /**
   * Handles the skip action - resets the card and enables the button
   */
  skipSurah(): void {
    this.selectedSurah = null;
    this.luckyNumber = null;
    this.isButtonDisabled = false;
  }

  /**
   * Handles the read action - increments recitation count in localStorage and component
   */
  readSurah(): void {
    if (this.selectedSurah) {
      const surahIndex = this.selectedSurah.index;

      // Increment in localStorage
      const newCount = this.storageService.incrementRecitationCount(surahIndex);

      // Update in component data
      const surahInArray = this.quranData.find(s => s.index === surahIndex);
      if (surahInArray) {
        surahInArray.recitationCount = newCount;
      }

      // Update the displayed surah
      this.selectedSurah.recitationCount = newCount;

      // Reset state
      this.skipSurah();
    }
  }
}

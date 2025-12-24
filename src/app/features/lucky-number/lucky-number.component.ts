import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Surah } from '../../core/models';
import { QuranService } from '../../core/services/quran.service';

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

  constructor(private quranService: QuranService) {}

  ngOnInit(): void {
    this.loadQuranData();
  }

  /**
   * Loads Quran data from JSON file using the service
   */
  loadQuranData(): void {
    this.quranService.fetchAllSurahs().subscribe({
      next: (data) => {
        this.quranData = data;
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
  }
}

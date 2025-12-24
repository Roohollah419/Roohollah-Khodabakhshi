import { Injectable } from '@angular/core';

interface RecitationData {
  [surahIndex: number]: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuranStorageService {
  private readonly STORAGE_KEY = 'quranRecitation';

  constructor() {}

  /**
   * Get all recitation counts from localStorage
   * @returns Object with surah index as key and recitation count as value
   */
  getRecitationCounts(): RecitationData {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  /**
   * Get recitation count for a specific Surah
   * @param surahIndex The index of the Surah (1-114)
   * @returns The recitation count
   */
  getRecitationCount(surahIndex: number): number {
    const counts = this.getRecitationCounts();
    return counts[surahIndex] || 0;
  }

  /**
   * Set recitation count for a specific Surah
   * @param surahIndex The index of the Surah (1-114)
   * @param count The recitation count
   */
  setRecitationCount(surahIndex: number, count: number): void {
    const counts = this.getRecitationCounts();
    counts[surahIndex] = count;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(counts));
  }

  /**
   * Increment recitation count for a specific Surah
   * @param surahIndex The index of the Surah (1-114)
   * @returns The new recitation count
   */
  incrementRecitationCount(surahIndex: number): number {
    const currentCount = this.getRecitationCount(surahIndex);
    const newCount = currentCount + 1;
    this.setRecitationCount(surahIndex, newCount);
    return newCount;
  }

  /**
   * Clear all recitation data
   */
  clearAllCounts(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

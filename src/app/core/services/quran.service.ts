import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Surah } from '../models/quran.models';

@Injectable({
  providedIn: 'root'
})
export class QuranService {
  private readonly QURAN_DATA_PATH = 'assets/quran.json';

  constructor(private http: HttpClient) {}

  /**
   * Fetches all Surah data from the Quran JSON file
   * @returns Observable of Surah array
   */
  fetchAllSurahs(): Observable<Surah[]> {
    return this.http.get<Surah[]>(this.QURAN_DATA_PATH);
  }

  /**
   * Get a specific Surah by its index
   * @param surahs Array of all Surahs
   * @param index The index of the Surah (1-114)
   * @returns The Surah object or null if not found
   */
  getSurahByIndex(surahs: Surah[], index: number): Surah | null {
    return surahs.find(surah => surah.index === index) || null;
  }

  /**
   * Generate a random Surah index between 1 and 114
   * @returns Random number between 1 and 114
   */
  generateRandomSurahIndex(): number {
    return Math.floor(Math.random() * 114) + 1;
  }

  /**
   * Format Surah index to 3-digit string (e.g., 1 -> "001")
   * @param index Surah index number
   * @returns Formatted index string
   */
  formatSurahIndex(index: number): string {
    return index.toString().padStart(3, '0');
  }
}

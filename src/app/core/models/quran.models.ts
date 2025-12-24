export interface JuzVerse {
  index: string;
  verse: {
    start: string;
    end: string;
  };
}

export interface Surah {
  index: number;
  title: string;
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  type: string;
  totalAyah: number;
  juz: JuzVerse[];
  pages: string;
  recitationCount?: number;
}

export enum RevelationType {
  MAKKIYAH = 'Makkiyah',
  MADANIYAH = 'Madaniyah'
}

export enum RevelationPlace {
  MECCA = 'Mecca',
  MADINA = 'Madina'
}

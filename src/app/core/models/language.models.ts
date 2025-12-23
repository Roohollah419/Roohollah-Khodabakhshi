export enum ProficiencyLevel {
  NATIVE = 'Native',
  C2 = 'C2',
  C1 = 'C1',
  B2 = 'B2',
  B1 = 'B1',
  A2 = 'A2',
  A1 = 'A1'
}

export interface SkillScore {
  reading: number;
  writing: number;
  speaking: number;
  listening: number;
}

export interface Language {
  id: string;
  name: string;
  level: ProficiencyLevel;
  levelDescription?: string;
  skills: SkillScore;
  flag?: string; // Country flag icon or emoji
  order: number;
  ariaLabel?: string;
}

export interface LanguageContent {
  heading: string;
  subheading?: string;
}

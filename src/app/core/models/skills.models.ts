export enum SkillCategory {
  BACKEND = 'Backend',
  FRONTEND = 'Frontend',
  DATABASE = 'Database',
  LANGUAGES = 'Languages',
  DEVOPS = 'DevOps'
}

export interface Skill {
  id: string;
  name: string;
  proficiency: number;
  icon: string;
  category: SkillCategory;
  ariaLabel?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  categoryIcon: string;
  categoryColor: string;
  skills: Skill[];
}

export interface SkillsContent {
  heading: string;
  subheading?: string;
}

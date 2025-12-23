export enum TechnologyCategory {
  BACKEND = 'Backend',
  FRONTEND = 'Frontend',
  DATABASE = 'Database',
  DEVOPS = 'DevOps',
  FRAMEWORK = 'Framework',
  METHODOLOGY = 'Methodology'
}

export interface Technology {
  name: string;
  category: TechnologyCategory;
  color: string;
  icon?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string;
  duration?: string;
  achievements: string[];
  technologies: Technology[];
  featured?: boolean;
  ariaLabel?: string;
  order: number;
}

export interface WorksContent {
  heading: string;
  subheading?: string;
}

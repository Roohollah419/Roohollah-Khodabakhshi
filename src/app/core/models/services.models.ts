export enum ServiceCategory {
  BACKEND = 'Backend',
  FRONTEND = 'Frontend',
  DATABASE = 'Database',
  CONSULTING = 'Consulting',
  DEVOPS = 'DevOps'
}

export enum ServiceLevel {
  CORE = 'Core Service',
  SPECIALIZED = 'Specialized',
  CONSULTING = 'Consulting'
}

export interface TechnologyTag {
  name: string;
  icon?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  categoryColor: string;
  technologies: TechnologyTag[];
  level: ServiceLevel;
  featured?: boolean;
  ariaLabel?: string;
}

export interface ServicesContent {
  heading: string;
  subheading?: string;
}

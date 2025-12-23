export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  duration?: string;
  order: number;
  ariaLabel?: string;
}

export interface EducationContent {
  heading: string;
  subheading?: string;
}

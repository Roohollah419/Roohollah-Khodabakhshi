export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  testimonialText: string;
  initials: string;
  featured?: boolean;
  ariaLabel?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

export interface TestimonialsContent {
  heading: string;
  subheading?: string;
}

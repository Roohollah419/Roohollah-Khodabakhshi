import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

interface Testimonial {
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

interface TestimonialsContent {
  heading: string;
  subheading?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export default class TestimonialsComponent {

  // Content data
  content: TestimonialsContent = {
    heading: 'COLLEAGUES TESTIMONIALS',
    subheading: 'What colleagues and clients say about working with me'
  };

  // Testimonials data
  testimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      name: 'Michael Schmidt',
      role: 'Technical Lead',
      company: 'Specific Group',
      testimonialText: 'Outstanding full-stack developer who consistently delivered high-quality features. Their expertise in both C# and Angular significantly improved our development velocity and code quality.',
      initials: 'MS',
      featured: true,
      ariaLabel: 'Testimonial from Michael Schmidt, Technical Lead at Specific Group',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/michael-schmidt',
        twitter: 'https://twitter.com/mschmidt_dev',
        github: 'https://github.com/mschmidt'
      }
    },
    {
      id: 'testimonial-2',
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'Raimun',
      testimonialText: 'Exceptional leadership skills as our lead backend developer. Successfully mentored junior developers and coordinated complex microservice projects with professionalism and technical excellence.',
      initials: 'SJ',
      featured: true,
      ariaLabel: 'Testimonial from Sarah Johnson, Project Manager at Raimun',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarah-johnson-pm',
        twitter: 'https://twitter.com/sjohnson_pm'
      }
    },
    {
      id: 'testimonial-3',
      name: 'Ahmad Rezaei',
      role: 'CTO',
      company: 'Saynaafzar',
      testimonialText: 'Reliable and skilled developer who delivered critical healthcare applications on time. Their API integration work was crucial for our HIS system success.',
      initials: 'AR',
      ariaLabel: 'Testimonial from Ahmad Rezaei, CTO at Saynaafzar',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ahmad-rezaei',
        github: 'https://github.com/arezaei'
      }
    },
    {
      id: 'testimonial-4',
      name: 'Elena Popov',
      role: 'Software Architect',
      company: 'Rayanteb',
      testimonialText: 'Strong technical foundation in .NET development. Consistently produced maintainable, well-structured code and contributed significantly to our enterprise applications.',
      initials: 'EP',
      ariaLabel: 'Testimonial from Elena Popov, Software Architect at Rayanteb',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/elena-popov',
        twitter: 'https://twitter.com/epopov_dev',
        github: 'https://github.com/epopov'
      }
    },
    {
      id: 'testimonial-5',
      name: 'David Chen',
      role: 'UI/UX Director',
      company: 'Taral',
      testimonialText: 'Creative frontend developer with excellent attention to detail. Delivered pixel-perfect, responsive interfaces that exceeded our design expectations.',
      initials: 'DC',
      ariaLabel: 'Testimonial from David Chen, UI/UX Director at Taral',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/david-chen-ux',
        twitter: 'https://twitter.com/dchen_design',
        github: 'https://github.com/dchen'
      }
    },
    {
      id: 'testimonial-6',
      name: 'Maryam Hosseini',
      role: 'Agile Coach',
      company: 'Rasen Novin',
      testimonialText: 'Excellent team player who embraced Agile methodologies. Their GPS tracking application work demonstrated strong problem-solving abilities and collaboration skills.',
      initials: 'MH',
      ariaLabel: 'Testimonial from Maryam Hosseini, Agile Coach at Rasen Novin',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/maryam-hosseini',
        twitter: 'https://twitter.com/mhosseini_agile'
      }
    }
  ];

  // Carousel configuration optimized for testimonials
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        margin: 0
      }
    },
    nav: true
  };

  // TrackBy function for performance optimization
  trackByTestimonial(index: number, testimonial: Testimonial): string {
    return testimonial.id;
  }
}

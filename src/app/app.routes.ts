import { Routes } from '@angular/router';
import { passwordGuard } from './core/guards/password.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'About Me | Roohollah Khodabakhshi - Senior .NET Developer & Full Stack Developer from Iran',
        loadComponent: async () =>
          await import('./features/about-me/about-me.component'),
        data: {
          seo: {
            description: 'Meet Roohollah Khodabakhshi, a Senior .NET Developer and Full Stack Developer from Iran with over 10 years of professional experience.',
            keywords: 'About Developer, .NET Developer Iran, Full Stack Developer Portfolio'
          }
        }
      },
      {
        path: 'skills',
        title: 'Technical Skills | Roohollah Khodabakhshi - Expert .NET Developer',
        loadComponent: async () =>
          await import('./features/skills/skills.component'),
        data: {
          seo: {
            description: 'Explore technical skills: C#, ASP.NET Core, Angular, SQL Server, Azure - 10+ years of .NET and Full Stack development experience.',
            keywords: '.NET Skills, C# Expert, Angular Developer, Full Stack Skills'
          }
        }
      },
      {
        path: 'services',
        title: 'Development Services | Roohollah Khodabakhshi - .NET & Full Stack Developer',
        loadComponent: async () =>
          await import('./features/services/services.component'),
        data: {
          seo: {
            description: 'Professional .NET development, Full Stack development, Web Applications, and API development services from an experienced developer.',
            keywords: 'Software Development Services, .NET Consulting, Full Stack Services, Hire Developer'
          }
        }
      },
      {
        path: 'works',
        title: 'Portfolio & Projects | Roohollah Khodabakhshi - .NET Developer',
        loadComponent: async () =>
          await import('./features/works/works.component'),
        data: {
          seo: {
            description: 'View portfolio of .NET applications, Full Stack projects, and enterprise solutions developed over 10+ years of professional experience.',
            keywords: 'Developer Portfolio, .NET Projects, Full Stack Projects, Enterprise Applications'
          }
        }
      },
      {
        path: 'testimonials',
        title: 'Client Testimonials | Roohollah Khodabakhshi - Trusted Developer',
        loadComponent: async () =>
          await import('./features/testimonials/testimonials.component'),
        data: {
          seo: {
            description: 'Read client testimonials and reviews - Trusted .NET Developer and Full Stack Developer from Iran with proven track record.',
            keywords: 'Developer Reviews, Client Testimonials, Trusted Developer Iran'
          }
        }
      },
      {
        path: 'contact',
        title: 'Contact Me | Roohollah Khodabakhshi - Hire a .NET Developer',
        loadComponent: async () =>
          await import('./features/contact/contact.component'),
        data: {
          seo: {
            description: 'Contact Roohollah Khodabakhshi - Senior .NET Developer and Full Stack Developer from Iran. Available for projects worldwide.',
            keywords: 'Contact Developer, Hire .NET Developer, Hire Full Stack Developer'
          }
        }
      },
      {
        path: 'education',
        title: 'Education & Certifications | Roohollah Khodabakhshi - Developer',
        loadComponent: async () =>
          await import('./features/education/education.component'),
        data: {
          seo: {
            description: 'Educational background and certifications of a Senior .NET Developer with 10+ years of experience in software development.',
            keywords: 'Developer Education, .NET Certifications, Computer Science'
          }
        }
      },
      {
        path: 'language',
        title: 'Languages | Roohollah Khodabakhshi - Multilingual Developer',
        loadComponent: async () =>
          await import('./features/language/language.component'),
        data: {
          seo: {
            description: 'Language proficiencies of a multilingual .NET Developer and Full Stack Developer from Iran for international collaboration.',
            keywords: 'Developer Languages, Multilingual Developer, International Developer'
          }
        }
      },
      {
        path: '419',
        title: 'Lucky Number | Roohollah Khodabakhshi',
        canActivate: [passwordGuard],
        loadComponent: async () =>
          await import('./features/lucky-number/lucky-number.component'),
      },
    ],
  },
];

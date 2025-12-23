import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Technology, TechnologyCategory, WorkExperience, WorksContent } from '../../core/models/works.models';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css'
})
export default class WorksComponent {

  // Content data
  content: WorksContent = {
    heading: 'WORK EXPERIENCE',
    subheading: 'Professional journey across enterprise software development'
  };

  // Work experiences data (from CV)
  workExperiences: WorkExperience[] = [
    {
      id: 'work-specific-group',
      company: 'Specific Group',
      location: 'Vienna, Austria',
      role: 'Full-Stack Developer',
      startDate: 'April 2021',
      endDate: 'Present',
      duration: '4+ years',
      achievements: [
        'Developed RESTful APIs using C# and ASP.NET Web API',
        'Built server-side views with ASP.NET MVC 5',
        'Created dynamic interfaces with Ajax, JSON, XML, jQuery, and Angular',
        'Fixed hundreds of production issues, significantly reducing ticket flow'
      ],
      technologies: this.extractTechnologies([
        'C#', 'ASP.NET Web API', 'ASP.NET MVC', 'Ajax', 'JSON', 'XML', 'jQuery', 'Angular'
      ]),
      featured: true,
      ariaLabel: 'Full-Stack Developer at Specific Group, Vienna, Austria from April 2021 to Present',
      order: 1
    },
    {
      id: 'work-raimun',
      company: 'Raimun',
      location: 'Isfahan, Iran',
      role: 'Lead Back-end Developer',
      startDate: 'August 2019',
      endDate: 'April 2021',
      duration: '1 year 8 months',
      achievements: [
        'Developed RESTful web services for enterprise applications',
        'Evaluated 20+ developers and trained 5+ junior developers',
        'Led WebRTC project using Nestjs, RabbitMQ, and PostgreSQL',
        'Delivered 4+ enterprise projects successfully',
        'Managed multiple .NET and Nestjs projects with 9+ team members',
        'Achieved 80%+ unit test coverage across projects'
      ],
      technologies: this.extractTechnologies([
        'RESTful API', 'Nestjs', 'RabbitMQ', 'PostgreSQL', '.NET'
      ]),
      featured: true,
      ariaLabel: 'Lead Back-end Developer at Raimun, Isfahan, Iran from August 2019 to April 2021',
      order: 2
    },
    {
      id: 'work-saynaafzar',
      company: 'Saynaafzar',
      location: 'Isfahan, Iran',
      role: 'Backend Developer',
      startDate: 'January 2019',
      endDate: 'August 2019',
      duration: '8 months',
      achievements: [
        'Collaborated with .NET development team on healthcare solutions',
        'Developed 2 .NET websites using ASP.NET Core, EF Core, and SQL Server',
        'Achieved 100% client satisfaction rate',
        'Built API for HIS third-party application integration',
        'Developed Windows and WCF applications for hospital systems',
        'Implemented ticketing system using .NET and Angularjs'
      ],
      technologies: this.extractTechnologies([
        'ASP.NET Core', 'EF Core', 'SQL Server', 'WCF', 'Angularjs', '.NET'
      ]),
      ariaLabel: 'Backend Developer at Saynaafzar, Isfahan, Iran from January 2019 to August 2019',
      order: 3
    },
    {
      id: 'work-rayanteb',
      company: 'Rayanteb',
      location: 'Isfahan, Iran',
      role: 'Software Developer',
      startDate: 'October 2016',
      endDate: 'August 2019',
      duration: '2 years 10 months',
      achievements: [
        'Developed applications using C#, .NET, ASP.NET, Entity Framework, and SQL Server',
        'Maintained 2 .NET websites built with ASP.NET Core, EF Core, and SQL Server',
        'Achieved 100% client satisfaction rate',
        'Delivered robust enterprise software solutions'
      ],
      technologies: this.extractTechnologies([
        'C#', 'ASP.NET', 'ASP.NET Core', 'Entity Framework', 'EF Core', 'SQL Server'
      ]),
      ariaLabel: 'Software Developer at Rayanteb, Isfahan, Iran from October 2016 to August 2019',
      order: 4
    },
    {
      id: 'work-taral',
      company: 'Taral',
      location: 'Isfahan, Iran',
      role: 'Frontend Developer',
      startDate: 'January 2017',
      endDate: 'May 2017',
      duration: '5 months',
      achievements: [
        'Developed interfaces using HTML5, CSS3, Bootstrap, and Angularjs',
        'Created reusable templates and style sheets',
        'Ensured UI standards compliance across applications',
        'Delivered pixel-perfect responsive designs'
      ],
      technologies: this.extractTechnologies([
        'HTML5', 'CSS3', 'Bootstrap', 'Angularjs'
      ]),
      ariaLabel: 'Frontend Developer at Taral, Isfahan, Iran from January 2017 to May 2017',
      order: 5
    },
    {
      id: 'work-rasen-novin',
      company: 'Rasen Novin',
      location: 'Isfahan, Iran',
      role: 'Frontend Developer',
      startDate: 'January 2016',
      endDate: 'October 2016',
      duration: '10 months',
      achievements: [
        'Worked in Agile Scrum methodology environment',
        'Implemented Responsive Web Design using Bootstrap',
        'Developed GPS tracking application user interface',
        'Built features using AngularJS framework'
      ],
      technologies: this.extractTechnologies([
        'Agile', 'Scrum', 'Bootstrap', 'Angularjs', 'HTML5', 'CSS3'
      ]),
      ariaLabel: 'Frontend Developer at Rasen Novin, Isfahan, Iran from January 2016 to October 2016',
      order: 6
    }
  ];

  // Carousel configuration optimized for work experience cards
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
    autoplay: true,
    autoplayTimeout: 8000,  // Longer timeout for reading achievements
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        margin: 0
      }
    },
    nav: true
  };

  // Helper method to extract technologies from achievement text
  private extractTechnologies(techNames: string[]): Technology[] {
    const TECHNOLOGY_MAP = new Map<string, Technology>([
      // Backend Technologies
      ['C#', { name: 'C#', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-code-slash' }],
      ['ASP.NET', { name: 'ASP.NET', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-server' }],
      ['ASP.NET Core', { name: 'ASP.NET Core', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-server' }],
      ['ASP.NET MVC', { name: 'ASP.NET MVC', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-server' }],
      ['ASP.NET Web API', { name: 'ASP.NET Web API', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-cloud' }],
      ['Node.js', { name: 'Node.js', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-terminal' }],
      ['Nestjs', { name: 'Nestjs', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-hexagon' }],
      ['RESTful API', { name: 'RESTful API', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-arrows-angle-expand' }],
      ['.NET', { name: '.NET', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-code-slash' }],
      ['WCF', { name: 'WCF', category: TechnologyCategory.BACKEND, color: '#ff6b6b', icon: 'bi-diagram-3' }],

      // Frontend Technologies
      ['Angular', { name: 'Angular', category: TechnologyCategory.FRONTEND, color: '#4dabf7', icon: 'bi-triangle-fill' }],
      ['Angularjs', { name: 'Angularjs', category: TechnologyCategory.FRONTEND, color: '#4dabf7', icon: 'bi-triangle' }],
      ['jQuery', { name: 'jQuery', category: TechnologyCategory.FRONTEND, color: '#4dabf7', icon: 'bi-code' }],
      ['Ajax', { name: 'Ajax', category: TechnologyCategory.FRONTEND, color: '#4dabf7', icon: 'bi-arrow-repeat' }],
      ['HTML5', { name: 'HTML5', category: TechnologyCategory.FRONTEND, color: '#4dabf7', icon: 'bi-file-code' }],
      ['CSS3', { name: 'CSS3', category: TechnologyCategory.FRONTEND, color: '#4dabf7', icon: 'bi-file-code-fill' }],
      ['Bootstrap', { name: 'Bootstrap', category: TechnologyCategory.FRONTEND, color: '#4dabf7', icon: 'bi-bootstrap' }],
      ['JSON', { name: 'JSON', category: TechnologyCategory.FRONTEND, color: '#4dabf7', icon: 'bi-braces' }],
      ['XML', { name: 'XML', category: TechnologyCategory.FRONTEND, color: '#4dabf7', icon: 'bi-filetype-xml' }],

      // Database & Framework Technologies
      ['SQL Server', { name: 'SQL Server', category: TechnologyCategory.DATABASE, color: '#51cf66', icon: 'bi-database-fill' }],
      ['PostgreSQL', { name: 'PostgreSQL', category: TechnologyCategory.DATABASE, color: '#51cf66', icon: 'bi-database' }],
      ['Entity Framework', { name: 'Entity Framework', category: TechnologyCategory.FRAMEWORK, color: '#51cf66', icon: 'bi-diagram-2' }],
      ['EF Core', { name: 'EF Core', category: TechnologyCategory.FRAMEWORK, color: '#51cf66', icon: 'bi-diagram-2-fill' }],

      // DevOps & Tools
      ['RabbitMQ', { name: 'RabbitMQ', category: TechnologyCategory.DEVOPS, color: '#a78bfa', icon: 'bi-box' }],

      // Methodologies
      ['Agile', { name: 'Agile', category: TechnologyCategory.METHODOLOGY, color: '#ffd43b', icon: 'bi-arrow-repeat' }],
      ['Scrum', { name: 'Scrum', category: TechnologyCategory.METHODOLOGY, color: '#ffd43b', icon: 'bi-people' }]
    ]);

    return techNames
      .map(name => TECHNOLOGY_MAP.get(name))
      .filter((tech): tech is Technology => tech !== undefined)
      .sort((a, b) => {
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }
        return a.name.localeCompare(b.name);
      });
  }

  // TrackBy functions for performance optimization
  trackByWork(index: number, work: WorkExperience): string {
    return work.id;
  }

  trackByAchievement(index: number, achievement: string): number {
    return index;
  }

  trackByTechnology(index: number, tech: Technology): string {
    return tech.name;
  }
}

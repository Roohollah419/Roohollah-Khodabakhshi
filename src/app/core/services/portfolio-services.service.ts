import { Injectable } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Service, ServiceCategory, ServiceLevel, ServicesContent } from '../models/services.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioServicesService {

  constructor() { }

  /**
   * Fetches Services content data (heading and subheading)
   * @returns ServicesContent object
   */
  fetchServicesContent(): ServicesContent {
    return {
      heading: 'SERVICES I PROVIDE',
      subheading: 'Comprehensive solutions across the full software development lifecycle'
    };
  }

  /**
   * Fetches all services/offerings data
   * @returns Array of Service objects
   */
  fetchServices(): Service[] {
    return [
      {
        id: 'backend-development',
        title: 'Back-end Development',
        description: 'Build robust, scalable server-side applications with modern frameworks. Expert in designing RESTful APIs, microservices architecture, and high-performance backend systems that power complex web applications.',
        icon: 'bi-server',
        category: ServiceCategory.BACKEND,
        categoryColor: '#ff6b6b',
        technologies: [
          { name: 'ASP.NET Core', icon: 'bi-code-slash' },
          { name: 'Node.js', icon: 'bi-terminal' },
          { name: 'SQL Server', icon: 'bi-database' }
        ],
        level: ServiceLevel.CORE,
        featured: true,
        ariaLabel: 'Backend Development - Core service specializing in ASP.NET Core, Node.js, and SQL Server'
      },
      {
        id: 'frontend-development',
        title: 'Front-end Development',
        description: 'Create stunning, responsive user interfaces that engage users. Specialized in modern JavaScript frameworks, component-based architecture, and progressive web applications with exceptional UX/UI design.',
        icon: 'bi-window-desktop',
        category: ServiceCategory.FRONTEND,
        categoryColor: '#4dabf7',
        technologies: [
          { name: 'Angular', icon: 'bi-triangle-fill' },
          { name: 'HTML5/CSS3', icon: 'bi-file-code' },
          { name: 'TypeScript', icon: 'bi-code-square' }
        ],
        level: ServiceLevel.CORE,
        featured: true,
        ariaLabel: 'Frontend Development - Core service specializing in Angular, HTML5/CSS3, and TypeScript'
      },
      {
        id: 'database-design',
        title: 'Database Design & Optimization',
        description: 'Design efficient, scalable database architectures that optimize performance. Expert in relational database modeling, query optimization, indexing strategies, and data migration for enterprise applications.',
        icon: 'bi-database-fill',
        category: ServiceCategory.DATABASE,
        categoryColor: '#51cf66',
        technologies: [
          { name: 'SQL Server', icon: 'bi-database' },
          { name: 'T-SQL', icon: 'bi-filetype-sql' },
          { name: 'Performance Tuning', icon: 'bi-speedometer2' }
        ],
        level: ServiceLevel.SPECIALIZED,
        ariaLabel: 'Database Design - Specialized service for SQL Server, T-SQL, and performance optimization'
      },
      {
        id: 'it-consultancy',
        title: 'IT Consultancy & Strategy',
        description: 'Strategic technology consulting to transform your business. Leverage extensive experience in software development, Agile methodologies, and digital transformation to enhance project efficiency and drive innovation.',
        icon: 'bi-lightbulb',
        category: ServiceCategory.CONSULTING,
        categoryColor: '#ffd43b',
        technologies: [
          { name: 'Agile Scrum', icon: 'bi-arrow-repeat' },
          { name: 'Architecture', icon: 'bi-diagram-3' },
          { name: 'Best Practices', icon: 'bi-award' }
        ],
        level: ServiceLevel.CONSULTING,
        ariaLabel: 'IT Consultancy - Consulting service for Agile Scrum, architecture design, and best practices'
      },
      {
        id: 'devops-solutions',
        title: 'DevOps & CI/CD Solutions',
        description: 'Streamline development workflows with cutting-edge DevOps practices. Implement robust CI/CD pipelines, containerization, automated testing, and infrastructure as code to accelerate delivery and improve quality.',
        icon: 'bi-infinity',
        category: ServiceCategory.DEVOPS,
        categoryColor: '#a78bfa',
        technologies: [
          { name: 'Azure DevOps', icon: 'bi-cloud' },
          { name: 'GitLab CI/CD', icon: 'bi-git' },
          { name: 'Docker', icon: 'bi-box' }
        ],
        level: ServiceLevel.SPECIALIZED,
        ariaLabel: 'DevOps Solutions - Specialized service for Azure DevOps, GitLab CI/CD, and Docker'
      }
    ];
  }

  /**
   * Fetches carousel configuration options for services display
   * @returns OwlOptions configuration object
   */
  fetchCarouselOptions(): OwlOptions {
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          stagePadding: 30,
          margin: 10
        },
        576: {
          items: 1,
          stagePadding: 50,
          margin: 15
        },
        768: {
          items: 2,
          margin: 20
        },
        992: {
          items: 3,
          margin: 20
        },
        1400: {
          items: 4,
          margin: 24
        }
      },
      nav: true
    };
  }
}

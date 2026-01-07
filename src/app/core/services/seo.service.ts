import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly document = inject(DOCUMENT);

  private readonly baseTitle = 'Roohollah Khodabakhshi';
  private readonly baseKeywords = '.NET Developer, Full Stack Developer, Developer from Iran, Senior Developer, 10 years experience';
  private readonly baseUrl = 'https://roohollah419.github.io/Roohollah-Khodabakhshi';

  /**
   * Update all SEO meta tags for the current page
   */
  updateSeoTags(config: SeoConfig): void {
    const fullTitle = `${config.title} | ${this.baseTitle} - Senior .NET Developer`;
    const keywords = config.keywords
      ? `${config.keywords}, ${this.baseKeywords}`
      : this.baseKeywords;

    // Update title
    this.titleService.setTitle(fullTitle);

    // Update meta tags
    this.meta.updateTag({ name: 'title', content: fullTitle });
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: keywords });

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    if (config.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: config.ogImage });
    }
    if (config.canonicalUrl) {
      this.meta.updateTag({ property: 'og:url', content: `${this.baseUrl}${config.canonicalUrl}` });
    }

    // Update Twitter tags
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    if (config.ogImage) {
      this.meta.updateTag({ name: 'twitter:image', content: config.ogImage });
    }

    // Update canonical URL
    this.updateCanonicalUrl(config.canonicalUrl || '/');
  }

  /**
   * Update or create canonical URL link element
   */
  private updateCanonicalUrl(url: string): void {
    const fullUrl = `${this.baseUrl}${url}`;
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');

    if (link) {
      link.setAttribute('href', fullUrl);
    } else {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', fullUrl);
      this.document.head.appendChild(link);
    }
  }

  /**
   * Predefined SEO configurations for each route
   */
  readonly routeConfigs: Record<string, SeoConfig> = {
    '': {
      title: 'About Me',
      description: 'Meet Roohollah Khodabakhshi, a Senior .NET Developer and Full Stack Developer from Iran with over 10 years of professional experience. Expert in C#, ASP.NET Core, Angular, and enterprise software development.',
      keywords: 'About Developer, .NET Developer Iran, Full Stack Developer Portfolio, Senior Software Engineer',
      canonicalUrl: '/'
    },
    'skills': {
      title: 'Technical Skills',
      description: 'Explore the technical skills of Roohollah Khodabakhshi - Expert .NET Developer proficient in C#, ASP.NET Core, Angular, SQL Server, Azure, and modern development technologies with 10+ years experience.',
      keywords: 'Developer Skills, .NET Skills, C# Expert, Angular Developer, ASP.NET Core, SQL Server, Full Stack Skills',
      canonicalUrl: '/skills'
    },
    'services': {
      title: 'Development Services',
      description: 'Professional software development services by Roohollah Khodabakhshi - .NET Development, Full Stack Development, Web Applications, API Development, and consulting services from an experienced developer.',
      keywords: 'Software Development Services, .NET Consulting, Full Stack Services, Web Development Iran, Hire Developer',
      canonicalUrl: '/services'
    },
    'works': {
      title: 'Portfolio & Projects',
      description: 'View the portfolio and projects of Roohollah Khodabakhshi - Real-world .NET applications, Full Stack projects, and enterprise solutions developed over 10+ years of professional experience.',
      keywords: 'Developer Portfolio, .NET Projects, Full Stack Projects, Software Projects, Enterprise Applications',
      canonicalUrl: '/works'
    },
    'testimonials': {
      title: 'Client Testimonials',
      description: 'Read testimonials and reviews from clients who have worked with Roohollah Khodabakhshi - Trusted .NET Developer and Full Stack Developer from Iran with proven track record.',
      keywords: 'Developer Reviews, Client Testimonials, .NET Developer Reviews, Trusted Developer Iran',
      canonicalUrl: '/testimonials'
    },
    'contact': {
      title: 'Contact Me',
      description: 'Get in touch with Roohollah Khodabakhshi - Senior .NET Developer and Full Stack Developer from Iran. Available for freelance projects, consulting, and full-time opportunities worldwide.',
      keywords: 'Contact Developer, Hire .NET Developer, Hire Full Stack Developer, Developer Iran Contact',
      canonicalUrl: '/contact'
    },
    'education': {
      title: 'Education & Certifications',
      description: 'Educational background and certifications of Roohollah Khodabakhshi - Computer Science degree and professional certifications supporting 10+ years as a .NET Developer and Full Stack Developer.',
      keywords: 'Developer Education, .NET Certifications, Computer Science, Professional Certifications',
      canonicalUrl: '/education'
    },
    'language': {
      title: 'Languages',
      description: 'Language proficiencies of Roohollah Khodabakhshi - Multilingual .NET Developer and Full Stack Developer from Iran, enabling effective communication with international clients.',
      keywords: 'Developer Languages, Multilingual Developer, International Developer Iran',
      canonicalUrl: '/language'
    }
  };

  /**
   * Get SEO config for a specific route
   */
  getConfigForRoute(route: string): SeoConfig | undefined {
    return this.routeConfigs[route];
  }
}

import { Injectable } from '@angular/core';
import { AboutMeContent, StatisticSlide } from '../models/about-me.models';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  constructor() { }

  /**
   * Fetches About Me content data
   * @returns AboutMeContent object with heading, introduction, image details
   */
  fetchAboutMeContent(): AboutMeContent {
    return {
      heading: 'SENIOR .NET DEVELOPER & FULL STACK DEVELOPER',
      introduction: `I'm Roohollah Khodabakhshi, a Senior .NET Developer and Full Stack Developer from Iran with over 10 years of professional experience in software development. As an experienced developer, I specialize in building enterprise-grade applications using C#, ASP.NET Core, Angular, and modern web technologies. My expertise spans the entire development lifecycle, from architecture design to deployment, utilizing Agile Scrum methodology. I excel in creating scalable, high-performance solutions with responsive web designs, RESTful APIs, and microservices architecture. My strong communication skills and passion for continuous learning enable me to deliver exceptional results for clients worldwide.`,
      imageUrl: 'assets/image/myImage.jpg',
      imageAlt: 'Roohollah Khodabakhshi - Senior .NET Developer and Full Stack Developer from Iran with 10+ years experience'
    };
  }

  /**
   * Fetches statistics slides data for carousel
   * @returns Array of StatisticSlide objects
   */
  fetchStatisticsData(): StatisticSlide[] {
    return [
      {
        id: 0,
        items: [
          {
            icon: 'bi-laptop-fill',
            value: '10+',
            label: 'Years Experience',
            ariaLabel: 'Senior Developer with over 10 years of professional experience in .NET and Full Stack development'
          },
          {
            icon: 'bi-trophy-fill',
            value: 22,
            label: 'Projects Delivered',
            ariaLabel: 'Successfully completed 22 software development projects'
          }
        ]
      },
      {
        id: 1,
        items: [
          {
            icon: 'bi-award-fill',
            value: 4,
            label: 'Certifications',
            ariaLabel: 'Earned 4 professional developer certifications'
          },
          {
            icon: 'bi-microsoft-teams',
            value: 6,
            label: 'Team Collaborations',
            ariaLabel: 'Collaborated with 6 development teams'
          }
        ]
      }
    ];
  }

  /**
   * Fetches carousel configuration ID
   * @returns Unique carousel ID string
   */
  getCarouselId(): string {
    return 'aboutMeCarousel';
  }
}

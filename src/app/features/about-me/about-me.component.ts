import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatisticItem {
  icon: string;           // Bootstrap icon class (e.g., 'bi-microsoft-teams')
  value: number;
  label: string;
  ariaLabel?: string;     // Optional for accessibility
}

interface StatisticSlide {
  id: number;
  items: StatisticItem[];
}

interface AboutMeContent {
  heading: string;
  introduction: string;
  imageUrl: string;
  imageAlt: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export default class AboutMeComponent {
  // Content data
  content: AboutMeContent = {
    heading: 'WHO AM I?',
    introduction: `I'm a dedicated Full-Stack Developer with expertise in .NET and Angular, skilled in designing and developing applications using Agile Scrum methodology. I excel in creating responsive web designs and user interfaces, leveraging technologies like ASP.NET Core, Node.js, and Docker. My strong communication and interpersonal skills, combined with a passion for teamwork and continuous learning, enable me to thrive in dynamic, innovative environments.`,
    imageUrl: 'assets/image/myImage.jpg',
    imageAlt: 'Roohollah Khodabakhshi - Full-Stack Developer'
  };

  // Statistics carousel configuration
  carouselId = 'aboutMeCarousel'; // Unique, semantic ID

  // Statistics data - organized by slides
  statisticSlides: StatisticSlide[] = [
    {
      id: 0,
      items: [
        {
          icon: 'bi-microsoft-teams',
          value: 6,
          label: 'Team Members',
          ariaLabel: 'Worked with 6 team members'
        },
        {
          icon: 'bi-award-fill',
          value: 4,
          label: 'Certificates',
          ariaLabel: 'Earned 4 professional certificates'
        }
      ]
    },
    {
      id: 1,
      items: [
        {
          icon: 'bi-laptop-fill',
          value: 10,
          label: 'Working Years',
          ariaLabel: '10 years of professional experience'
        },
        {
          icon: 'bi-trophy-fill',
          value: 22,
          label: 'Projects',
          ariaLabel: 'Completed 22 projects'
        }
      ]
    }
  ];
}

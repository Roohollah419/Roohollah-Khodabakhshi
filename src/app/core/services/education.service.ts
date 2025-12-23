import { Injectable } from '@angular/core';
import { Education, EducationContent } from '../models/education.models';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor() { }

  /**
   * Fetches Education content data (heading and subheading)
   * @returns EducationContent object
   */
  fetchEducationContent(): EducationContent {
    return {
      heading: 'EDUCATION',
      subheading: 'Academic background and qualifications'
    };
  }

  /**
   * Fetches all education data
   * @returns Array of Education objects sorted by order
   */
  fetchEducation(): Education[] {
    return [
      {
        id: 'edu-master',
        degree: 'Master of Science',
        field: 'Nanotechnology Engineering - Nanoelectronics',
        institution: 'Tabriz University',
        location: 'Tabriz, East Azerbaijan, Iran',
        startDate: '2011',
        endDate: '2013',
        duration: '2 years',
        order: 1,
        ariaLabel: 'Master of Science in Nanotechnology Engineering at Tabriz University, 2011 to 2013'
      },
      {
        id: 'edu-bachelor',
        degree: 'Bachelor of Science',
        field: 'Electrical Engineering - Electronics',
        institution: 'Islamic Azad University of Najafabad',
        location: 'Isfahan, Iran',
        startDate: '2001',
        endDate: '2005',
        duration: '4 years',
        order: 2,
        ariaLabel: 'Bachelor of Science in Electrical Engineering at Islamic Azad University of Najafabad, 2001 to 2005'
      }
    ];
  }
}

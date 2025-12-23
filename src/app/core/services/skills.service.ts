import { Injectable } from '@angular/core';
import { Skill, SkillCategory, SkillGroup, SkillsContent } from '../models/skills.models';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor() { }

  /**
   * Fetches Skills content data (heading and subheading)
   * @returns SkillsContent object
   */
  fetchSkillsContent(): SkillsContent {
    return {
      heading: "WHAT I'M GOOD AT?",
      subheading: 'Technical skills and proficiency levels across various technologies'
    };
  }

  /**
   * Fetches all skills data
   * @returns Array of Skill objects
   */
  fetchSkills(): Skill[] {
    return [
      // Backend
      {
        id: 'aspnet-core',
        name: 'ASP.NET Core',
        proficiency: 100,
        icon: 'bi-code-slash',
        category: SkillCategory.BACKEND,
        ariaLabel: 'ASP.NET Core - Expert level with 100% proficiency'
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        proficiency: 95,
        icon: 'bi-terminal',
        category: SkillCategory.BACKEND,
        ariaLabel: 'Node.js - Expert level with 95% proficiency'
      },
      // Frontend
      {
        id: 'angular',
        name: 'Angular 2+',
        proficiency: 75,
        icon: 'bi-triangle-fill',
        category: SkillCategory.FRONTEND,
        ariaLabel: 'Angular 2+ - Advanced level with 75% proficiency'
      },
      {
        id: 'react',
        name: 'React.js',
        proficiency: 50,
        icon: 'bi-circle',
        category: SkillCategory.FRONTEND,
        ariaLabel: 'React.js - Intermediate level with 50% proficiency'
      },
      {
        id: 'html-css',
        name: 'HTML5, CSS3, SCSS',
        proficiency: 100,
        icon: 'bi-file-code-fill',
        category: SkillCategory.FRONTEND,
        ariaLabel: 'HTML5, CSS3, SCSS - Expert level with 100% proficiency'
      },
      // Database
      {
        id: 'sql-server',
        name: 'SQL Server',
        proficiency: 100,
        icon: 'bi-database-fill',
        category: SkillCategory.DATABASE,
        ariaLabel: 'SQL Server - Expert level with 100% proficiency'
      },
      // Languages
      {
        id: 'typescript',
        name: 'TypeScript',
        proficiency: 80,
        icon: 'bi-code-square',
        category: SkillCategory.LANGUAGES,
        ariaLabel: 'TypeScript - Advanced level with 80% proficiency'
      },
      {
        id: 'javascript',
        name: 'JavaScript, jQuery',
        proficiency: 100,
        icon: 'bi-filetype-js',
        category: SkillCategory.LANGUAGES,
        ariaLabel: 'JavaScript and jQuery - Expert level with 100% proficiency'
      },
      // DevOps
      {
        id: 'azure-devops',
        name: 'Azure DevOps',
        proficiency: 75,
        icon: 'bi-infinity',
        category: SkillCategory.DEVOPS,
        ariaLabel: 'Azure DevOps - Advanced level with 75% proficiency'
      }
    ];
  }

  /**
   * Fetches skills grouped by category
   * @returns Array of SkillGroup objects with categorized skills
   */
  fetchSkillGroups(): SkillGroup[] {
    const skills = this.fetchSkills();

    return [
      {
        category: SkillCategory.BACKEND,
        categoryIcon: 'bi-server',
        categoryColor: 'color-backend',
        skills: skills.filter(s => s.category === SkillCategory.BACKEND)
      },
      {
        category: SkillCategory.FRONTEND,
        categoryIcon: 'bi-window-desktop',
        categoryColor: 'color-frontend',
        skills: skills.filter(s => s.category === SkillCategory.FRONTEND)
      },
      {
        category: SkillCategory.DATABASE,
        categoryIcon: 'bi-database',
        categoryColor: 'color-database',
        skills: skills.filter(s => s.category === SkillCategory.DATABASE)
      },
      {
        category: SkillCategory.LANGUAGES,
        categoryIcon: 'bi-code-slash',
        categoryColor: 'color-languages',
        skills: skills.filter(s => s.category === SkillCategory.LANGUAGES)
      },
      {
        category: SkillCategory.DEVOPS,
        categoryIcon: 'bi-infinity',
        categoryColor: 'color-devops',
        skills: skills.filter(s => s.category === SkillCategory.DEVOPS)
      }
    ];
  }
}

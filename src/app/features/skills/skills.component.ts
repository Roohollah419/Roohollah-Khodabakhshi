import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

enum SkillCategory {
  BACKEND = 'Backend',
  FRONTEND = 'Frontend',
  DATABASE = 'Database',
  LANGUAGES = 'Languages',
  DEVOPS = 'DevOps'
}

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  icon: string;
  category: SkillCategory;
  ariaLabel?: string;
}

interface SkillGroup {
  category: SkillCategory;
  categoryIcon: string;
  categoryColor: string;
  skills: Skill[];
}

interface SkillsContent {
  heading: string;
  subheading?: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export default class SkillsComponent {

  // Content data
  content: SkillsContent = {
    heading: "WHAT I'M GOOD AT?",
    subheading: 'Technical skills and proficiency levels across various technologies'
  };

  // All skills data
  private skills: Skill[] = [
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

  // Grouped skills by category
  skillGroups: SkillGroup[] = [
    {
      category: SkillCategory.BACKEND,
      categoryIcon: 'bi-server',
      categoryColor: 'color-backend',
      skills: this.skills.filter(s => s.category === SkillCategory.BACKEND)
    },
    {
      category: SkillCategory.FRONTEND,
      categoryIcon: 'bi-window-desktop',
      categoryColor: 'color-frontend',
      skills: this.skills.filter(s => s.category === SkillCategory.FRONTEND)
    },
    {
      category: SkillCategory.DATABASE,
      categoryIcon: 'bi-database',
      categoryColor: 'color-database',
      skills: this.skills.filter(s => s.category === SkillCategory.DATABASE)
    },
    {
      category: SkillCategory.LANGUAGES,
      categoryIcon: 'bi-code-slash',
      categoryColor: 'color-languages',
      skills: this.skills.filter(s => s.category === SkillCategory.LANGUAGES)
    },
    {
      category: SkillCategory.DEVOPS,
      categoryIcon: 'bi-infinity',
      categoryColor: 'color-devops',
      skills: this.skills.filter(s => s.category === SkillCategory.DEVOPS)
    }
  ];

  // Circular progress calculations
  calculateCircumference(): number {
    const radius = 50;
    return 2 * Math.PI * radius; // ≈ 314.159
  }

  calculateOffset(proficiency: number): number {
    const circumference = this.calculateCircumference();
    return circumference - (proficiency / 100) * circumference;
  }

  // Proficiency level helpers
  getProficiencyLevel(proficiency: number): string {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 75) return 'Advanced';
    if (proficiency >= 60) return 'Intermediate';
    return 'Beginner';
  }

  getProficiencyBadgeClass(proficiency: number): string {
    if (proficiency >= 90) return 'badge-expert';
    if (proficiency >= 75) return 'badge-advanced';
    if (proficiency >= 60) return 'badge-intermediate';
    return 'badge-beginner';
  }

  // TrackBy functions for performance
  trackByCategory(index: number, group: SkillGroup): SkillCategory {
    return group.category;
  }

  trackBySkill(index: number, skill: Skill): string {
    return skill.id;
  }
}

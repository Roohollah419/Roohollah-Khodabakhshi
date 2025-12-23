import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill, SkillCategory, SkillGroup, SkillsContent } from '../../core/models/skills.models';
import { SkillsService } from '../../core/services/skills.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export default class SkillsComponent {

  // Content data
  content: SkillsContent;

  // Grouped skills by category
  skillGroups: SkillGroup[];

  constructor(private skillsService: SkillsService) {
    this.content = this.skillsService.fetchSkillsContent();
    this.skillGroups = this.skillsService.fetchSkillGroups();
  }

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

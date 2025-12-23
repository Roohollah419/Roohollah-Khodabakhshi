import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { AboutMeService } from './about-me.service';
import { EducationService } from './education.service';
import { WorksService } from './works.service';
import { SkillsService } from './skills.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class CvGeneratorService {

  constructor(
    private aboutMeService: AboutMeService,
    private educationService: EducationService,
    private worksService: WorksService,
    private skillsService: SkillsService,
    private languageService: LanguageService
  ) { }

  /**
   * Generates and downloads a PDF CV with all data from services
   */
  async generateAndDownloadCV(): Promise<void> {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Fetch all data from services
    const aboutMe = this.aboutMeService.fetchAboutMeContent();
    const education = this.educationService.fetchEducation();
    const works = this.worksService.fetchWorkExperiences();
    const skillGroups = this.skillsService.fetchSkillGroups();
    const languages = this.languageService.fetchLanguages();

    // Header with name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Roohollah Khodabakhshi', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Full-Stack Developer', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Profile/Introduction
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROFILE', 20, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const introLines = doc.splitTextToSize(aboutMe.introduction, pageWidth - 40);
    doc.text(introLines, 20, yPosition);
    yPosition += introLines.length * 5 + 10;

    // Education Section
    this.checkPageBreak(doc, yPosition, 30);
    yPosition = this.getCurrentY(doc, yPosition, 30);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EDUCATION', 20, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    education.forEach(edu => {
      this.checkPageBreak(doc, yPosition, 25);
      yPosition = this.getCurrentY(doc, yPosition, 25);

      doc.setFont('helvetica', 'bold');
      doc.text(edu.degree, 20, yPosition);
      yPosition += 5;

      doc.setFont('helvetica', 'normal');
      doc.text(`${edu.field}`, 20, yPosition);
      yPosition += 5;

      doc.text(`${edu.institution}, ${edu.location}`, 20, yPosition);
      yPosition += 5;

      doc.setTextColor(100, 100, 100);
      doc.text(`${edu.startDate} - ${edu.endDate}`, 20, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += 8;
    });

    // Work Experience Section
    this.checkPageBreak(doc, yPosition, 30);
    yPosition = this.getCurrentY(doc, yPosition, 30);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('WORK EXPERIENCE', 20, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    works.forEach(work => {
      this.checkPageBreak(doc, yPosition, 40);
      yPosition = this.getCurrentY(doc, yPosition, 40);

      doc.setFont('helvetica', 'bold');
      doc.text(`${work.role}`, 20, yPosition);
      yPosition += 5;

      doc.setFont('helvetica', 'normal');
      doc.text(`${work.company}, ${work.location}`, 20, yPosition);
      yPosition += 5;

      doc.setTextColor(100, 100, 100);
      doc.text(`${work.startDate} - ${work.endDate}`, 20, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += 6;

      // Achievements
      work.achievements.forEach(achievement => {
        this.checkPageBreak(doc, yPosition, 10);
        yPosition = this.getCurrentY(doc, yPosition, 10);

        const achievementLines = doc.splitTextToSize(`• ${achievement}`, pageWidth - 45);
        doc.text(achievementLines, 25, yPosition);
        yPosition += achievementLines.length * 5;
      });

      yPosition += 5;
    });

    // Skills Section
    this.checkPageBreak(doc, yPosition, 30);
    yPosition = this.getCurrentY(doc, yPosition, 30);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SKILLS', 20, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    skillGroups.forEach(group => {
      this.checkPageBreak(doc, yPosition, 15);
      yPosition = this.getCurrentY(doc, yPosition, 15);

      doc.setFont('helvetica', 'bold');
      doc.text(group.category, 20, yPosition);
      yPosition += 5;

      doc.setFont('helvetica', 'normal');
      const skillNames = group.skills.map(s => s.name).join(', ');
      const skillLines = doc.splitTextToSize(skillNames, pageWidth - 40);
      doc.text(skillLines, 20, yPosition);
      yPosition += skillLines.length * 5 + 5;
    });

    // Language Skills Section
    this.checkPageBreak(doc, yPosition, 30);
    yPosition = this.getCurrentY(doc, yPosition, 30);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('LANGUAGES', 20, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    languages.forEach(lang => {
      this.checkPageBreak(doc, yPosition, 20);
      yPosition = this.getCurrentY(doc, yPosition, 20);

      doc.setFont('helvetica', 'bold');
      doc.text(`${lang.name} - ${lang.level}`, 20, yPosition);
      yPosition += 5;

      doc.setFont('helvetica', 'normal');
      doc.text(`Reading: ${lang.skills.reading}/5, Writing: ${lang.skills.writing}/5, Speaking: ${lang.skills.speaking}/5, Listening: ${lang.skills.listening}/5`, 20, yPosition);
      yPosition += 8;
    });

    // Social Media Section
    this.checkPageBreak(doc, yPosition, 20);
    yPosition = this.getCurrentY(doc, yPosition, 20);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('CONTACT', 20, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('LinkedIn: linkedin.com/in/roohollah-khodabakhshi', 20, yPosition);
    yPosition += 5;
    doc.text('GitHub: github.com/roohollah419', 20, yPosition);
    yPosition += 5;
    doc.text('Twitter: @roohollah419', 20, yPosition);

    // Generate filename with today's date
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const filename = `Roohollah-Khodabakhshi.${dateStr}.pdf`;

    // Download the PDF
    doc.save(filename);
  }

  /**
   * Check if we need a page break
   */
  private checkPageBreak(doc: jsPDF, yPosition: number, spaceNeeded: number): void {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (yPosition + spaceNeeded > pageHeight - 20) {
      doc.addPage();
    }
  }

  /**
   * Get current Y position (20 if new page, current position otherwise)
   */
  private getCurrentY(doc: jsPDF, currentY: number, spaceNeeded: number): number {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (currentY + spaceNeeded > pageHeight - 20) {
      return 20;
    }
    return currentY;
  }
}

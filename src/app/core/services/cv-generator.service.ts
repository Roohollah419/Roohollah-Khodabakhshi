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
  // Theme colors (purple accent matching website)
  private readonly ACCENT_COLOR: [number, number, number] = [167, 139, 250]; // #a78bfa
  private readonly DARK_TEXT: [number, number, number] = [30, 30, 30];
  private readonly GRAY_TEXT: [number, number, number] = [100, 100, 100];
  private readonly LIGHT_GRAY: [number, number, number] = [200, 200, 200];

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
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = 25;

    // Fetch all data from services
    const aboutMe = this.aboutMeService.fetchAboutMeContent();
    const education = this.educationService.fetchEducation();
    const works = this.worksService.fetchWorkExperiences();
    const skillGroups = this.skillsService.fetchSkillGroups();
    const languages = this.languageService.fetchLanguages();

    // ========== HEADER ==========
    // Name with accent color
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.ACCENT_COLOR);
    doc.text('Roohollah Khodabakhshi', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // Title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.DARK_TEXT);
    doc.text('Full-Stack Developer', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    // Contact line
    doc.setFontSize(9);
    doc.setTextColor(...this.GRAY_TEXT);
    doc.text('Vienna, Austria  |  linkedin.com/in/roohollah-khodabakhshi  |  github.com/roohollah419', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 12;

    // Header divider
    this.drawDivider(doc, margin, yPosition, contentWidth, 'thick');
    yPosition += 12;

    // ========== PROFILE ==========
    yPosition = this.drawSectionTitle(doc, 'PROFILE', pageWidth, yPosition);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.DARK_TEXT);
    const introLines = doc.splitTextToSize(aboutMe.introduction, contentWidth);
    doc.text(introLines, margin, yPosition);
    yPosition += introLines.length * 5 + 8;

    // ========== WORK EXPERIENCE ==========
    this.checkPageBreak(doc, yPosition, 40);
    yPosition = this.getCurrentY(doc, yPosition, 40);

    yPosition = this.drawSectionTitle(doc, 'WORK EXPERIENCE', pageWidth, yPosition);

    works.forEach((work, index) => {
      this.checkPageBreak(doc, yPosition, 35);
      yPosition = this.getCurrentY(doc, yPosition, 35);

      // Role and dates on same line
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...this.DARK_TEXT);
      doc.text(work.role, margin, yPosition);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...this.GRAY_TEXT);
      doc.text(`${work.startDate} - ${work.endDate}`, pageWidth - margin, yPosition, { align: 'right' });
      yPosition += 5;

      // Company and location
      doc.setFontSize(10);
      doc.setTextColor(...this.ACCENT_COLOR);
      doc.text(`${work.company}`, margin, yPosition);
      doc.setTextColor(...this.GRAY_TEXT);
      doc.text(` | ${work.location}`, margin + doc.getTextWidth(work.company), yPosition);
      yPosition += 6;

      // Achievements
      doc.setFontSize(9);
      doc.setTextColor(...this.DARK_TEXT);
      work.achievements.forEach(achievement => {
        this.checkPageBreak(doc, yPosition, 8);
        yPosition = this.getCurrentY(doc, yPosition, 8);

        const bulletText = `•  ${achievement}`;
        const achievementLines = doc.splitTextToSize(bulletText, contentWidth - 5);
        doc.text(achievementLines, margin + 3, yPosition);
        yPosition += achievementLines.length * 4.5;
      });

      // Add small spacing between jobs
      if (index < works.length - 1) {
        yPosition += 4;
        this.drawDivider(doc, margin + 20, yPosition, contentWidth - 40, 'light');
        yPosition += 6;
      }
    });

    yPosition += 6;

    // ========== EDUCATION ==========
    this.checkPageBreak(doc, yPosition, 35);
    yPosition = this.getCurrentY(doc, yPosition, 35);

    yPosition = this.drawSectionTitle(doc, 'EDUCATION', pageWidth, yPosition);

    education.forEach((edu, index) => {
      this.checkPageBreak(doc, yPosition, 20);
      yPosition = this.getCurrentY(doc, yPosition, 20);

      // Degree and dates
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...this.DARK_TEXT);
      doc.text(edu.degree, margin, yPosition);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...this.GRAY_TEXT);
      doc.text(`${edu.startDate} - ${edu.endDate}`, pageWidth - margin, yPosition, { align: 'right' });
      yPosition += 5;

      // Field
      doc.setFontSize(10);
      doc.setTextColor(...this.DARK_TEXT);
      doc.text(edu.field, margin, yPosition);
      yPosition += 5;

      // Institution
      doc.setFontSize(9);
      doc.setTextColor(...this.ACCENT_COLOR);
      doc.text(edu.institution, margin, yPosition);
      doc.setTextColor(...this.GRAY_TEXT);
      doc.text(` | ${edu.location}`, margin + doc.getTextWidth(edu.institution), yPosition);
      yPosition += 8;
    });

    yPosition += 4;

    // ========== SKILLS ==========
    this.checkPageBreak(doc, yPosition, 40);
    yPosition = this.getCurrentY(doc, yPosition, 40);

    yPosition = this.drawSectionTitle(doc, 'SKILLS', pageWidth, yPosition);

    skillGroups.forEach(group => {
      this.checkPageBreak(doc, yPosition, 12);
      yPosition = this.getCurrentY(doc, yPosition, 12);

      // Category name with accent
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...this.ACCENT_COLOR);
      doc.text(`${group.category}:`, margin, yPosition);

      // Skills list
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...this.DARK_TEXT);
      const skillNames = group.skills.map(s => s.name).join('  •  ');
      const categoryWidth = doc.getTextWidth(`${group.category}: `);
      const skillLines = doc.splitTextToSize(skillNames, contentWidth - categoryWidth - 5);
      doc.text(skillLines, margin + categoryWidth + 2, yPosition);
      yPosition += skillLines.length * 5 + 3;
    });

    yPosition += 4;

    // ========== LANGUAGES ==========
    this.checkPageBreak(doc, yPosition, 30);
    yPosition = this.getCurrentY(doc, yPosition, 30);

    yPosition = this.drawSectionTitle(doc, 'LANGUAGES', pageWidth, yPosition);

    // Languages in a more compact format
    const langStrings = languages.map(lang => `${lang.name} (${lang.level})`);
    doc.setFontSize(10);
    doc.setTextColor(...this.DARK_TEXT);
    doc.text(langStrings.join('  •  '), margin, yPosition);
    yPosition += 10;

    // Language details
    doc.setFontSize(9);
    languages.forEach(lang => {
      this.checkPageBreak(doc, yPosition, 8);
      yPosition = this.getCurrentY(doc, yPosition, 8);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...this.ACCENT_COLOR);
      doc.text(`${lang.name}:`, margin, yPosition);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...this.GRAY_TEXT);
      const skills = `Reading ${lang.skills.reading}/5  •  Writing ${lang.skills.writing}/5  •  Speaking ${lang.skills.speaking}/5  •  Listening ${lang.skills.listening}/5`;
      doc.text(skills, margin + doc.getTextWidth(`${lang.name}: `), yPosition);
      yPosition += 6;
    });

    // ========== FOOTER ==========
    this.addFooter(doc);

    // Generate filename with today's date
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const filename = `Roohollah-Khodabakhshi.${dateStr}.pdf`;

    // Download the PDF
    doc.save(filename);
  }

  /**
   * Draw a centered section title with decorative lines
   */
  private drawSectionTitle(doc: jsPDF, title: string, pageWidth: number, yPosition: number): number {
    const margin = 20;
    const titleWidth = doc.getTextWidth(title);
    const lineLength = 25;
    const centerX = pageWidth / 2;

    // Draw left line
    doc.setDrawColor(...this.LIGHT_GRAY);
    doc.setLineWidth(0.5);
    doc.line(centerX - titleWidth / 2 - lineLength - 8, yPosition - 3, centerX - titleWidth / 2 - 8, yPosition - 3);

    // Draw title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.ACCENT_COLOR);
    doc.text(title, centerX, yPosition, { align: 'center' });

    // Draw right line
    doc.line(centerX + titleWidth / 2 + 8, yPosition - 3, centerX + titleWidth / 2 + lineLength + 8, yPosition - 3);

    return yPosition + 8;
  }

  /**
   * Draw a horizontal divider line
   */
  private drawDivider(doc: jsPDF, x: number, y: number, width: number, style: 'thick' | 'light' = 'light'): void {
    if (style === 'thick') {
      doc.setDrawColor(...this.ACCENT_COLOR);
      doc.setLineWidth(1);
    } else {
      doc.setDrawColor(...this.LIGHT_GRAY);
      doc.setLineWidth(0.3);
    }
    doc.line(x, y, x + width, y);
  }

  /**
   * Add footer to all pages
   */
  private addFooter(doc: jsPDF): void {
    const pageCount = doc.getNumberOfPages();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(...this.GRAY_TEXT);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
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
   * Get current Y position (25 if new page, current position otherwise)
   */
  private getCurrentY(doc: jsPDF, currentY: number, spaceNeeded: number): number {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (currentY + spaceNeeded > pageHeight - 20) {
      return 25;
    }
    return currentY;
  }
}

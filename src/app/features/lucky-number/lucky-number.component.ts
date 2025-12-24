import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lucky-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lucky-number.component.html',
  styleUrl: './lucky-number.component.css'
})
export default class LuckyNumberComponent {
  luckyNumber: number | null = null;

  /**
   * Generates a random number between 1 and 114
   */
  generateLuckyNumber(): void {
    this.luckyNumber = Math.floor(Math.random() * 114) + 1;
  }
}

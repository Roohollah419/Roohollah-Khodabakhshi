import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateLimiterService {
  private lastSubmissionTime: number = 0;
  private readonly minTimeBetweenSubmissions = 60000; // 1 minute

  canSubmit(): boolean {
    const now = Date.now();
    const timeSinceLastSubmission = now - this.lastSubmissionTime;
    return timeSinceLastSubmission >= this.minTimeBetweenSubmissions;
  }

  getTimeUntilNextSubmission(): number {
    const now = Date.now();
    const timeSinceLastSubmission = now - this.lastSubmissionTime;
    const timeRemaining = this.minTimeBetweenSubmissions - timeSinceLastSubmission;
    return Math.max(0, Math.ceil(timeRemaining / 1000)); // Return seconds
  }

  recordSubmission(): void {
    this.lastSubmissionTime = Date.now();
  }
}

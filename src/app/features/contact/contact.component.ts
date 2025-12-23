import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailService } from '../../core/services/email.service';
import { RecaptchaService } from '../../core/services/recaptcha.service';
import { RateLimiterService } from '../../core/services/rate-limiter.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export default class ContactComponent {
  // UI State
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  // Honeypot field for spam detection (not visible to users)
  honeypot = new FormControl('');

  // Contact form
  contact = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
  });

  constructor(
    private emailService: EmailService,
    private recaptchaService: RecaptchaService,
    private rateLimiter: RateLimiterService
  ) {}

  get messageCharacterCount(): number {
    return this.contact.get('message')?.value?.length || 0;
  }

  async submitForm(): Promise<void> {
    // Reset previous states
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';

    // Validate form
    if (!this.contact.valid) {
      this.contact.markAllAsTouched();
      return;
    }

    // Check honeypot (spam trap)
    if (this.honeypot.value) {
      console.warn('Spam detected via honeypot');
      return; // Silent fail for bots
    }

    // Check rate limiting
    if (!this.rateLimiter.canSubmit()) {
      const seconds = this.rateLimiter.getTimeUntilNextSubmission();
      this.submitError = true;
      this.errorMessage = `Please wait ${seconds} seconds before submitting again.`;
      return;
    }

    try {
      // Set loading state
      this.isSubmitting = true;

      // Execute reCAPTCHA v3
      const recaptchaToken = await this.recaptchaService.executeRecaptcha('contact_form');
      const isValidToken = await this.recaptchaService.verifyToken(recaptchaToken);

      if (!isValidToken) {
        throw new Error('reCAPTCHA verification failed');
      }

      // Get form values
      const formData = this.contact.getRawValue();

      // Send email via EmailJS
      const response = await this.emailService.sendEmail({
        from_name: formData.fullName || '',
        from_email: formData.email || '',
        message: formData.message || ''
      });

      if (response.success) {
        // Record submission for rate limiting
        this.rateLimiter.recordSubmission();

        // Show success message
        this.submitSuccess = true;

        // Reset form
        this.contact.reset();

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      } else {
        // Show error message
        this.submitError = true;
        this.errorMessage = response.message;
      }
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      this.submitError = true;
      this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
    } finally {
      // Clear loading state
      this.isSubmitting = false;
    }
  }

  // Helper method to check if a field is invalid and touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contact.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}

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

  // Masked contact info (anti-crawler protection)
  // Data is stored obfuscated and only decoded on user interaction
  emailRevealed = false;
  phoneRevealed = false;

  // Obfuscated data (reversed + base64 to prevent simple scraping)
  private readonly obfuscatedEmail = 'bW9jLmxpYW1nQDkxNGhhbGxvaG9vcg=='; // base64 of reversed email
  private readonly obfuscatedPhone = 'MTU2MDc5ODMxOTg5Kw=='; // base64 of reversed phone

  // Masked display values
  readonly maskedEmail = 'r**********9@g****.com';
  readonly maskedPhone = '+98 *** *** ****';

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

  // Decode obfuscated string (base64 decode then reverse)
  private decodeObfuscated(encoded: string): string {
    const decoded = atob(encoded);
    return decoded.split('').reverse().join('');
  }

  // Get email (decoded only when revealed)
  get displayEmail(): string {
    if (!this.emailRevealed) return this.maskedEmail;
    return this.decodeObfuscated(this.obfuscatedEmail);
  }

  // Get phone (decoded only when revealed)
  get displayPhone(): string {
    if (!this.phoneRevealed) return this.maskedPhone;
    return this.decodeObfuscated(this.obfuscatedPhone);
  }

  // Get email link (only when revealed)
  get emailHref(): string | null {
    if (!this.emailRevealed) return null;
    return `mailto:${this.decodeObfuscated(this.obfuscatedEmail)}`;
  }

  // Get phone link (only when revealed)
  get phoneHref(): string | null {
    if (!this.phoneRevealed) return null;
    return `tel:${this.decodeObfuscated(this.obfuscatedPhone)}`;
  }

  // Reveal email on click
  revealEmail(event: Event): void {
    event.preventDefault();
    this.emailRevealed = true;
  }

  // Reveal phone on click
  revealPhone(event: Event): void {
    event.preventDefault();
    this.phoneRevealed = true;
  }
}

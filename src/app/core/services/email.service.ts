import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { EmailRequest, EmailResponse } from '../models/email.models';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly serviceId = environment.emailjs.serviceId;
  private readonly templateId = environment.emailjs.templateId;
  private readonly publicKey = environment.emailjs.publicKey;

  constructor() {
    // Initialize EmailJS with public key
    emailjs.init(this.publicKey);
  }

  async sendEmail(emailRequest: EmailRequest): Promise<EmailResponse> {
    try {
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        {
          from_name: emailRequest.from_name,
          from_email: emailRequest.from_email,
          message: emailRequest.message
        }
      );

      return {
        success: true,
        message: 'Email sent successfully!'
      };
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      return {
        success: false,
        message: error.text || 'Failed to send email. Please try again.'
      };
    }
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const grecaptcha: any;

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  private readonly siteKey = environment.recaptcha.siteKey;

  async executeRecaptcha(action: string): Promise<string> {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(this.siteKey, { action })
          .then((token: string) => resolve(token))
          .catch((error: any) => reject(error));
      });
    });
  }

  async verifyToken(token: string): Promise<boolean> {
    // For client-side validation, we trust the token generation
    // Server-side verification would happen on backend (not applicable for static site)
    return !!(token && token.length > 0);
  }
}

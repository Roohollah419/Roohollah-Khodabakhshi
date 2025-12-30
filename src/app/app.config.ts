import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { TelegramService } from './core/services/telegram.service';

/**
 * Initialize Telegram WebApp at app bootstrap
 * Gracefully no-ops when running in browser
 */
function initializeTelegram(telegramService: TelegramService): () => void {
  return () => telegramService.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTelegram,
      deps: [TelegramService],
      multi: true
    }
  ]
};

import { ApplicationConfig, APP_INITIALIZER, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { TelegramService } from './core/services/telegram.service';
import { provideServiceWorker } from '@angular/service-worker';

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
    },
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
]
};

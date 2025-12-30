import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { MainLayoutComponent } from "./shared/components/main-layout/main-layout.component";
import { TelegramService } from './core/services/telegram.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly telegramService = inject(TelegramService);
  private readonly router = inject(Router);
  private routerSubscription?: Subscription;

  ngOnInit(): void {
    // OPTIONAL: Handle Telegram back button based on route
    if (this.telegramService.isTelegram()) {
      this.setupTelegramBackButton();
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.telegramService.hideBackButton();
  }

  /**
   * OPTIONAL: Setup Telegram back button to navigate back in Angular
   * Shows back button on non-home routes, navigates to home on click
   */
  private setupTelegramBackButton(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const isHome = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '';

        if (isHome) {
          this.telegramService.hideBackButton();
        } else {
          this.telegramService.showBackButton(() => {
            this.router.navigate(['/']);
          });
        }
      });
  }
}

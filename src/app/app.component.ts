import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { MainLayoutComponent } from "./shared/components/main-layout/main-layout.component";
import { TelegramService } from './core/services/telegram.service';
import { filter, Subscription, map, mergeMap } from 'rxjs';

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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly meta = inject(Meta);
  private routerSubscription?: Subscription;
  private seoSubscription?: Subscription;

  private readonly baseKeywords = '.NET Developer, Full Stack Developer, Developer from Iran, Senior Developer, 10 years experience';

  ngOnInit(): void {
    // Setup SEO meta tag updates on route changes
    this.setupSeoUpdates();

    // OPTIONAL: Handle Telegram back button based on route
    if (this.telegramService.isTelegram()) {
      this.setupTelegramBackButton();
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.seoSubscription?.unsubscribe();
    this.telegramService.hideBackButton();
  }

  /**
   * Update SEO meta tags on route navigation
   */
  private setupSeoUpdates(): void {
    this.seoSubscription = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        if (data['seo']) {
          const seoData = data['seo'];
          const keywords = seoData.keywords
            ? `${seoData.keywords}, ${this.baseKeywords}`
            : this.baseKeywords;

          this.meta.updateTag({ name: 'description', content: seoData.description });
          this.meta.updateTag({ name: 'keywords', content: keywords });
          this.meta.updateTag({ property: 'og:description', content: seoData.description });
          this.meta.updateTag({ name: 'twitter:description', content: seoData.description });
        }
      });
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

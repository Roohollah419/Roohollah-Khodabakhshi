import { Injectable, signal, computed } from '@angular/core';
import type {
  TelegramWebApp,
  TelegramWebAppUser,
  TelegramThemeParams,
  TelegramBackButton,
  TelegramMainButton,
  TelegramHapticFeedback
} from '../types/telegram-webapp';

/**
 * TelegramService - Handles Telegram Mini App integration
 *
 * Features:
 * - Detects Telegram runtime vs browser mode
 * - Gracefully no-ops when running outside Telegram
 * - Exposes user data and theme params via signals
 * - Handles viewport and back button
 */
@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private readonly _isInitialized = signal(false);
  private readonly _isTelegram = signal(false);
  private readonly _user = signal<TelegramWebAppUser | null>(null);
  private readonly _colorScheme = signal<'light' | 'dark'>('dark');
  private readonly _themeParams = signal<TelegramThemeParams>({});
  private readonly _viewportHeight = signal<number>(window.innerHeight);
  private readonly _viewportStableHeight = signal<number>(window.innerHeight);

  // Public readonly signals
  readonly isInitialized = this._isInitialized.asReadonly();
  readonly isTelegram = this._isTelegram.asReadonly();
  readonly user = this._user.asReadonly();
  readonly colorScheme = this._colorScheme.asReadonly();
  readonly themeParams = this._themeParams.asReadonly();
  readonly viewportHeight = this._viewportHeight.asReadonly();
  readonly viewportStableHeight = this._viewportStableHeight.asReadonly();

  // Computed signals
  readonly isDarkMode = computed(() => this._colorScheme() === 'dark');
  readonly isLightMode = computed(() => this._colorScheme() === 'light');
  readonly userName = computed(() => {
    const u = this._user();
    if (!u) return null;
    return u.username || `${u.first_name}${u.last_name ? ' ' + u.last_name : ''}`;
  });

  private webApp: TelegramWebApp | null = null;
  private backButtonCallback: (() => void) | null = null;

  /**
   * Initialize Telegram WebApp SDK
   * Safe to call in browser - will gracefully no-op
   */
  initialize(): void {
    if (this._isInitialized()) {
      return;
    }

    const telegram = window.Telegram;

    // Check if Telegram SDK exists AND we're actually inside Telegram
    // The SDK creates window.Telegram.WebApp even in browsers, but initData will be empty
    const isActuallyInTelegram = telegram?.WebApp && telegram.WebApp.initData && telegram.WebApp.initData.length > 0;

    if (!isActuallyInTelegram) {
      console.info('[TelegramService] Running in browser mode (not inside Telegram)');
      this._isInitialized.set(true);
      this._isTelegram.set(false);
      return;
    }

    this.webApp = telegram.WebApp;
    this._isTelegram.set(true);

    // Extract user data
    if (this.webApp.initDataUnsafe?.user) {
      this._user.set(this.webApp.initDataUnsafe.user);
    }

    // Set theme params
    this._colorScheme.set(this.webApp.colorScheme);
    this._themeParams.set(this.webApp.themeParams);

    // Set viewport
    this._viewportHeight.set(this.webApp.viewportHeight);
    this._viewportStableHeight.set(this.webApp.viewportStableHeight);

    // Apply CSS variables for theme
    this.applyThemeVariables();

    // Subscribe to events
    this.setupEventListeners();

    // Signal ready and expand
    this.webApp.ready();
    this.webApp.expand();

    this._isInitialized.set(true);
    console.info('[TelegramService] Initialized in Telegram mode', {
      version: this.webApp.version,
      platform: this.webApp.platform,
      colorScheme: this.webApp.colorScheme,
      user: this._user()?.username || this._user()?.first_name
    });
  }

  /**
   * Apply Telegram theme as CSS custom properties
   */
  private applyThemeVariables(): void {
    if (!this.webApp) return;

    const root = document.documentElement;
    const theme = this.webApp.themeParams;

    const cssVars: Record<string, string | undefined> = {
      '--tg-theme-bg-color': theme.bg_color,
      '--tg-theme-text-color': theme.text_color,
      '--tg-theme-hint-color': theme.hint_color,
      '--tg-theme-link-color': theme.link_color,
      '--tg-theme-button-color': theme.button_color,
      '--tg-theme-button-text-color': theme.button_text_color,
      '--tg-theme-secondary-bg-color': theme.secondary_bg_color,
      '--tg-theme-header-bg-color': theme.header_bg_color,
      '--tg-theme-accent-text-color': theme.accent_text_color,
      '--tg-theme-section-bg-color': theme.section_bg_color,
      '--tg-theme-section-header-text-color': theme.section_header_text_color,
      '--tg-theme-subtitle-text-color': theme.subtitle_text_color,
      '--tg-theme-destructive-text-color': theme.destructive_text_color,
      '--tg-viewport-height': `${this.webApp.viewportHeight}px`,
      '--tg-viewport-stable-height': `${this.webApp.viewportStableHeight}px`
    };

    Object.entries(cssVars).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(key, value);
      }
    });

    // Add telegram class to body for conditional styling
    document.body.classList.add('telegram-webapp');
    document.body.classList.add(`telegram-theme-${this.webApp.colorScheme}`);
  }

  /**
   * Setup Telegram event listeners
   */
  private setupEventListeners(): void {
    if (!this.webApp) return;

    // Theme change
    this.webApp.onEvent('themeChanged', () => {
      if (!this.webApp) return;
      this._colorScheme.set(this.webApp.colorScheme);
      this._themeParams.set(this.webApp.themeParams);
      this.applyThemeVariables();

      // Update body classes
      document.body.classList.remove('telegram-theme-light', 'telegram-theme-dark');
      document.body.classList.add(`telegram-theme-${this.webApp.colorScheme}`);
    });

    // Viewport change
    this.webApp.onEvent('viewportChanged', () => {
      if (!this.webApp) return;
      this._viewportHeight.set(this.webApp.viewportHeight);
      this._viewportStableHeight.set(this.webApp.viewportStableHeight);

      document.documentElement.style.setProperty(
        '--tg-viewport-height',
        `${this.webApp.viewportHeight}px`
      );
      document.documentElement.style.setProperty(
        '--tg-viewport-stable-height',
        `${this.webApp.viewportStableHeight}px`
      );
    });
  }

  // ============================================
  // Public API Methods (gracefully no-op in browser)
  // ============================================

  /**
   * Get BackButton controller (OPTIONAL feature)
   */
  get BackButton(): TelegramBackButton | null {
    return this.webApp?.BackButton ?? null;
  }

  /**
   * Get MainButton controller (OPTIONAL feature)
   */
  get MainButton(): TelegramMainButton | null {
    return this.webApp?.MainButton ?? null;
  }

  /**
   * Get HapticFeedback controller (OPTIONAL feature)
   */
  get HapticFeedback(): TelegramHapticFeedback | null {
    return this.webApp?.HapticFeedback ?? null;
  }

  /**
   * Show back button with callback
   */
  showBackButton(callback: () => void): void {
    if (!this.webApp?.BackButton) return;

    this.backButtonCallback = callback;
    this.webApp.BackButton.onClick(callback);
    this.webApp.BackButton.show();
  }

  /**
   * Hide back button
   */
  hideBackButton(): void {
    if (!this.webApp?.BackButton) return;

    if (this.backButtonCallback) {
      this.webApp.BackButton.offClick(this.backButtonCallback);
      this.backButtonCallback = null;
    }
    this.webApp.BackButton.hide();
  }

  /**
   * Expand the Mini App to full height
   */
  expand(): void {
    this.webApp?.expand();
  }

  /**
   * Close the Mini App
   */
  close(): void {
    this.webApp?.close();
  }

  /**
   * Show native alert
   */
  showAlert(message: string): Promise<void> {
    return new Promise((resolve) => {
      if (this.webApp) {
        this.webApp.showAlert(message, () => resolve());
      } else {
        alert(message);
        resolve();
      }
    });
  }

  /**
   * Show native confirm dialog
   */
  showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.webApp) {
        this.webApp.showConfirm(message, (confirmed) => resolve(confirmed));
      } else {
        resolve(confirm(message));
      }
    });
  }

  /**
   * Open external link (uses Telegram's in-app browser when in Telegram)
   */
  openLink(url: string, options?: { tryInstantView?: boolean }): void {
    if (this.webApp) {
      this.webApp.openLink(url, { try_instant_view: options?.tryInstantView });
    } else {
      window.open(url, '_blank');
    }
  }

  /**
   * Trigger haptic feedback
   */
  hapticFeedback(type: 'impact' | 'notification' | 'selection', style?: string): void {
    if (!this.webApp?.HapticFeedback) return;

    switch (type) {
      case 'impact':
        this.webApp.HapticFeedback.impactOccurred(
          (style as 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') || 'medium'
        );
        break;
      case 'notification':
        this.webApp.HapticFeedback.notificationOccurred(
          (style as 'error' | 'success' | 'warning') || 'success'
        );
        break;
      case 'selection':
        this.webApp.HapticFeedback.selectionChanged();
        break;
    }
  }

  /**
   * Enable closing confirmation
   */
  enableClosingConfirmation(): void {
    this.webApp?.enableClosingConfirmation();
  }

  /**
   * Disable closing confirmation
   */
  disableClosingConfirmation(): void {
    this.webApp?.disableClosingConfirmation();
  }

  /**
   * Get raw init data string (for backend validation)
   */
  getInitData(): string {
    return this.webApp?.initData ?? '';
  }

  /**
   * Get WebApp version
   */
  getVersion(): string {
    return this.webApp?.version ?? '0.0';
  }

  /**
   * Check if version is at least specified
   */
  isVersionAtLeast(version: string): boolean {
    return this.webApp?.isVersionAtLeast(version) ?? false;
  }

  /**
   * Get platform string
   */
  getPlatform(): string {
    return this.webApp?.platform ?? 'browser';
  }
}

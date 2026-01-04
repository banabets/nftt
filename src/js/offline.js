/**
 * Offline/PWA Functionality Module
 * Handles offline detection and PWA features
 */

import { announceToScreenReader } from './utils.js';

/**
 * Offline Manager Class
 * Manages offline/online state and PWA features
 */
export class OfflineManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.init();
  }

  /**
   * Initialize offline functionality
   */
  init() {
    this.bindEvents();
    this.updateOnlineStatus();
    this.registerInstallPrompt();
  }

  /**
   * Bind online/offline event listeners
   */
  bindEvents() {
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  /**
   * Handle coming online
   */
  handleOnline() {
    this.isOnline = true;
    this.updateOnlineStatus();
    announceToScreenReader('Connection restored. You are back online.');

    // Sync any pending data if needed
    this.syncPendingData();
  }

  /**
   * Handle going offline
   */
  handleOffline() {
    this.isOnline = false;
    this.updateOnlineStatus();
    announceToScreenReader('Connection lost. You are currently offline.');
  }

  /**
   * Update UI based on online status
   */
  updateOnlineStatus() {
    const statusIndicator = document.querySelector('.sat .dot');
    if (statusIndicator) {
      if (this.isOnline) {
        statusIndicator.style.background = 'var(--green)';
        statusIndicator.title = 'Online';
      } else {
        statusIndicator.style.background = 'var(--red)';
        statusIndicator.title = 'Offline';
      }
    }
  }

  /**
   * Register PWA install prompt
   */
  registerInstallPrompt() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;

      // Show install button or prompt
      this.showInstallPrompt(deferredPrompt);
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      announceToScreenReader('App installed successfully');
      deferredPrompt = null;
    });
  }

  /**
   * Show install prompt to user
   */
  showInstallPrompt(deferredPrompt) {
    // Create install button
    const installBtn = document.createElement('button');
    installBtn.textContent = 'Install App';
    installBtn.className = 'btn yellow';
    installBtn.style.position = 'fixed';
    installBtn.style.bottom = '20px';
    installBtn.style.right = '20px';
    installBtn.style.zIndex = '1000';

    installBtn.addEventListener('click', async () => {
      // Hide the install button
      installBtn.remove();

      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      // Reset the deferred prompt
      deferredPrompt = null;
    });

    document.body.appendChild(installBtn);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (installBtn.parentNode) {
        installBtn.remove();
      }
    }, 10000);
  }

  /**
   * Sync pending data when coming back online
   */
  syncPendingData() {
    // Could sync localStorage data to server here
    console.log('Syncing pending data...');
  }

  /**
   * Check if app can work offline
   */
  canWorkOffline() {
    return 'serviceWorker' in navigator && 'caches' in window;
  }

  /**
   * Get current online status
   */
  getOnlineStatus() {
    return this.isOnline;
  }
}

// Export singleton instance
export const offlineManager = new OfflineManager();




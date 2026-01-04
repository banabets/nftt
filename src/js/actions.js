/**
 * Actions Module
 * Handles user actions like copying, sharing, and navigation
 */

import { CONFIG } from './config.js';
import { $, copyToClipboard, announceToScreenReader } from './utils.js';

/**
 * Actions Class
 * Manages user interactions and external actions
 */
export class Actions {
  constructor() {
    this.init();
  }

  /**
   * Initialize actions
   */
  init() {
    this.bindEvents();
  }

  /**
   * Bind event listeners for all action buttons
   */
  bindEvents() {
    // Copy link button
    const copyLinkBtn = $('copyLink');
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', () => this.copyLink());
    }

    // Copy caption button
    const copyCaptionBtn = $('copyCaption');
    if (copyCaptionBtn) {
      copyCaptionBtn.addEventListener('click', () => this.copyCaption());
    }

    // Buy button
    const buyBtn = $('buy');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => this.openPumpFun());
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  /**
   * Copy site link to clipboard
   */
  async copyLink() {
    const button = $('copyLink');
    const originalText = button?.textContent;

    const success = () => {
      if (button) {
        button.textContent = 'COPIED';
        announceToScreenReader('Site link copied to clipboard');
        setTimeout(() => {
          button.textContent = originalText;
        }, CONFIG.ui.buttonResetDelay);
      }
    };

    const error = (url) => {
      // Fallback: show alert
      window.alert(url);
      announceToScreenReader('Site link: ' + url);
    };

    await copyToClipboard(CONFIG.site.url, success, error);
  }

  /**
   * Copy screenshot caption to clipboard
   */
  async copyCaption() {
    const button = $('copyCaption');
    const originalText = button?.textContent;

    const source = $('src')?.value || 'Group chat';
    const confidence = $('conf')?.value || CONFIG.ui.defaultConfidence;
    const headline = $('headline')?.textContent || '';

    const caption = this.generateCaption(headline, source, confidence);

    const success = () => {
      if (button) {
        button.textContent = 'COPIED';
        announceToScreenReader('Caption copied to clipboard');
        setTimeout(() => {
          button.textContent = originalText;
        }, CONFIG.ui.buttonResetDelay);
      }
    };

    const error = (text) => {
      // Fallback: show alert
      window.alert(text);
      announceToScreenReader('Caption: ' + text);
    };

    await copyToClipboard(caption, success, error);
  }

  /**
   * Generate formatted caption for social media
   */
  generateCaption(headline, source, confidence) {
    return [
      headline.toLowerCase(),
      `source: ${source.toLowerCase()}`,
      `confidence: ${confidence}%`,
      `$${CONFIG.token.symbol} • ${CONFIG.token.name}`,
      CONFIG.site.url,
      'satire not news'
    ].join('\n');
  }

  /**
   * Open Pump.fun in new tab
   */
  openPumpFun() {
    window.open(CONFIG.token.pumpFunUrl, '_blank', 'noopener,noreferrer');
    announceToScreenReader('Opening Pump.fun in new tab');
  }

  /**
   * Create confetti effect
   */
  createConfetti(x, y) {
    for (let i = 0; i < 30; i++) {
      this.createConfettiParticle(x, y);
    }
  }

  /**
   * Create individual confetti particle
   */
  createConfettiParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.background = this.getRandomColor();

    document.body.appendChild(particle);

    // Animation
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 100 + 50;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let posX = x;
    let posY = y;
    let rotation = 0;

    const animate = () => {
      posX += vx * 0.02;
      posY += vy * 0.02 + 9.8 * 0.02; // Gravity
      rotation += 10;

      particle.style.left = posX + 'px';
      particle.style.top = posY + 'px';
      particle.style.transform = `rotate(${rotation}deg)`;

      if (posY < window.innerHeight) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };

    animate();
  }

  /**
   * Get random color for confetti
   */
  getRandomColor() {
    const colors = ['#ffd400', '#ff2d55', '#00ff7b', '#00d5ff', '#a855ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Handle keyboard shortcuts and accessibility
   */
  handleKeyboard(event) {
    const target = event.target;

    // Ctrl/Cmd + C for copy caption when focused on relevant elements
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
      const activeElement = document.activeElement;

      // If focused on output area or related buttons
      if (activeElement?.closest('#out, .btns')) {
        event.preventDefault();
        this.copyCaption();
      }
    }

    // Space or Enter on interactive elements
    if (event.key === ' ' || event.key === 'Enter') {
      if (target.id === 'genTop' || target.classList.contains('bigbtn')) {
        event.preventDefault();
        target.click();
      }
    }

    // Arrow key navigation for form controls
    if (event.key.startsWith('Arrow')) {
      this.handleArrowNavigation(event);
    }

    // Escape key to close any open states (future enhancement)
    if (event.key === 'Escape') {
      // Could close modals, reset focus, etc.
      this.handleEscape();
    }
  }

  /**
   * Handle arrow key navigation for better accessibility
   */
  handleArrowNavigation(event) {
    const target = event.target;
    const focusableElements = this.getFocusableElements();

    if (!focusableElements.includes(target)) return;

    const currentIndex = focusableElements.indexOf(target);
    let nextIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % focusableElements.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    focusableElements[nextIndex]?.focus();
  }

  /**
   * Get focusable elements in the application
   */
  getFocusableElements() {
    return Array.from(document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
  }

  /**
   * Handle escape key
   */
  handleEscape() {
    // Reset focus to main content if needed
    const mainContent = document.getElementById('main-content');
    if (mainContent && !mainContent.contains(document.activeElement)) {
      mainContent.focus();
    }
  }
}

// Export singleton instance
export const actions = new Actions();

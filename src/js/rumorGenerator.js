/**
 * Breaking News Generator Module
 * Handles the logic for generating satirical breaking news
 */

import { CONFIG } from './config.js';
import { $, getRandomItem, storage } from './utils.js';

/**
 * Breaking News Generator Class
 * Manages breaking news generation, counter, and UI updates
 */
export class BreakingNewsGenerator {
  constructor() {
    this.counter = this.loadCounter();
    this.templates = CONFIG.templates.rumors;
    this.evidence = CONFIG.templates.evidence;
    this.sources = CONFIG.templates.sources;

    this.elements = {
      counter: $('count'),
      headline: $('headline'),
      meta: $('meta'),
      confTxt: $('confTxt'),
      src: $('src'),
      conf: $('conf'),
      out: $('out')
    };

    this.init();
  }

  /**
   * Initialize the generator
   */
  init() {
      this.updateCounterDisplay();
    this.startCounterTimer();
    this.bindEvents();
    this.generateRumor(); // Generate initial breaking news
  }

  /**
   * Load counter from storage or use default
   */
  loadCounter() {
    return storage.get(CONFIG.storage.counter, 8912);
  }

  /**
   * Save counter to storage
   */
  saveCounter() {
    storage.set(CONFIG.storage.counter, this.counter);
  }

  /**
   * Update counter display
   */
  updateCounterDisplay() {
    if (this.elements.counter) {
      this.elements.counter.textContent = `Memes generated today: ${this.formatNumber(this.counter)}`;
    }
  }

  /**
   * Start automatic counter increment
   */
  startCounterTimer() {
    setInterval(() => {
      this.counter += Math.floor(Math.random() * 3); // 0-2
      this.saveCounter();
      this.updateCounterDisplay();
    }, CONFIG.ui.counterUpdateInterval);
  }

  /**
   * Generate breaking news
   */
  generateRumor() {
    const source = this.elements.src?.value || getRandomItem(this.sources);
    const confidence = Number(this.elements.conf?.value) || CONFIG.ui.defaultConfidence;

    const rumor = getRandomItem(this.templates);
    const evidence = getRandomItem(this.evidence);

    this.updateUI(rumor, source, confidence, evidence);
    this.animateOutput();
    this.announceGeneration(rumor, confidence);
  }

  /**
   * Update UI elements with new rumor data
   */
  updateUI(rumor, source, confidence, evidence) {
    if (this.elements.headline) {
      this.elements.headline.textContent = rumor;
    }

    if (this.elements.confTxt) {
      this.elements.confTxt.textContent = `AUTHENTICITY ${confidence}%`;
    }

    if (this.elements.meta) {
      this.elements.meta.textContent = `Source: ${source} • ${evidence} • Viral Maduro meme`;
    }
  }

  /**
   * Animate the output container
   */
  animateOutput() {
    if (!this.elements.out) return;

    // Remove shake class
    this.elements.out.classList.remove('shake');

    // Force reflow
    void this.elements.out.offsetWidth;

    // Add shake class
    this.elements.out.classList.add('shake');
  }

  /**
   * Announce generation to screen readers
   */
  announceGeneration(rumor, confidence) {
    const announcement = `Meme generated: ${rumor} with ${confidence}% authenticity`;
    // Import dynamically to avoid circular dependency
    import('./utils.js').then(({ announceToScreenReader }) => {
      announceToScreenReader(announcement, 'assertive');
    });
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Generate rumor buttons
    const genBtn = $('gen');
    const genTopBtn = $('genTop');

    if (genBtn) {
      genBtn.addEventListener('click', () => this.generateRumor());
    }

    if (genTopBtn) {
      genTopBtn.addEventListener('click', () => {
        this.generateRumor();
        this.scrollToMachine();
      });
    }

    // Confidence slider
    if (this.elements.conf) {
      this.elements.conf.addEventListener('input', () => {
        const value = this.elements.conf.value;
        if (this.elements.confTxt) {
          this.elements.confTxt.textContent = `CONFIDENCE ${value}%`;
        }
      });
    }

    // Scroll to machine
    const scrollBtn = $('scrollToMachine');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => this.scrollToMachine());
    }
  }

  /**
   * Scroll to machine section
   */
  scrollToMachine() {
    const machineSection = document.querySelector('#machine');
    if (machineSection) {
      machineSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Format number with commas (duplicate for internal use)
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}

// Export singleton instance
export const breakingNewsGenerator = new BreakingNewsGenerator();

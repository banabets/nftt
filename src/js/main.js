/**
 * Main Application Entry Point
 * Initializes all modules and sets up the application
 */

import { CONFIG } from './config.js';
import { breakingNewsGenerator } from './rumorGenerator.js';
import { actions } from './actions.js';
import { offlineManager } from './offline.js';
import { announceToScreenReader } from './utils.js';

/**
 * Application Class
 * Main application controller
 */
class NFTSOLApp {
  constructor() {
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      // Initialize modules
      this.setupErrorHandling();
      this.setupPerformanceMonitoring();
      this.announceAppLoad();

      console.log(`${CONFIG.site.name} initialized successfully!`);
    } catch (error) {
      console.error('Failed to initialize application:', error);
      this.handleCriticalError(error);
    }
  }

  /**
   * Set up global error handling
   */
  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      // Could send to error tracking service here
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Could send to error tracking service here
    });
  }

  /**
   * Set up basic performance monitoring
   */
  setupPerformanceMonitoring() {
    // Track page load performance
    window.addEventListener('load', () => {
      if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.fetchStart;

        console.log(`Page load time: ${loadTime}ms`);

        // Could send to analytics here
        if (CONFIG.analytics.enabled) {
          // Track performance metrics
        }
      }
    });
  }



  /**
   * Announce app load to screen readers
   */
  announceAppLoad() {
    announceToScreenReader(`${CONFIG.site.name} application loaded. Press Tab to navigate.`);
  }

  /**
   * Handle critical application errors
   */
  handleCriticalError(error) {
    const errorMessage = 'Application encountered a critical error. Please refresh the page.';

    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      right: 20px;
      background: #ff2d55;
      color: white;
      padding: 20px;
      border-radius: 18px;
      border: 4px solid #1b1b1f;
      box-shadow: 0 14px 0 rgba(0,0,0,.55);
      z-index: 1000;
      font-family: Impact, Arial, sans-serif;
      text-transform: uppercase;
      text-align: center;
    `;
    errorDiv.textContent = errorMessage;
    document.body.appendChild(errorDiv);

    // Announce to screen readers
    announceToScreenReader(errorMessage, 'assertive');

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 10000);
  }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new NFTSOLApp();
  });
} else {
  new NFTSOLApp();
}

// ChatGPT-Style Meme Generator Functionality
function initMemeGenerator() {
  const generateBtn = document.getElementById('generateBtn');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const memeDisplay = document.getElementById('memeDisplay');
  const memeQuote = document.getElementById('memeQuote');
  const memeCount = document.getElementById('memeCount');

  if (!generateBtn || !chatInput || !chatMessages) return;

  const maduroQuotes = [
    '"LOS VENEZOLANOS SOMOS TAN RICOS QUE EXPORTAMOS... ¡INTELIGENCIA!"',
    '"EL IMPERIALISMO NORTEAMERICANO NOS ATACA CON SU ARMA QUÍMICA: ¡EL DIÓXIDO DE CLORO!"',
    '"TENEMOS QUE COMBATIR EL VIRUS DEL CAPITALISMO SALVAJE"',
    '"VENEZUELA ES EL PAÍS MÁS SEGURO DEL MUNDO, NO HAY DELINCUENCIA"',
    '"LOS GRINGOS NOS ATACAN CON SUS AVIONES ESPÍA... ¡INVISIBLES!"',
    '"EL PETRÓLEO LO INVENTÓ CHÁVEZ PARA SALVAR A VENEZUELA"',
    '"LAS ELECCIONES SON UN FRAUDE... PERO LAS NUESTRAS SON LEGÍTIMAS"',
    '"TENEMOS LA MEJOR ECONOMÍA DEL MUNDO, SOLO QUE LOS GRINGOS NO LO SABEN"',
    '"LOS VENEZOLANOS COMEMOS TRES VECES AL DÍA... ¡CUANDO PODEMOS!"',
    '"EL SOCIALISMO ES PERFECTO, EL PROBLEMA ES QUE NO LO HEMOS APLICADO BIEN"',
    '"LOS GRINGOS NOS ENVIAN HURACANES PARA DESTRUIR NUESTRAS COSECHAS"',
    '"VENEZUELA EXPORTA MÁS DEMOCRACIA QUE CUALQUIER OTRO PAÍS"',
    '"EL CAPITALISMO ES UN VIRUS MORTAL... PERO NOSOTROS TENEMOS LA VACUNA"',
    '"LOS VENEZOLANOS SOMOS FELICES, SOLO QUE NO LO DEMOSTRAMOS"',
    '"CHÁVEZ ME VISITA EN SUEÑOS PARA DARME CONSEJOS DE GOBIERNO"'
  ];

  let generatedCount = 0;

  // Function to add a message to chat
  function addMessage(content, type = 'ai', username = null) {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = `message-wrapper ${type}-message`;

    if (type === 'user') {
      const displayName = username || 'You';
      const initials = displayName.charAt(0).toUpperCase();
      messageWrapper.innerHTML = `
        <div class="message-avatar">
          <div class="user-avatar">${initials}</div>
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-username">${displayName}</span>
          </div>
          <div class="message-text">${content}</div>
        </div>
      `;
    } else if (type === 'system') {
      messageWrapper.innerHTML = `
        <div class="message-content">
          <div class="message-text">${content}</div>
        </div>
      `;
    } else {
      // For AI messages, check if content contains HTML (meme content)
      const isHtmlContent = content.includes('<p') || content.includes('<div') || content.includes('<img');
      const messageContent = isHtmlContent ? content : `<div class="message-text">${content}</div>`;

      messageWrapper.innerHTML = `
        <div class="message-avatar">
          <div class="chatgpt-icon-small">🤖</div>
        </div>
        <div class="message-content">
          <div class="message-header">
            <span class="message-username">MaduroMemeBot</span>
          </div>
          ${messageContent}
        </div>
      `;
    }

    chatMessages.appendChild(messageWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Array of available images
  const availableImages = [
    '60d0b8a797da9.jpeg',
    '66a699e108aecf689171506d.png',
    '9b6bd9d6a0a6229b7001af08411bba61.jpg',
    'A53Z5CMT3VAU5APSRXVYXYWZDE.jpg',
    'B_4NnE4wM_720x0__1.jpg',
    'b43823c263c24d9e2f88a44b2f8edd32.jpg',
    'G9u1SGPWcAARlb0.jpg',
    'G9yuqqcX0AEJtae.jpg',
    'images (1).jpg',
    'images (2).jpg',
    'images.jpg',
    'los-mejores-memes-y-reacciones-en-redes-sociales-tras-la-captura-de-nicolas-maduro-por-ee-uu.webp',
    'los-memes-que-dej-la-captura-de-nicols-maduro_317392782_760x520.jpeg',
    'memes-de-nicolas-maduro.jpg'
  ];

  // Typing indicator messages
  const typingMessages = [
    "🤖 Pensando en memes épicos...",
    "🤖 Buscando frases de Maduro...",
    "🤖 Generando contenido viral...",
    "🤖 Maduro estaría orgulloso...",
    "🤖 Preparando la revolución meme...",
    "🤖 Conectando con el Palacio de Miraflores...",
    "🤖 Hackeando el sistema capitalista...",
    "🤖 Cocinando memes frescos...",
  ];

  // Function to generate meme
  function generateMeme(prompt = '', type = 'text') {
    let selectedQuote;
    let selectedImage = null;

    if (type === 'image') {
      // For image memes, select a random image
      selectedImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    }

    if (prompt.toLowerCase().includes('gracioso') || prompt.toLowerCase().includes('funny')) {
      // Funniest quotes
      const funnyQuotes = [
        '"LOS VENEZOLANOS SOMOS TAN RICOS QUE EXPORTAMOS... ¡INTELIGENCIA!"',
        '"LOS GRINGOS NOS ATACAN CON SUS AVIONES ESPÍA... ¡INVISIBLES!"',
        '"TENEMOS LA MEJOR ECONOMÍA DEL MUNDO, SOLO QUE LOS GRINGOS NO LO SABEN"'
      ];
      selectedQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
    } else if (prompt.toLowerCase().includes('político') || prompt.toLowerCase().includes('political')) {
      // Most political quotes
      const politicalQuotes = [
        '"LAS ELECCIONES SON UN FRAUDE... PERO LAS NUESTRAS SON LEGÍTIMAS"',
        '"VENEZUELA EXPORTA MÁS DEMOCRACIA QUE CUALQUIER OTRO PAÍS"',
        '"EL CAPITALISMO ES UN VIRUS MORTAL... PERO NOSOTROS TENEMOS LA VACUNA"'
      ];
      selectedQuote = politicalQuotes[Math.floor(Math.random() * politicalQuotes.length)];
    } else {
      // Random quote
      selectedQuote = maduroQuotes[Math.floor(Math.random() * maduroQuotes.length)];
    }

    // Show typing indicator with rotating messages
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message-wrapper ai-message';
    typingIndicator.innerHTML = `
      <div class="message-avatar">
        <div class="chatgpt-icon-small">🤖</div>
      </div>
      <div class="message-content">
        <div class="message-text">${typingMessages[0]}</div>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Rotate typing messages
    let messageIndex = 0;
    const typingInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % typingMessages.length;
      const typingText = typingIndicator.querySelector('.message-text');
      if (typingText) {
        typingText.textContent = typingMessages[messageIndex];
      }
    }, 800);

    // Simulate typing delay
    setTimeout(() => {
      clearInterval(typingInterval);
      chatMessages.removeChild(typingIndicator);

      // Create meme content HTML
      let memeHtml;
      if (type === 'image' && selectedImage) {
        // For image memes, show image + text
        memeHtml = `
          <div style="text-align: center; margin-bottom: 12px;">
            <img src="/nfts/${selectedImage}" alt="Maduro Meme" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          </div>
          <p class="meme-quote" style="margin: 10px 0; color: #ffffff; font-size: 16px; line-height: 1.4;">${selectedQuote}</p>
          <p class="meme-author" style="margin: 8px 0 0 0; color: #888888; font-size: 12px;">- Nicolás Maduro</p>
          <div style="display: flex; gap: 8px; margin-top: 12px; justify-content: center;">
            <button class="meme-action-btn" onclick="copyMeme('${selectedQuote}')">📋 Copy</button>
            <button class="meme-action-btn" onclick="shareMeme('${selectedQuote}')">🔗 Share</button>
          </div>
        `;
      } else {
        // For text memes, show only text
        memeHtml = `
          <p class="meme-quote" style="margin: 10px 0; color: #ffffff; font-size: 16px; line-height: 1.4;">${selectedQuote}</p>
          <p class="meme-author" style="margin: 8px 0 0 0; color: #888888; font-size: 12px;">- Nicolás Maduro</p>
          <div style="display: flex; gap: 8px; margin-top: 12px; justify-content: center;">
            <button class="meme-action-btn" onclick="copyMeme('${selectedQuote}')">📋 Copy</button>
            <button class="meme-action-btn" onclick="shareMeme('${selectedQuote}')">🔗 Share</button>
          </div>
        `;
      }

      // Add AI response message with meme
      addMessage(memeHtml, 'ai');

      generatedCount++;
      memeCount.textContent = generatedCount;

    }, 1500);
  }

  // Handle generate button click
  generateBtn.addEventListener('click', () => {
    const prompt = chatInput.value.trim();

    if (prompt) {
      // Add user message
      addMessage(prompt, 'user');
      chatInput.value = '';

      // Generate response (default to text)
      generateMeme(prompt, 'text');
    } else {
      // Generate random meme
      generateMeme('', 'text');
    }
  });

  // Handle Enter key in input
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (message) {
        addMessage(message, 'user', 'You');
        chatInput.value = '';
        // Generate response after a short delay
        setTimeout(() => {
          generateMeme(message, 'text');
        }, 1000);
      }
    }
  });

  // Handle quick option buttons
  document.querySelectorAll('.command-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset.prompt;
      const type = btn.dataset.type;

      // Update input
      chatInput.value = prompt;

      // Add user message first
      addMessage(prompt, 'user');

      // Generate AI response after a short delay
      setTimeout(() => {
        generateMeme(prompt, type || 'text');
      }, 1000); // Show AI response 1 second after user message
    });
  });

  // Handle copy button
  document.getElementById('copyMemeBtn')?.addEventListener('click', async () => {
    const quote = memeQuote.textContent;
    const fullMeme = `${quote} - Nicolás Maduro #NFT #NIGHFLEECETECH #NFTSOL`;

    try {
      await navigator.clipboard.writeText(fullMeme);

      // Visual feedback
      const btn = document.getElementById('copyMemeBtn');
      const originalText = btn.textContent;
      btn.textContent = '✅ Copiado!';
      btn.style.background = 'rgba(22, 163, 74, 0.2)';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 2000);

      announceToScreenReader('Meme copied to clipboard');

    } catch (err) {
      console.error('Failed to copy meme:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullMeme;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      announceToScreenReader('Meme copied to clipboard');
    }
  });

  // Handle share button
  document.getElementById('shareMemeBtn')?.addEventListener('click', () => {
    const quote = memeQuote.textContent;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} - Nicolás Maduro #NFT #NIGHFLEECETECH #NFTSOL`)}`;

    window.open(shareUrl, '_blank');
    announceToScreenReader('Opening Twitter share dialog');
  });

  // Global functions for meme actions
  window.copyMeme = function(quote) {
    const fullMeme = `${quote} - Nicolás Maduro #NFT #NIGHFLEECETECH #NFTSOL`;
    navigator.clipboard.writeText(fullMeme).then(() => {
      announceToScreenReader('Meme copied to clipboard');
    });
  };

  window.shareMeme = function(quote) {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} - Nicolás Maduro #NFT #NIGHFLEECETECH #NFTSOL`)}`;
    window.open(shareUrl, '_blank');
    announceToScreenReader('Opening Twitter share dialog');
  };

  // Handle reaction buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('reaction-btn')) {
      const reaction = e.target.dataset.reaction;
      const button = e.target;

      // Remove active class from all buttons
      document.querySelectorAll('.reaction-btn').forEach(btn => {
        btn.classList.remove('active');
      });

      // Add active class to clicked button
      button.classList.add('active');

      // Show reaction feedback
      addMessage(`Reacted with ${reaction} to the meme!`, 'system');

      // Remove active state after 2 seconds
      setTimeout(() => {
        button.classList.remove('active');
      }, 2000);

      announceToScreenReader(`Reacted with ${reaction}`);
    }
  });
}

// Live Chat Comments Functionality (simplified)
function initLiveChat() {
  const chatOverlay = document.getElementById('liveChatOverlay');
  if (!chatOverlay) return;

  const usernames = [
    'Trump2026Fan', 'MAGA_Patriot', 'CryptoKing', 'DiamondHands',
    'FreedomFighter', 'BasedChad', 'LibertyLover', 'AmericanEagle',
    'MaduroHater', 'DictatorHunter', 'FreedomBell', 'PatriotPower'
  ];

  const messages = [
    'NIKE FLEECE TECH $NFT incoming!', 'Maduro\'s worst nightmare: Daddy Trump!',
    'Venezuela LIBRE with $NFT power!', 'TRUMP 2026: Making America fleece again!',
    'Maduro thought he could escape... but $NFT had other plans!', 'America First, Fleece Forever!',
    'DICTATOR DOWN! $NFT UP!', 'Trump\'s Fleece: The ultimate flex!',
    'Patriots in $NFT: The new revolution!', 'LIBERTY BELL with $NFT!',
    'Trump captured Maduro, $NFT captures hearts!', 'Venezuela rises with Trump\'s Fleece!'
  ];

  let activeComments = 0;
  const maxComments = 4;

  function createComment() {
    if (activeComments >= maxComments) return;

    const username = usernames[Math.floor(Math.random() * usernames.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    const comment = document.createElement('div');
    comment.className = 'live-chat-comment';
    comment.textContent = `${username}: ${message}`;
    comment.style.animationDelay = `${Math.random() * 2}s`;

    const verticalPosition = activeComments * 45;
    comment.style.bottom = `-${30 + verticalPosition}px`;

    chatOverlay.appendChild(comment);
    activeComments++;

    setTimeout(() => {
      if (comment.parentNode) {
        comment.parentNode.removeChild(comment);
      }
      activeComments--;
    }, 4000);
  }

  function startChat() {
    setTimeout(createComment, 1000);
    setTimeout(createComment, 2000);
    setTimeout(createComment, 3500);

    function scheduleNextComment() {
      const delay = 2000 + Math.random() * 3000;
      setTimeout(() => {
        if (Math.random() < 0.6) {
          createComment();
        }
        scheduleNextComment();
      }, delay);
    }
    scheduleNextComment();
  }

  startChat();
}

// Contract Address Copy Functionality
function initContractCopy() {
  const copyBtn = document.getElementById('copyBtn');
  const contractAddress = document.getElementById('contractAddress');

  if (copyBtn && contractAddress) {
    copyBtn.addEventListener('click', async () => {
      const address = contractAddress.textContent;

      try {
        await navigator.clipboard.writeText(address);

        // Visual feedback
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        `;

        // Announce to screen reader
        announceToScreenReader('Contract address copied to clipboard');

        // Reset after 2 seconds
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          `;
        }, 2000);

      } catch (err) {
        console.error('Failed to copy contract address:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        announceToScreenReader('Contract address copied to clipboard');
      }
    });
  }
}

// Visit Counter Functionality
function initVisitCounter() {
  const viewersElement = document.querySelector('.stream-status');
  if (!viewersElement) return;

  // Get current visit count from localStorage
  let visitCount = parseInt(localStorage.getItem('maduroMemes_visits')) || 0;

  // Increment visit count
  visitCount++;

  // Save back to localStorage
  localStorage.setItem('maduroMemes_visits', visitCount);

  // Format the count
  function formatCount(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k views';
    } else {
      return count + ' views';
    }
  }

  // Update the display
  viewersElement.textContent = formatCount(visitCount) + ' • memes & chaos';

  // Add some random fluctuation every few minutes to simulate live viewers
  setInterval(() => {
    const randomChange = Math.floor(Math.random() * 21) - 10; // -10 to +10
    const currentCount = parseInt(localStorage.getItem('maduroMemes_visits')) || 0;
    const newCount = Math.max(1, currentCount + randomChange);

    localStorage.setItem('maduroMemes_visits', newCount);
    viewersElement.textContent = formatCount(newCount) + ' • memes & chaos';
  }, 300000); // Update every 5 minutes
}

// Random Chat Messages Functionality
function initRandomChatMessages() {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  // Array of random users and messages
  const randomUsers = [
    'MaduroFan123', 'VenezuelaLibre', 'CryptoKing', 'MemeLord', 'DictatorHunter',
    'FreedomFighter', 'BasedChad', 'LibertyLover', 'PatriotPower', 'RevolutionNow',
    'ChavezGhost', 'SocialismSucks', 'DollarDreams', 'ExileVoice', 'BorderCrosser'
  ];

  const randomMessages = [
    'This is hilarious 😂', 'Maduro when he sees Trump 😂😂', 'Best meme ever!', 'LMAO', 'Dead 💀',
    '!meme', 'More memes please!', 'This is gold 🏆', 'Priceless 🤣', 'Legendary meme',
    'Maduro crying rn 😂', 'Trump 2024!', 'Freedom wins!', 'Beautiful 🇻🇪', 'Absolute cinema 🎥',
    'This slaps 🔥', 'Chef\'s kiss 👨‍🍳', 'Maduro\'s face 😂', 'Can\'t stop laughing', 'Too real 🤣',
    'Maduro\'s worst nightmare', 'Trump vibes 💪', 'Venezuela rising! 🇻🇪', 'This is fire 🔥', 'Classic 😂'
  ];

  function addRandomMessage() {
    const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
    const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];

    addMessage(randomMessage, 'user', randomUser);

    // Remove old messages to keep chat clean (keep only last 15)
    const allMessages = chatMessages.querySelectorAll('.message-wrapper');
    if (allMessages.length > 20) {
      allMessages[0].remove();
    }
  }

  function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Add random messages every 8-15 seconds
  function scheduleRandomMessage() {
    const delay = 8000 + Math.random() * 7000; // 8-15 seconds
    setTimeout(() => {
      addRandomMessage();
      scheduleRandomMessage(); // Schedule next message
    }, delay);
  }

  // Start after initial delay
  setTimeout(() => {
    scheduleRandomMessage();
  }, 3000);
}

// Initialize contract copy functionality
initContractCopy();

// Initialize meme generator functionality
initMemeGenerator();

// Initialize live chat functionality
initLiveChat();

// Initialize visit counter
initVisitCounter();

// Initialize random chat messages
initRandomChatMessages();

// Export for debugging (only in development)
if (import.meta.env.DEV) {
  window.NFTSOL = {
    CONFIG,
    breakingNewsGenerator,
    actions
  };
}

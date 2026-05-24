/**
 * Bhaveek Portfolio - Main JavaScript
 * Copyright © 2025 Bhaveek. All Rights Reserved.
 * Unauthorized reproduction or distribution is prohibited.
 */

'use strict';

/* ============================================================
   CURSOR GLOW
   ============================================================ */
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }
});

/* ============================================================
   PARTICLES
   ============================================================ */
(function initParticles() {
  const bg = document.getElementById('particles-bg');
  if (!bg) return;
  const colors = ['rgba(168,85,247,0.4)', 'rgba(6,182,212,0.35)', 'rgba(245,158,11,0.3)', 'rgba(168,85,247,0.25)'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    Object.assign(p.style, {
      width: size + 'px',
      height: size + 'px',
      left: left + '%',
      background: color,
      animationDuration: duration + 's',
      animationDelay: delay + 's'
    });
    bg.appendChild(p);
  }
})();

/* ============================================================
   NAVBAR
   ============================================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  updateActiveNav();
  updateScrollTop();
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

/* ============================================================
   TYPED TEXT EFFECT
   ============================================================ */
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const phrases = [
    'Web Developer',
    '3D Artist & Blender User',
    'Cyber Security Enthusiast',
    'Game Developer',
    'BCA Cyber Security Student',
    'Self-Taught Creator'
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;
  const TYPE_SPEED = 80, DELETE_SPEED = 45, PAUSE = 1800;

  function tick() {
    const current = phrases[phraseIdx];
    if (deleting) {
      el.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
    }
    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }
  setTimeout(tick, 800);
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function initReveal() {
  const targets = document.querySelectorAll('.section-header, .about-content, .skill-card, .project-card, .timeline-item, .edu-card, .cert-card, .contact-content, .stat-card, .about-stats');
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    if (el.closest('.skills-grid') || el.closest('.projects-grid') || el.closest('.certs-grid')) {
      el.style.transitionDelay = (i % 8) * 0.07 + 's';
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
        // Animate skill bars when revealed
        const fills = e.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          const w = fill.dataset.width || 0;
          setTimeout(() => { fill.style.width = w + '%'; }, 200);
        });
        // Animate stat numbers
        const statNums = e.target.querySelectorAll('.stat-number[data-target]');
        statNums.forEach(num => animateCounter(num));
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));

  // Animate skill bars in active tab on load
  setTimeout(() => {
    document.querySelectorAll('.skill-panel.active .skill-fill').forEach(fill => {
      fill.style.width = (fill.dataset.width || 0) + '%';
    });
  }, 600);
})();

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = Date.now();
  const timer = setInterval(() => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress >= 1) clearInterval(timer);
  }, 16);
}

/* ============================================================
   SKILLS TABS
   ============================================================ */
document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const panel = tab.dataset.tab;
    document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const activePanel = document.querySelector(`.skill-panel[data-panel="${panel}"]`);
    if (activePanel) {
      activePanel.classList.add('active');
      // Animate skill bars in newly shown tab
      setTimeout(() => {
        activePanel.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = '0';
          setTimeout(() => { fill.style.width = (fill.dataset.width || 0) + '%'; }, 50);
        });
      }, 50);
    }
  });
});

/* ============================================================
   PROJECTS FILTER
   ============================================================ */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      const cat = card.dataset.category;
      const match = filter === 'all' || cat === filter;
      card.style.display = match ? '' : 'none';
      if (match) card.style.animation = 'fade-in-up 0.4s ease both';
    });
  });
});

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const data = {
      name: document.getElementById('form-name').value.trim(),
      email: document.getElementById('form-email').value.trim(),
      subject: document.getElementById('form-subject').value.trim(),
      message: document.getElementById('form-message').value.trim()
    };

    // Simulate sending (replace with Formspree/EmailJS in production)
    await new Promise(r => setTimeout(r, 1500));

    formStatus.className = 'form-status success';
    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent! I\'ll get back to you soon.';
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

    setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 6000);
  });
}

/* ============================================================
   SCROLL TO TOP
   ============================================================ */
const scrollTopBtn = document.getElementById('scroll-top');

function updateScrollTop() {
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   CHATBOT
   ============================================================ */
const chatbotKnowledge = {
  skills: `Bhaveek's core skills include:\n• **Web Dev**: HTML5, CSS3, JavaScript, Node.js, UI Design\n• **Creative**: Blender 3D (4+ years), Game Dev (HTML5 Canvas), 3D Rendering\n• **Languages**: JavaScript, Python, Java, C, C#, Bash\n• **Tools**: Git, GitHub, VS Code, Blender, Figma, Chrome DevTools\n• **Security**: OSINT basics, ethical hacking concepts, network security fundamentals`,
  projects: `Here are Bhaveek's 6 real projects:\n\n1. **⚡ Cyber Runner** — HTML5 Canvas endless runner game with particles & neon UI\n2. **🤖 NeuroChat AI** — Chatbot with regex intent detection & dark/light themes\n3. **📊 Pulse Analytics** — Animated analytics dashboard using Chart.js\n4. **📈 MarketMind Bot** — Simulated crypto/stock terminal in cyberpunk style\n5. **🤖 Portfolio Assistant** — Drop-in floating AI widget for portfolio sites\n6. **🎨 Neo3D Showcase** — Interactive 3D art gallery for Blender renders\n\n👉 GitHub: [github.com/Bhaveek08](https://github.com/Bhaveek08)`,
  experience: `Bhaveek's authentic experience:\n\n• **Freelance Developer & 3D Artist** (2023–Present) — Web dev, UI design, Blender projects\n• **Community Project Collaborator** (2022–Present) — Discord tools, mini-games, open source\n• **Self-Taught Developer Journey** (2020–Present) — Python, game dev, Minecraft mods, cybersecurity`,
  contact: `You can reach Bhaveek at:\n\n📧 **Email**: tarushagrawal5@gmail.com\n🐙 **GitHub**: [github.com/Bhaveek08](https://github.com/Bhaveek08)\n📍 **Location**: India 🇮🇳\n\nBhaveek is open to collaborations and freelance projects!`,
  education: `Bhaveek's education:\n\n🎓 **BCA in Cyber Security** — MIT-WPU (MIT World Peace University, Pune) — Starting 2025 (1st Year)\n📚 **12th Grade (Science/PCM + Computer Science)** — Currently Completing\n📜 MIT-WPU Summer Camp Certificates: App Development & AI Chatbot Development (2024)`,
  certifications: `Bhaveek's real certifications:\n\n• MIT-WPU Summer Camp — App Development (2024)\n• MIT-WPU Summer Camp — AI Chatbot Dev (2024)\n• Responsive Web Design — freeCodeCamp (2023)\n• Intro to Cyber Security — Cisco Networking Academy (2023)\n• Python Basics — Kaggle/Coursera (2022)\n• JavaScript Algorithms & Data Structures — freeCodeCamp (2023)`,
  about: `Bhaveek Agrawal is a self-taught developer and 3D artist from India. He's currently in 12th grade and soon joining **MIT-WPU for BCA in Cyber Security**. He started coding in middle school after discovering Python, and has since built games, chatbots, analytics dashboards, 3D models, and security tools — all through curiosity and hands-on experimentation.`,
  hire: `Bhaveek is **open to collaborate**! He's available for:\n• Freelance web or UI projects\n• Creative tech collaborations\n• Community open-source contributions\n\nContact: tarushagrawal5@gmail.com`,
  blender: `Bhaveek has **4+ years of Blender experience**! He creates:\n• Cyberpunk city environments\n• Hard-surface mechanical models\n• Abstract geometry node art\n• Character designs & renders\n\nCheck out Neo3D Showcase for his work!`,
  github: `Explore Bhaveek's code on:\n🐙 [github.com/Bhaveek08](https://github.com/Bhaveek08)`
};

const chatbotResponses = [
  { keys: ['skill', 'know', 'tech', 'stack', 'programming', 'language', 'frontend', 'backend', 'database'], response: chatbotKnowledge.skills },
  { keys: ['project', 'built', 'work', 'portfolio', 'app', 'application', 'website', 'game', 'runner', 'chat', 'dashboard', 'market', 'showcase'], response: chatbotKnowledge.projects },
  { keys: ['experience', 'job', 'career', 'work history', 'intern', 'company', 'freelance', 'journey'], response: chatbotKnowledge.experience },
  { keys: ['contact', 'email', 'reach', 'hire', 'message', 'get in touch'], response: chatbotKnowledge.contact },
  { keys: ['education', 'college', 'degree', 'university', 'study', 'qualification', 'school', 'bca', 'mit-wpu', 'cyber security course', 'pune'], response: chatbotKnowledge.education },
  { keys: ['certificate', 'certification', 'credential', 'mit-wpu', 'cisco', 'freecodecamp', 'kaggle', 'course', 'achievement'], response: chatbotKnowledge.certifications },
  { keys: ['about', 'who', 'bhaveek', 'tell me', 'yourself', 'introduce', 'bio', 'background'], response: chatbotKnowledge.about },
  { keys: ['hire', 'available', 'opportunity', 'open to work', 'collab', 'collaborate', 'recruit'], response: chatbotKnowledge.hire },
  { keys: ['blender', '3d', 'model', 'render', 'art', 'neo3d', 'design'], response: chatbotKnowledge.blender },
  { keys: ['github', 'repo', 'code', 'open source', 'repository'], response: chatbotKnowledge.github },
  { keys: ['hello', 'hi', 'hey', 'greet', 'good morning', 'good evening', 'howdy'], response: `Hi there! 👋 I'm Bhaveek's AI assistant. Ask me about his projects, skills, education (BCA Cyber Security at MIT-WPU!), or how to contact him!` },
  { keys: ['thank', 'thanks', 'appreciate', 'awesome', 'great', 'cool', 'nice'], response: `You're welcome! 😊 Is there anything else you'd like to know about Bhaveek?` },
  { keys: ['bye', 'goodbye', 'see you', 'later', 'cya'], response: `Goodbye! 👋 Feel free to come back anytime. Keep building cool things!` }
];

function getChatbotReply(userMsg) {
  const msg = userMsg.toLowerCase().trim();
  for (const item of chatbotResponses) {
    if (item.keys.some(k => msg.includes(k))) {
      return item.response;
    }
  }
  return `That's an interesting question! I'm primarily trained to answer questions about Bhaveek's skills, projects, experience, education, and contact info. Try asking me about:\n• His skills or tech stack\n• His projects\n• His work experience\n• How to contact him`;
}

function renderBotMessage(text) {
  const messages = document.getElementById('chatbot-messages');
  if (!messages) return;
  // Remove suggestions if present
  const suggestions = messages.querySelector('.chatbot-suggestions');
  if (suggestions) suggestions.remove();

  // Typing indicator
  const typingWrap = document.createElement('div');
  typingWrap.className = 'chatbot-msg bot';
  typingWrap.innerHTML = `<div class="msg-avatar"><i class="fas fa-robot"></i></div><div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  messages.appendChild(typingWrap);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    typingWrap.remove();
    const msg = document.createElement('div');
    msg.className = 'chatbot-msg bot';
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--primary-light);text-decoration:underline">$1</a>')
      .replace(/\n/g, '<br>');
    msg.innerHTML = `<div class="msg-avatar"><i class="fas fa-robot"></i></div><div class="msg-bubble">${formatted}</div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }, 900 + Math.random() * 500);
}

function sendUserMessage(text) {
  const messages = document.getElementById('chatbot-messages');
  if (!messages || !text.trim()) return;
  const msg = document.createElement('div');
  msg.className = 'chatbot-msg user';
  msg.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-avatar"><i class="fas fa-user"></i></div>`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
  renderBotMessage(getChatbotReply(text));
}

window.sendSuggestion = function(btn) {
  const text = btn.textContent;
  btn.closest('.chatbot-suggestions')?.remove();
  sendUserMessage(text);
};

const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotIconOpen = document.querySelector('.chatbot-icon-open');
const chatbotIconClose = document.querySelector('.chatbot-icon-close');

function openChatbot() {
  chatbotWindow.classList.add('open');
  if (chatbotIconOpen) chatbotIconOpen.style.display = 'none';
  if (chatbotIconClose) chatbotIconClose.style.display = 'inline';
  chatbotInput?.focus();
}

function closeChatbot() {
  chatbotWindow.classList.remove('open');
  if (chatbotIconOpen) chatbotIconOpen.style.display = 'inline';
  if (chatbotIconClose) chatbotIconClose.style.display = 'none';
}

if (chatbotToggle) chatbotToggle.addEventListener('click', () => {
  chatbotWindow.classList.contains('open') ? closeChatbot() : openChatbot();
});

if (chatbotClose) chatbotClose.addEventListener('click', closeChatbot);

if (chatbotSend) chatbotSend.addEventListener('click', () => {
  const val = chatbotInput.value.trim();
  if (val) { sendUserMessage(val); chatbotInput.value = ''; }
});

if (chatbotInput) {
  chatbotInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const val = chatbotInput.value.trim();
      if (val) { sendUserMessage(val); chatbotInput.value = ''; }
    }
  });
}

/* ============================================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ============================================================
   INITIALIZE
   ============================================================ */
updateActiveNav();
updateScrollTop();

console.log('%c© 2025 Bhaveek. All Rights Reserved.', 'color:#a855f7;font-size:14px;font-weight:bold;');
console.log('%cThis portfolio is protected by copyright law. Unauthorized reproduction is prohibited.', 'color:#94a3b8;font-size:11px;');

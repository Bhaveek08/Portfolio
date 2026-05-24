/**
 * Bhaveek Portfolio - Security Script
 * Copyright © 2025 Bhaveek. All Rights Reserved.
 * This script implements anti-theft and copyright protection measures.
 * Unauthorized reproduction, distribution, or modification is strictly prohibited.
 */

(function () {
  'use strict';

  /* ── Copyright Notice ── */
  const COPYRIGHT = '© 2025 Bhaveek | All Rights Reserved | Unauthorized use is prohibited.';

  /* ──────────────────────────────────────────────────────────
     1. DISABLE RIGHT-CLICK CONTEXT MENU
  ────────────────────────────────────────────────────────── */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showSecurityAlert('Right-click is disabled to protect this content.');
  });

  /* ──────────────────────────────────────────────────────────
     2. DISABLE KEYBOARD SHORTCUTS (DevTools / Copy / Save)
  ────────────────────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;

    // F12
    if (e.key === 'F12') { e.preventDefault(); showSecurityAlert('Developer tools are disabled.'); return; }

    // Ctrl+Shift+I  (DevTools)
    if (ctrl && shift && key === 'i') { e.preventDefault(); showSecurityAlert('Developer tools are disabled.'); return; }

    // Ctrl+Shift+J  (Console)
    if (ctrl && shift && key === 'j') { e.preventDefault(); showSecurityAlert('Developer tools are disabled.'); return; }

    // Ctrl+Shift+C  (Element Inspector)
    if (ctrl && shift && key === 'c') { e.preventDefault(); showSecurityAlert('Developer tools are disabled.'); return; }

    // Ctrl+Shift+K  (Firefox Console)
    if (ctrl && shift && key === 'k') { e.preventDefault(); showSecurityAlert('Developer tools are disabled.'); return; }

    // Ctrl+U  (View Source)
    if (ctrl && key === 'u') { e.preventDefault(); showSecurityAlert('Viewing source is disabled.'); return; }

    // Ctrl+S  (Save Page)
    if (ctrl && key === 's') { e.preventDefault(); showSecurityAlert('Saving this page is not permitted.'); return; }

    // Ctrl+A  (Select All)
    if (ctrl && key === 'a') { e.preventDefault(); return; }

    // Ctrl+C  (Copy)
    if (ctrl && key === 'c') { e.preventDefault(); showSecurityAlert('Copying content is not permitted.'); return; }

    // Ctrl+P  (Print)
    if (ctrl && key === 'p') { e.preventDefault(); showSecurityAlert('Printing is disabled.'); return; }
  });

  /* ──────────────────────────────────────────────────────────
     3. DISABLE TEXT SELECTION & DRAG
  ────────────────────────────────────────────────────────── */
  document.addEventListener('selectstart', function (e) { e.preventDefault(); });
  document.addEventListener('dragstart', function (e) { e.preventDefault(); });
  document.addEventListener('copy', function (e) { e.preventDefault(); });
  document.addEventListener('cut', function (e) { e.preventDefault(); });

  /* ──────────────────────────────────────────────────────────
     4. DEVTOOLS DETECTION (size-based heuristic)
  ────────────────────────────────────────────────────────── */
  let devtoolsOpen = false;
  const threshold = 160;

  function checkDevTools() {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > threshold || heightDiff > threshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        showDevtoolsWarning();
      }
    } else {
      devtoolsOpen = false;
    }
  }

  setInterval(checkDevTools, 1000);

  /* ──────────────────────────────────────────────────────────
     5. SECURITY ALERT UI
  ────────────────────────────────────────────────────────── */
  let alertVisible = false;

  function showSecurityAlert(msg) {
    if (alertVisible) return;
    alertVisible = true;

    const overlay = document.createElement('div');
    overlay.id = 'security-overlay';
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', zIndex: '99999',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    });

    const box = document.createElement('div');
    Object.assign(box.style, {
      background: 'linear-gradient(135deg,#1a0a2e,#0d1117)',
      border: '1px solid rgba(168,85,247,0.5)',
      borderRadius: '16px', padding: '2rem 2.5rem',
      textAlign: 'center', maxWidth: '380px',
      boxShadow: '0 0 60px rgba(168,85,247,0.3)',
      fontFamily: "'Outfit', sans-serif", color: '#f1f5f9'
    });

    box.innerHTML = `
      <div style="font-size:2.5rem;margin-bottom:0.75rem">🔒</div>
      <div style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;color:#c084fc">Access Restricted</div>
      <div style="font-size:0.88rem;color:#94a3b8;line-height:1.7;margin-bottom:1.25rem">${msg}</div>
      <div style="font-size:0.72rem;color:#64748b;margin-bottom:1.25rem">${COPYRIGHT}</div>
      <button id="sec-dismiss" style="background:linear-gradient(135deg,#a855f7,#06b6d4);color:#fff;border:none;padding:0.6rem 1.5rem;border-radius:8px;font-size:0.88rem;font-weight:600;cursor:pointer;font-family:inherit">
        Dismiss
      </button>`;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('sec-dismiss').addEventListener('click', () => {
      overlay.remove();
      alertVisible = false;
    });

    setTimeout(() => { if (overlay.parentNode) { overlay.remove(); alertVisible = false; } }, 4000);
  }

  function showDevtoolsWarning() {
    if (alertVisible) return;
    alertVisible = true;

    const overlay = document.createElement('div');
    overlay.id = 'devtools-overlay';
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', zIndex: '99999',
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    });

    const box = document.createElement('div');
    Object.assign(box.style, {
      background: 'linear-gradient(135deg,#1a0a2e,#0d1117)',
      border: '1px solid rgba(239,68,68,0.5)',
      borderRadius: '16px', padding: '2rem 2.5rem',
      textAlign: 'center', maxWidth: '420px',
      boxShadow: '0 0 60px rgba(239,68,68,0.3)',
      fontFamily: "'Outfit', sans-serif", color: '#f1f5f9'
    });

    box.innerHTML = `
      <div style="font-size:2.5rem;margin-bottom:0.75rem">⚠️</div>
      <div style="font-size:1.15rem;font-weight:700;margin-bottom:0.5rem;color:#f87171">Developer Tools Detected</div>
      <div style="font-size:0.88rem;color:#94a3b8;line-height:1.7;margin-bottom:1rem">
        This portfolio is protected by copyright law. Using developer tools to inspect, copy, or reproduce 
        any part of this site without permission is strictly prohibited.
      </div>
      <div style="font-size:0.72rem;color:#64748b;margin-bottom:1.25rem">${COPYRIGHT}</div>
      <button id="dt-dismiss" style="background:linear-gradient(135deg,#ef4444,#f97316);color:#fff;border:none;padding:0.6rem 1.5rem;border-radius:8px;font-size:0.88rem;font-weight:600;cursor:pointer;font-family:inherit">
        I Understand
      </button>`;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('dt-dismiss').addEventListener('click', () => {
      overlay.remove();
      alertVisible = false;
    });
  }

  /* ──────────────────────────────────────────────────────────
     6. WATERMARK ON CONSOLE OPEN
  ────────────────────────────────────────────────────────── */
  const devtools = { open: false, orientation: undefined };
  const emitEvent = (state, orientation) => {
    window.dispatchEvent(new CustomEvent('devtoolschange', { detail: { open: state, orientation } }));
  };

  const main = ({ emitEvents = true } = {}) => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    const orientation = widthThreshold ? 'vertical' : 'horizontal';

    if (!(heightThreshold && widthThreshold)) {
      if (!devtools.open || devtools.orientation !== orientation) {
        if (emitEvents) emitEvent(true, orientation);
        devtools.open = true;
        devtools.orientation = orientation;
      }
    } else {
      if (devtools.open) {
        if (emitEvents) emitEvent(false, undefined);
        devtools.open = false;
        devtools.orientation = undefined;
      }
    }
  };

  /* ──────────────────────────────────────────────────────────
     7. CONSOLE WARNING MESSAGE
  ────────────────────────────────────────────────────────── */
  setTimeout(() => {
    console.clear();
    console.log('%c⚠️ STOP!', 'color:#ef4444;font-size:48px;font-weight:900');
    console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to "hack" or access features of this portfolio — they are trying to scam you!', 'color:#94a3b8;font-size:14px;line-height:1.8;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#a855f7');
    console.log('%c© 2025 Bhaveek | All Rights Reserved', 'color:#c084fc;font-size:16px;font-weight:bold');
    console.log('%cThis website and all its contents are protected by copyright law. Unauthorized copying, reproduction, or distribution is strictly prohibited.', 'color:#64748b;font-size:12px;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#a855f7');
  }, 500);

  /* ──────────────────────────────────────────────────────────
     8. IFRAME PROTECTION
  ────────────────────────────────────────────────────────── */
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }

})();

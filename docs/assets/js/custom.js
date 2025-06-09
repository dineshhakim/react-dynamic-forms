// Initialize all custom UI elements
document.addEventListener('DOMContentLoaded', function() {
  // Handle keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Alt + Q to toggle quick links
    if (e.altKey && e.key === 'q') {
      const quickLinks = document.getElementById('quickLinks');
      const toggleIcon = document.querySelector('.toggle-icon');
      
      if (quickLinks) {
        quickLinks.classList.toggle('open');
        const isOpen = quickLinks.classList.contains('open');
        toggleIcon.textContent = isOpen ? '‹' : '›';
        localStorage.setItem('quickLinksOpen', isOpen);
      }
    }
    
    // Alt + N to toggle navigation
    if (e.altKey && e.key === 'n') {
      document.body.classList.toggle('nav-hidden');
      const isHidden = document.body.classList.contains('nav-hidden');
      localStorage.setItem('navHidden', isHidden);
    }
    
    // Alt + T to toggle table of contents
    if (e.altKey && e.key === 't') {
      const tocItems = document.querySelector('.md-nav__list[data-md-component="toc"]');
      const tocToggleIcon = document.getElementById('tocToggleIcon');
      
      if (tocItems) {
        const isHidden = tocItems.style.display === 'none';
        tocItems.style.display = isHidden ? 'block' : 'none';
        tocToggleIcon.textContent = isHidden ? 'Hide TOC' : 'Show TOC';
        localStorage.setItem('tocHidden', !isHidden);
      }
    }
  });
  
  // Add keyboard shortcut info to the footer
  const footer = document.querySelector('.md-footer-meta__inner');
  if (footer) {
    const shortcutsDiv = document.createElement('div');
    shortcutsDiv.className = 'keyboard-shortcuts';
    shortcutsDiv.innerHTML = `
      <p>Keyboard Shortcuts: 
        <span class="shortcut-key">Alt+N</span> Toggle Navigation | 
        <span class="shortcut-key">Alt+Q</span> Toggle Quick Links | 
        <span class="shortcut-key">Alt+T</span> Toggle TOC
      </p>
    `;
    footer.appendChild(shortcutsDiv);
  }
});

// Add styles for keyboard shortcuts in the footer
const style = document.createElement('style');
style.textContent = `
  .keyboard-shortcuts {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-top: 1rem;
    text-align: center;
  }
  
  .shortcut-key {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 2px 5px;
    border-radius: 3px;
    font-family: monospace;
  }
`;
document.head.appendChild(style);

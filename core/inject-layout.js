// inject-layout.js

function injectHeader() {
    // Check if header is already injected
    if (document.querySelector('#main-header')) return;
    
    const headerHTML = `
      <style>
        #main-header {
          background: #7cc3c3;
          padding: 12px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-left: 32px;
        }
        .header-logo {
          font-family: 'Georgia', serif;
          font-weight: bold;
          font-size: 22px;
          letter-spacing: 0.5px;
        }
        .header-nav {
          display: flex;
          gap: 14px;
          font-family: 'Arial', sans-serif;
          font-size: 15px;
        }
        .header-nav a {
          color: #111;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .header-nav a:hover {
          color: #333;
        }
        .header-center {
          flex: 1;
          display: flex;
          justify-content: center;
        }
        .header-search {
          display: flex;
          align-items: center;
          background: #eaf6f6;
          border-radius: 16px;
          padding: 0 14px;
          width: 400px;
          height: 32px;
        }
        .header-search input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 14px;
          padding: 6px 0;
        }
        .header-search .search-icon {
          font-size: 16px;
          color: #aaa;
          margin-right: 8px;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-right: 32px;
        }
        .header-icon {
          font-size: 22px;
          color: #111;
          cursor: pointer;
          transition: color 0.2s;
        }
        .header-icon:hover {
          color: #333;
        }
        @media (max-width: 600px) {
          .header-center { display: none; }
          .header-search { width: 180px; }
        }
      </style>
      <div id="main-header">
        <div class="header-left">
          <a href="index.html" style="text-decoration: none; color: inherit;">
            <span class="header-logo">HMM</span>
          </a>
          <nav class="header-nav">
            <a href="#">Offers</a>
            <a href="#">Markets</a>
          </nav>
        </div>
        <div class="header-center">
          <div class="header-search">
            <span class="search-icon">&#128269;</span>
            <input type="text" placeholder="Search for products..." />
          </div>
        </div>
      <div class="header-right">
      <span class="header-icon" onclick="window.location.href='notifications.html'" title="Notifications">&#128276;</span>
      <span class="header-icon" onclick="window.location.href='favourites.html'" title="Favorites">&#10084;&#65039;</span>
      <span class="header-icon" title="Account">&#128100;</span>
      </div>

      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }
  
  function injectFooter() {
    // Check if footer is already injected
    if (document.querySelector('#main-footer')) return;
    
    const footerHTML = `
      <style>
        #main-footer {
          background: #7cc3c3;
          padding: 24px 0 0 0;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          position: relative;
        }
        .footer-icons {
          display: flex;
          justify-content: center;
          gap: 22px;
          margin-bottom: 8px;
        }
        .footer-icons svg {
          width: 28px;
          height: 28px;
          stroke: #222;
          fill: none;
        }
        .footer-nav {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 0;
          font-size: 16px;
          font-family: 'Arial', sans-serif;
          color: #222;
        }
        .footer-nav span {
          cursor: pointer;
          transition: color 0.2s;
        }
        .footer-nav span:hover {
          color: #444;
        }
        .footer-contact {
          position: absolute;
          right: 48px;
          top: 38px;
        }
        .footer-contact button {
          padding: 6px 22px;
          border-radius: 18px;
          border: 2px solid #222;
          background: #fff;
          font-size: 15px;
          font-family: 'Arial', sans-serif;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .footer-contact button:hover {
          background: #eaf6f6;
          color: #111;
        }
        .footer-line {
          margin: 32px auto 6px auto;
          width: 95%;
          border: none;
          border-top: 1.5px solid #fff;
        }
        .footer-copy {
          font-size: 10px;
          color: #fff;
          margin-bottom: 6px;
        }
        @media (max-width: 600px) {
          .footer-contact { position: static; display: block; margin: 10px auto 0 auto; }
        }
      </style>
      <div id="main-footer">
        <div class="footer-icons">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v10l6 3"/></svg>
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16l4-4-4-4-4 4z"/></svg>
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
        </div>
        <div class="footer-nav">
          <span>About</span>
          <span>Team</span>
        </div>
        <div class="footer-contact">
          <button onclick="window.location.href='Contact.html'">Contact Us</button>
        </div>
        <hr class="footer-line" />
        <div class="footer-copy">All Rights Reserved</div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
  
  // Inject on page load
  function injectLayout() {
    injectHeader();
    injectFooter();
  }
  
  // Try to inject immediately
  injectLayout();
  
  // Also try on DOMContentLoaded as a backup
  document.addEventListener('DOMContentLoaded', injectLayout);
  
  // Also try on window load as a final backup
  window.addEventListener('load', injectLayout);
  
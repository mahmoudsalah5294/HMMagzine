// Injects the header bar into the DOM dynamically
export function injectHeader() {
  const headerHTML = `
    <style>
      #main-header {
        background: #7cc3c3;
        padding: 12px 0 12px 0;
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
        <span class="header-logo">Hyper offers</span>
        <nav class="header-nav">
          <a href="#">Offers</a>
          <a href="#">Markets</a>
          <a href="#">Categories</a>
        </nav>
      </div>
      <div class="header-center">
        <div class="header-search">
          <span class="search-icon">&#128269;</span>
          <input type="text" placeholder="Search for products..." />
        </div>
      </div>
      <div class="header-right">
        <span class="header-icon" title="Notifications">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 16v-5a6 6 0 10-12 0v5l-1.5 2h15z"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
        </span>
        <span class="header-icon" title="Favorites" onclick="window.location.href='favourites.html'">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0l-.9.9-.9-.9a5.5 5.5 0 00-7.8 7.8l.9.9L12 21.3l8.7-8.7.9-.9a5.5 5.5 0 000-7.8z"/></svg>
        </span>
        <span class="header-icon" title="Account">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M2 20c0-4 8-6 10-6s10 2 10 6"/></svg>
        </span>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
} 
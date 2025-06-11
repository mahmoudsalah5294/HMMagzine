// Injects the footer bar into the DOM dynamically
export function injectFooter() {
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
        <span>Features</span>
        <span>Gallery</span>
        <span>Team</span>
      </div>
      <div class="footer-contact">
        <button>Contact Us</button>
      </div>
      <hr class="footer-line" />
      <div class="footer-copy">All Rights Reserved</div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
} 
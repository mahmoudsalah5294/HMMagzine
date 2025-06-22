
function injectHeader() {
    if (document.querySelector('#main-header')) return;
    
    const headerHTML = `
      <style>
        #main-header {
          background: #7cc3c3;
          padding: 12px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: calc(100% + 60px);
          margin-left: -30px;
          margin-right: -30px;
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
            <a href="offers_grid.html?filter=all_offers">Offers</a>
            <a href="Market_page.html">Markets</a>
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
      <span class="header-icon" onclick="window.location.href='profile.html'" title="Account">&#128100;</span>
      </div>

      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }
  
  function injectFooter() {
    if (document.querySelector('#main-footer')) return;
    
    const footerHTML = `
         <style>
      .main-footer {
    background-color: #7cc3c3; 
    padding: 20px; 
    position: relative; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    text-align: center; 
    min-height: 100px; 
}

.footer-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 1200px; 
    margin: 0 auto;
}


.social-icons {
    display: flex;
    gap: 15px; 
}

.social-icons a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px; 
    height: 40px; 
    border-radius: 50%; 
    background-color: #FFFFFF; 
    color: #5BC3C3; 
    font-size: 20px; 
    text-decoration: none; 
    transition: background-color 0.3s ease, color 0.3s ease;
}

.social-icons a:hover {
    background-color: #E0E0E0; 
    color: #333; 
}


.footer-nav ul {
    list-style: none; 
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center; 
    gap: 30px; 
}

.footer-nav a {
    font-size: 24px; 
    color: #FFFFFF; 
    text-decoration: none; 
    transition: color 0.3s ease;
}

.footer-nav a:hover {
    color: #e0e0e0; 
}


.footer-separator {
    width: 80%; 
    max-width: 600px; 
    height: 1px; 
    background-color: #FFFFFF; 
    margin: 20px auto; 
}


.footer-copyright {
    color: #FFFFFF; 
    font-size: 14px;
    margin: 0;
}


.footer-contact-button-container {
    position: absolute; 
    right: 20px; 
    top: 50%; 
    transform: translateY(-50%); 
}


.footer-contact-button-container .view-all-button {
    background-color: #FFFFFF; 
    border: 1px solid #FFFFFF; 
    color: #000000; 
    padding: 15px 30px; 
    font-size: 16px;
    border-radius: 62px; 
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.footer-contact-button-container .view-all-button:hover {
    background-color: #e0e0e0; 
    color: #333; 
    border-color: #e0e0e0; 
}

/* Responsive Adjustments for Footer */
@media (max-width: 768px) {
    .main-footer {
        padding: 30px 15px; 
        flex-direction: column; 
        align-items: center; 
    }

    .footer-nav ul {
        flex-direction: column; 
        gap: 10px; 
    }

    .footer-nav a {
        font-size: 20px; 
    }

    .footer-contact-button-container {
        position: static; 
        margin-top: 20px; 
        width: 100%; 
        text-align: center;
    }

    .footer-contact-button-container .view-all-button {
        width: 80%; 
        max-width: 300px; 
    }

    .footer-separator {
        width: 90%; 
    }
}

@media (max-width: 480px) {
    .main-footer {
        padding: 20px 10px;
    }
    .social-icons a {
        width: 35px;
        height: 35px;
        font-size: 18px;
    }
    .footer-nav a {
        font-size: 18px;
    }
    .footer-copyright {
        font-size: 12px;
    }
}
    </style>
    <div id="main-footer" class="main-footer">
                <div class="footer-content-wrapper">
                    <!-- Social Media Icons -->
                    <div class="social-icons">
                        <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://x.com" target="_blank" aria-label="X (Twitter)"><i class="fab fa-x-twitter"></i></a>
                        <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>

                    <!-- Centered Menu -->
                    <nav class="footer-nav">
                        <ul>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="team.html">Project Team</a></li>
                        </ul>
                    </nav>

                    <!-- Thin White Line -->
                    <div class="footer-separator"></div>

                    <!-- Copyright Statement -->
                    <p class="footer-copyright">All Rights Reserved</p>
                </div>

                <!-- Contact Us Button -->
                <div class="footer-contact-button-container">
                    <a href="contact.html" class="view-all-button">Contact Us</a>
                </div>
            </div>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
  
  function injectLayout() {
    const styleId = 'global-page-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        html {
          background-color: #FAFAFA;
        }
        body {
          margin: 0 30px;
          background-color: #FAFAFA;
        }
      `;
      document.head.appendChild(style);
    }

    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fontAwesomeLink = document.createElement('link');
      fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
      fontAwesomeLink.rel = 'stylesheet';
      document.head.appendChild(fontAwesomeLink);
    }

    injectHeader();
    injectFooter();
  }
  
  injectLayout();
  
  document.addEventListener('DOMContentLoaded', injectLayout);
  
  window.addEventListener('load', injectLayout);
  
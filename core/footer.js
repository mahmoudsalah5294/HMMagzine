export function injectFooter() {
  if (document.querySelector('#main-footer')) return;

  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    fontAwesomeLink.rel = 'stylesheet';
    document.head.appendChild(fontAwesomeLink);
  }

  const footerHTML = `
    <style>
      .main-footer {
    background-color: #7cc3c3; 
    padding: 10px; 
    position: relative; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    text-align: center; 
    min-height: 50px; 
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
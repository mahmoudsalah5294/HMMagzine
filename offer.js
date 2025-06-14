document.addEventListener('DOMContentLoaded', () => {
  const book = document.getElementById('book');
  const modal = document.getElementById('zoom-modal');
  const modalImg = document.getElementById('zoomed-image');
  const modalClose = document.getElementById('modal-close');

  const offers = Array.from({ length: 20 }, (_, i) => ({
    title: `Offer ${i + 1}`,
    img: `../../../database-project/${i + 1}.jpg`,
  }));

  // Create pages with two offers each
  for (let i = 0; i < offers.length; i += 2) {
    const page = document.createElement('div');
    page.className = 'page';
    
    const pageContent = document.createElement('div');
    pageContent.className = 'page-content';
    
    // Left offer
    const leftCard = createOfferCard(offers[i]);
    pageContent.appendChild(leftCard);
    
    // Right offer (if exists)
    if (i + 1 < offers.length) {
      const rightCard = createOfferCard(offers[i + 1]);
      pageContent.appendChild(rightCard);
    }
    
    page.appendChild(pageContent);
    book.appendChild(page);
  }

  // Initialize PageFlip
  const pageFlip = new PageFlip(book, {
    width: 600,
    height: 400,
    size: 'stretch',
    minWidth: 300,
    maxWidth: 1200,
    maxHeight: 800,
    showCover: true,
    mobileScrollSupport: true,
    clickEventForward: true,
    useMouseEvents: true,
    flippingTime: 1000,
    usePortrait: true,
    startZIndex: 0,
    autoSize: true,
    maxShadowOpacity: 0.5,
    showPageCorners: true,
    disableFlipByClick: false,
    useSound: true,
    soundFlip: 'https://pageflip.brainyard.com/sound/01.mp3',
  });

  // Load the book
  pageFlip.loadFromHTML('.page');

  function createOfferCard(offer) {
    const card = document.createElement('div');
    card.className = 'offer-card';
    card.innerHTML = `
      <img src="${offer.img}" alt="${offer.title}">
      <div class="card-title">${offer.title}</div>
    `;
    
    card.querySelector('img').addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = offer.img;
      modalImg.alt = offer.title;
    });
    
    return card;
  }

  // Close modal
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

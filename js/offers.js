// offers.js
// Placeholder for future JavaScript functionality 

// Get BASE_URL and API_KEY from window or fallback
const BASE_URL = window.BASE_URL || (window.supabase && window.supabaseClient && window.supabaseClient.supabaseUrl) || 'https://qfjtrlvwwktkpyofbpaq.supabase.co';
const API_KEY = window.API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanRybHZ3d2t0a3B5b2ZicGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzOTgwODEsImV4cCI6MjA2NDk3NDA4MX0.hQU63u38d4LadR1p0W8TUJEIg6MrhhJXAUJBDwF6iXQ';

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function renderMarketHeader(marketName) {
    const headerDiv = document.querySelector('.header');
    const offersTitle = document.querySelector('.offers-title');
    if (!headerDiv || !offersTitle) return;

    try {
        const response = await fetch(`${BASE_URL}/rest/v1/all_markets`, {
            headers: {
                apikey: API_KEY,
                Authorization: `Bearer ${API_KEY}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch markets');
        const markets = await response.json();
        const market = markets.find(m => m.market_name.trim().toLowerCase() === marketName.trim().toLowerCase());
        
        if (!market) {
            headerDiv.innerHTML = `<h1 style='color:red;text-align:center;'>Market not found</h1>`;
            offersTitle.textContent = 'Offers';
            return;
        }
        
        document.title = `${market.market_name} Offers`;
        headerDiv.innerHTML = `
            <img src="${market.logo_image_url}" alt="${market.market_name} Logo" class="logo">
            <div class="header-info">
                <h1>${market.market_name}</h1>
                <p><strong>About ${market.market_name}</strong><br>
                ${market.market_description || 'No description available.'}</p>
                <p><strong>Offers Count</strong>: ${market.offers_count}</p>
            </div>
        `;
        offersTitle.textContent = `${market.market_name} Offers`;
    } catch (error) {
        headerDiv.innerHTML = `<h1 style='color:red;text-align:center;'>Failed to load market info</h1>`;
        offersTitle.textContent = 'Offers';
        console.error(error);
    }
}

async function renderOffers(marketName) {
    const offerContainer = document.querySelector('.offer-image-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!offerContainer || !prevBtn || !nextBtn) return;

    let offers = [];
    let currentOfferIndex = 0;

    const FAVORITES_KEY = 'hm_mag_favorites';
    let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

    function isFavorited(offer) {
        return favorites.includes(offer.image_url);
    }

    function toggleFavorite(offer, button) {
        const offerId = offer.image_url;
        if (isFavorited(offer)) {
            favorites = favorites.filter(favId => favId !== offerId);
            button.classList.remove('favorited');
        } else {
            favorites.push(offerId);
            button.classList.add('favorited');
        }
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }

    function showOffer(index) {
        if (offers.length === 0) {
            offerContainer.innerHTML = '<p style="text-align:center;">No offers found.</p>';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }

        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        
        const offer = offers[index];
        const img = document.createElement('img');
        img.style.opacity = 0;
        
        img.onload = () => {
            offerContainer.innerHTML = '';
            offerContainer.appendChild(img);

            const favBtn = document.createElement('button');
            favBtn.className = 'favorite-btn';
            favBtn.setAttribute('aria-label', 'Add to favorites');
            favBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            
            if (isFavorited(offer)) {
                favBtn.classList.add('favorited');
            }

            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(offer, favBtn);
            });
            offerContainer.appendChild(favBtn);

            setTimeout(() => img.style.opacity = 1, 50);
        };
        
        img.src = offer.image_url;
        img.alt = offer.market_name || 'Offer Image';
    }

    function showNextOffer() {
        currentOfferIndex = (currentOfferIndex + 1) % offers.length;
        showOffer(currentOfferIndex);
    }

    function showPrevOffer() {
        currentOfferIndex = (currentOfferIndex - 1 + offers.length) % offers.length;
        showOffer(currentOfferIndex);
    }

    try {
        const response = await fetch(`${BASE_URL}/rest/v1/offer_images?market_name=eq.${encodeURIComponent(marketName)}`, {
            headers: {
                apikey: API_KEY,
                Authorization: `Bearer ${API_KEY}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch offers');
        offers = await response.json();

        showOffer(currentOfferIndex);

        nextBtn.addEventListener('click', showNextOffer);
        prevBtn.addEventListener('click', showPrevOffer);

    } catch (error) {
        offerContainer.innerHTML = '<p style="color:red;text-align:center;">Failed to load offers.</p>';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const market = getQueryParam('marketName');
    if (!market) {
        const offerContainer = document.querySelector('.offer-image-container');
        if(offerContainer) offerContainer.innerHTML = '<p style="color:red;text-align:center;">No market specified.</p>';
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        if(prevBtn) prevBtn.style.display = 'none';
        if(nextBtn) nextBtn.style.display = 'none';
        return;
    }

    renderMarketHeader(market);
    renderOffers(market);
}); 
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
            return null;
        }
        
        document.title = `${market.market_name} Offers`;
        headerDiv.innerHTML = `
            <img src="${market.logo_image_url}" alt="${market.market_name} Logo" class="logo">
            <div class="header-info">
                <h1>${market.market_name}</h1>
                <p><strong>About ${market.market_name}</strong><br>
                ${market.market_description || 'No description available.'}</p>
                <p id="offers-count-container"><strong>Offers Count</strong>: ${market.offers_count}</p>
                <div id="countdown-timer" style="color: red; font-weight: bold; margin-top: 10px;"></div>
            </div>
        `;
        offersTitle.textContent = `${market.market_name} Offers`;

        if (market.expiration_date) {
            const expirationDate = new Date(market.expiration_date);
            expirationDate.setHours(23, 59, 59, 999); // Consider end of day for expiration
            const now = new Date();
            const timeDiff = expirationDate.getTime() - now.getTime();

            if (timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000) {
                const countdownElement = document.getElementById('countdown-timer');
                let countdownInterval;

                const updateCountdown = () => {
                    const now = new Date();
                    const diff = expirationDate.getTime() - now.getTime();

                    if (diff <= 0) {
                        countdownElement.innerHTML = "Offers expired!";
                        clearInterval(countdownInterval);
                        return;
                    }

                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    countdownElement.innerHTML = `Offers expire in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                };

                updateCountdown();
                countdownInterval = setInterval(updateCountdown, 1000);
            }
        }
        return market;
    } catch (error) {
        headerDiv.innerHTML = `<h1 style='color:red;text-align:center;'>Failed to load market info</h1>`;
        offersTitle.textContent = 'Offers';
        console.error(error);
        return null;
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
    let favorites = [];

    async function fetchFavorites() {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`${BASE_URL}/rest/v1/favorites?user_id=eq.${userId}`, {
            headers: {
                apikey: API_KEY,
                Authorization: `Bearer ${API_KEY}`
            }
        });
        if (response.ok) {
            favorites = await response.json();
        } else {
            favorites = [];
        }
    }

    function isFavorited() {
        const offer = offers[currentOfferIndex];
         return favorites.some(fav => fav.offer_id === offer.id);
    }

    async function toggleFavorite(button) {
        const offer = offers[currentOfferIndex];
        const userId = localStorage.getItem('user_id');
        const isFav = isFavorited(offer);
        const favUrl = `${BASE_URL}/rest/v1/favorites`;

        if (isFav) {
            // remove favorite
            await fetch(`${favUrl}?user_id=eq.${userId}&offer_id=eq.${offer.id}`, {
                method: 'DELETE',
                headers: {
                    apikey: API_KEY,
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                    Prefer: 'return=representation'
                }
            });
            button.classList.remove('favorited');
        } else {
            // add favorite
            await fetch(favUrl, {
                method: 'POST',
                headers: {
                    apikey: API_KEY,
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                    Prefer: 'return=representation'
                },
                body: JSON.stringify({
                    user_id: userId,
                    offer_id: offer.id
                })
            });
            button.classList.add('favorited');
        }

        // refresh favorites
        await fetchFavorites(offer.id);
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

            favBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await toggleFavorite(favBtn);
            });
            
            offerContainer.appendChild(favBtn);

            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.setAttribute('aria-label', 'Share Offer');
            shareBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>`;

            shareBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const offer = offers[currentOfferIndex];
                const shareData = {
                    title: `Check out this offer from ${offer.market_name}`,
                    text: `I found a great offer from ${offer.market_name} at HMMagazine!`,
                    url: window.location.href
                };

                try {
                    if (navigator.share) {
                        await navigator.share(shareData);
                    } else {
                        if (navigator.clipboard) {
                            await navigator.clipboard.writeText(shareData.url);
                            alert('Link copied to clipboard!');
                        } else {
                            prompt('Copy this link to share:', shareData.url);
                        }
                    }
                } catch (error) {
                    console.error('Error sharing:', error);
                }
            });
            
            offerContainer.appendChild(shareBtn);

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
        if (offers.length > 0) {
            await fetchFavorites();
        }

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

document.addEventListener('DOMContentLoaded', async () => {
    const marketName = getQueryParam('marketName');
    if (!marketName) {
        const offerContainer = document.querySelector('.offer-image-container');
        if(offerContainer) offerContainer.innerHTML = '<p style="color:red;text-align:center;">No market specified.</p>';
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        if(prevBtn) prevBtn.style.display = 'none';
        if(nextBtn) nextBtn.style.display = 'none';
        return;
    }

    const market = await renderMarketHeader(marketName);
    if (!market) {
        const offerContainer = document.querySelector('.offer-image-container');
        if (offerContainer) offerContainer.innerHTML = '';
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    if (market.expiration_date) {
        const expirationDate = new Date(market.expiration_date);
        expirationDate.setHours(23, 59, 59, 999);
        const now = new Date();

        if (expirationDate.getTime() < now.getTime()) {
            const offerContainer = document.querySelector('.offer-image-container');
            if (offerContainer) offerContainer.innerHTML = '<p style="text-align:center;">No Offers Available</p>';
            
            const offersCountContainer = document.getElementById('offers-count-container');
            if (offersCountContainer) {
                offersCountContainer.innerHTML = '<strong>Offers Count</strong>: 0';
            }

            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }
    }

    renderOffers(marketName);
}); 
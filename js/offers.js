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
        // Find the market by name (trim to avoid trailing spaces)
        const market = markets.find(m => m.market_name.trim().toLowerCase() === marketName.trim().toLowerCase());
        if (!market) {
            headerDiv.innerHTML = `<h1 style='color:red;text-align:center;'>Market not found</h1>`;
            offersTitle.textContent = 'Offers';
            return;
        }
        headerDiv.innerHTML = `
            <img src="${market.logo_image_url}" alt="${market.market_name} Logo" class="logo">
            <div class="header-info">
                <h1>${market.market_name}</h1>
                <p><strong>About ${market.market_name}</strong><br>
                ${market.market_description || ''}</p>
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

document.addEventListener('DOMContentLoaded', async () => {
    const offersGrid = document.querySelector('.offers-grid');
    if (!offersGrid) return;

    const market = getQueryParam('market');
    if (!market) {
        offersGrid.innerHTML = '<p style="color:red;text-align:center;">No market specified.</p>';
        return;
    }

    // Render header info dynamically
    renderMarketHeader(market);

    try {
        const response = await fetch(`${BASE_URL}/rest/v1/offer_images_with_hypermarket?hypermarket_name=eq.${encodeURIComponent(market)}`, {
            headers: {
                apikey: API_KEY,
                Authorization: `Bearer ${API_KEY}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch offers');
        const offers = await response.json();

        offersGrid.innerHTML = '';
        if (offers.length === 0) {
            offersGrid.innerHTML = '<p style="text-align:center;">No offers found for this market.</p>';
            return;
        }
        offers.forEach(offer => {
            const div = document.createElement('div');
            div.className = 'offer-item magazine-preview';
            const img = document.createElement('img');
            img.src = offer.image_url;
            img.alt = offer.hypermarket_name || 'Magazine Preview';
            div.appendChild(img);
            offersGrid.appendChild(div);
        });
    } catch (error) {
        offersGrid.innerHTML = '<p style="color:red;text-align:center;">Failed to load offers.</p>';
        console.error(error);
    }
}); 
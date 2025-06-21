const supabase = window.supabaseClient; 
const hyperMarketsContainer = document.getElementById('hyperMarketsContainer');

// --- Function to Fetch and Render Markets ---
async function fetchAndRenderMarkets() {
    hyperMarketsContainer.innerHTML = '<p class="loading-message">Loading hyper markets...</p>';
    if (!supabase) {
        console.error('Supabase client not initialized. Make sure core/supabase.js loads correctly.');
        hyperMarketsContainer.innerHTML = '<p class="loading-message error-message">Error: Supabase client not available.</p>';
        return;
    }

    try {
        
        const { data: markets, error } = await supabase
            .from('all_markets')
            .select('market_name, logo_image_url, offers_count, dir_url, is_featured')
            .eq('is_featured', true);
        if (error) {
            throw error;
        }
        if (markets.length === 0) {
            hyperMarketsContainer.innerHTML = '<p class="loading-message">No hyper markets found.</p>';
            return;
        }

        // Clear the loading message
        hyperMarketsContainer.innerHTML = '';

        
        markets.forEach(market => {
            const marketHtml = `
                <div class="box-wrapper">
                <a href="${market.dir_url}" class="market-link">
                    <div class="box">
                        <img src="${market.logo_image_url}" 
                             alt="${market.market_name} Logo" 
                             onerror="this.onerror=null; this.src='https://placehold.co/295x298/cccccc/333333?text=Image+Not+Found';" />
                    </div>
                    <p class="box-name">${market.market_name}</p>
                    <p class="box-offers">${market.offers_count} Offers</p>
                </a>
                </div>
            `;
            hyperMarketsContainer.insertAdjacentHTML('beforeend', marketHtml);
        });

    } catch (error) {
        // If an error occurs
        console.error('Error fetching hyper markets:', error.message);
        hyperMarketsContainer.innerHTML = `<p class="loading-message error-message">Failed to load hyper markets: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderMarkets);

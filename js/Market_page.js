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

    try 
 {
        
        const { data: markets, error } = await supabase
            .from('all_markets')
            .select('logo_image_url,market_name,market_description');
            if (error) {
            throw error;
        }
        if (markets.length === 0) {
            hyperMarketsContainer.innerHTML = '<p class="loading-message">No hyper markets found.</p>';
            return;
        }
          // Clear the loading message
        hyperMarketsContainer.innerHTML = '';

        
        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get('search')?.toLowerCase();

        const filteredMarkets = searchQuery
        ? markets.filter(m => m.market_name.toLowerCase().includes(searchQuery))
        : markets;

        filteredMarkets.forEach(market => {
            const marketHtml = `
                <div class="market-card">
                <a href="offers.html?marketName=${encodeURIComponent(market.market_name)}" class="market-link">
                <img src="${market.logo_image_url}" alt="${market.market_name}" />      
                
                 <div class="market-info">
                   <p><strong> ${market.market_name}</strong><br>
                   
                    </a>
                    <p> About ${market.market_name}<br>
                   <p> ${market.market_description}<br>
                    </div> 
                    
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
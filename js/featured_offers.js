(async () => {
const supabase = window.supabaseClient;
const featuredOffersContainer = document.getElementById('featuredOffersContainer');

// --- Function to Fetch and Render Featured Offers ---
async function fetchAndRenderFeaturedOffers() {
    featuredOffersContainer.innerHTML = '<p class="loading-message">Loading featured offers...</p>';
    if (!supabase) {
        console.error('Supabase client not initialized. Make sure core/supabase.js loads correctly.');
        featuredOffersContainer.innerHTML = '<p class="loading-message error-message">Error: Supabase client not available.</p>';
        return;
    }

    try {

        const { data: offers, error } = await supabase
            .from('offers')
            .select('title, image_url, offer_url, is_featured')
            .eq('is_featured', true);
        if (error) {
            throw error;
        }
        if (offers.length === 0) { 
            featuredOffersContainer.innerHTML = '<p class="loading-message">No featured offers found.</p>';
            return;
        }

        // Clear loading message
        featuredOffersContainer.innerHTML = '';


        offers.forEach(offer => {
            const offerHtml = `
                <div class="box-wrapper">
                    <a href="${offer.offer_url}" class="market-link">
                        <div class="box">
                            <img src="${offer.image_url}" 
                                 alt="${offer.title}" 
                                 onerror="this.onerror=null; this.src='https://placehold.co/295x298/cccccc/333333?text=Image+Not+Found';" />
                        </div>
                        <p class="box-name">${offer.title}</p> <!-- Updated to offer.title -->
                        
                    </a>
                </div>
            `;
            featuredOffersContainer.insertAdjacentHTML('beforeend', offerHtml);
        });

    } catch (error) {
        console.error('Error fetching featured offers:', error.message);
        featuredOffersContainer.innerHTML = `<p class="loading-message error-message">Failed to load featured offers: ${error.message}</p>`;
    }
}

// --- Call the function when the page loads ---
document.addEventListener('DOMContentLoaded', fetchAndRenderFeaturedOffers);
})();
const supabase = window.supabaseClient;

const APIEndpoints = {
    HOT_DEALS: 'hot_deals',
    EXPIRATION_DATE: 'expiration_date',
    ALL_OFFERS: 'all_offers',
    IS_FEATURED: 'is_featured'
};

const gridContainer = document.getElementById('offers-grid-container');
const allOffersBtn = document.getElementById('all-offers-btn');
const featuredBtn = document.getElementById('featured-btn');
const hotDealsBtn = document.getElementById('hot-deals-btn');
const expiringSoonBtn = document.getElementById('expiring-soon-btn');

let currentPage = 0;
const pageSize = 6;
let currentFilter = 'all';
let isLoading = false;

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function getInitialFilter() {
    const filterParam = getUrlParameter('filter');
    switch (filterParam) {
        case 'hot_deals':
            return 'hot';
        case 'expiration_date':
            return 'expiring';
        case 'is_featured':
            return 'featured';
        case 'all_offers':
        default:
            return 'all';
    }
}

async function fetchOffers(page, filter) {
    isLoading = true;
    let query = supabase.from('offer_images').select('*');

    if (filter === 'hot') {
        query = query.eq('is_hot', true);
    } else if (filter === 'featured') {
        query = query.eq('is_featured', true);
    } else if (filter === 'expiring') {
        const today = new Date();
        const inTenDays = new Date();
        inTenDays.setDate(today.getDate() + 10);
        
        const todayISO = today.toISOString().split('T')[0];
        const inTenDaysISO = inTenDays.toISOString().split('T')[0];
        
        const { data: expiringMarkets, error: marketsError } = await supabase
            .from('all_markets')
            .select('market_name')
            .gte('expiration_date', todayISO)
            .lte('expiration_date', inTenDaysISO)
            .range(page * pageSize, (page + 1) * pageSize - 1);
        
        if (marketsError) {
            console.error('Error fetching expiring markets', marketsError);
            isLoading = false;
            return [];
        }
        
        if (!expiringMarkets || expiringMarkets.length === 0) {
            isLoading = false;
            return [];
        }
        
        const marketNames = expiringMarkets.map(market => market.market_name);
        
        const { data: images, error: imagesError } = await supabase
            .from('offer_images')
            .select('*')
            .in('market_name', marketNames);
        
        isLoading = false;
        if (imagesError) {
            console.error('Error fetching images for expiring markets', imagesError);
            return [];
        }
        
        return images;
    }
    
    const { data, error } = await query.range(page * pageSize, (page + 1) * pageSize - 1);
    
    isLoading = false;
    if (error) {
        console.error('Error fetching offers:', error.message);
        return [];
    }
    return data;
}


function renderImages(images, append = false) {
    if (!append) {
        gridContainer.innerHTML = '';
    }
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.image_url;
        imgElement.alt = image.alt_text || 'Offer image';
        imgElement.classList.add('grid-item');
        gridContainer.appendChild(imgElement);
    });
}

function setActiveButton(activeBtn) {
    [allOffersBtn, featuredBtn, hotDealsBtn, expiringSoonBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

async function loadMoreImages() {
    currentPage++;
    const images = await fetchOffers(currentPage, currentFilter);
    renderImages(images, true);
}

async function applyFilter(filter) {
    currentPage = 0;
    currentFilter = filter;
    const images = await fetchOffers(currentPage, currentFilter);
    renderImages(images, false);
}


function init() {
    allOffersBtn.addEventListener('click', () => {
        setActiveButton(allOffersBtn);
        applyFilter('all');
    });
    featuredBtn.addEventListener('click', () => {
        setActiveButton(featuredBtn);
        applyFilter('featured');
    });
    hotDealsBtn.addEventListener('click', () => {
        setActiveButton(hotDealsBtn);
        applyFilter('hot');
    });
    expiringSoonBtn.addEventListener('click', () => {
        setActiveButton(expiringSoonBtn);
        applyFilter('expiring');
    });

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
            loadMoreImages();
        }
    });

    const initialFilter = getInitialFilter();
    currentFilter = initialFilter;
    
    switch (initialFilter) {
        case 'hot':
            setActiveButton(hotDealsBtn);
            break;
        case 'expiring':
            setActiveButton(expiringSoonBtn);
            break;
        case 'featured':
            setActiveButton(featuredBtn);
            break;
        default:
            setActiveButton(allOffersBtn);
    }
    
    applyFilter(initialFilter);
}

document.addEventListener('DOMContentLoaded', init); 
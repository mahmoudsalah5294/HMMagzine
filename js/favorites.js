document.addEventListener('DOMContentLoaded', async () => {
  window.supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
      fetchFavorites();
    } else {
      displayNotLoggedIn();
    }   
  });

  const { data: { session }, error } = await window.supabaseClient.auth.getSession();
  if (session) {
    fetchFavorites();
  } else {
    displayNotLoggedIn();
  }

    setupImageModal(); 
});

async function fetchFavorites() {
  const { data: { session } } = await window.supabaseClient.auth.getSession();
  if (!session) {
    displayNotLoggedIn();
    return;
  }

  const { data: favorites, error } = await window.supabaseClient
    .from('favorites')
    .select(`id, offer_images:offer_id (id, image_url, market_name, is_featured, is_hot)`) // join offer_images
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Error fetching favorites:', error);
    return;
  }

  if (!favorites || favorites.length === 0) {
    displayNoFavorites();
    return;
  }

  const offers = favorites.map(fav => ({
    favorite_id: fav.id,
    ...fav.offer_images
  }));

  displayFavourites(offers);
}

function displayNoFavorites() {
  const container = document.getElementById('offers-container');
  container.innerHTML = `
    <div style="text-align: center; margin-top: 50px;">
      <h3>You have no favorite offers yet.</h3>
      <button onclick="redirectToHome()" style="padding: 10px 20px; font-size: 16px;">Go to Home</button>
    </div>
  `;
}

function displayFavourites(offers) {
  const container = document.getElementById('offers-container');
  container.innerHTML = '';
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
  container.style.gap = '20px';

  offers.forEach(offer => {
    const offerCard = document.createElement('div');
    offerCard.className = 'offer-card';


    offerCard.innerHTML = `
      <div class="offer-content">
        <div class="offer-title">${offer.market_name || 'Unnamed Offer'}</div>
        <div><img  onclick="openImageModal('${offer.image_url}')" src="${offer.image_url}" alt="Offer Image" style="max-width: 100%; border-radius: 8px;"></div>

        </div>
      <div>
        <span class="heart-icon favorited" onclick="removeFavorite('${offer.favorite_id}')">&#10084;</span>
      </div>
    `;

    container.appendChild(offerCard);
  });

  
}

async function removeFavorite(favoriteId) {
  if (!confirm('Are you sure you want to remove this from your favorites?')) return;

  const { error } = await window.supabaseClient
    .from('favorites')
    .delete()
    .eq('id', favoriteId);

  if (error) {
    alert('Failed to remove favorite.');
  } else {
    alert('Favorite removed successfully!');
    fetchFavorites();
  }
}

function displayNotLoggedIn() {
  const container = document.getElementById('offers-container');
  container.innerHTML = `
    <div style="text-align: center; margin-top: 50px;">
      <h3>You are not logged in</h3>
      <button onclick="redirectToLogin()" style="padding: 10px 20px; font-size: 16px;">Login</button>
    </div>
  `;
}

function redirectToLogin() {
  window.location.href = 'login.html';
}

function redirectToHome() {
  window.location.href = 'index.html';
}
function setupImageModal() {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="image-modal" class="image-modal">
      <span class="close-modal">&times;</span>
      <img class="modal-content" id="modal-image">
    </div>
  `);

  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const closeModal = document.querySelector('.close-modal');

  // Event delegation for dynamically created images


  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

function openImageModal(imageUrl) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  modal.style.display = 'block';
  modalImg.src = imageUrl;
}

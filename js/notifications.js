document.addEventListener('DOMContentLoaded', async () => {
      window.supabaseClient.auth.onAuthStateChange((event, session) => {
        if (session) {
          fetchNotifications(session.user.id);
        } else {
          displayNotLoggedIn();
        }
      });

      const { data: { session } } = await window.supabaseClient.auth.getSession();
      if (session) {
        fetchNotifications(session.user.id);
      } else {
        displayNotLoggedIn();
      }
    });

    async function fetchNotifications(userId) {
      const response = await fetch(`${BASE_URL}/rest/v1/notifications?user_id=eq.${userId}&order=created_at.desc`, {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`
        }
      });

      const notifications = await response.json();
      displayNotifications(notifications);
    }

    function displayNotifications(notifications) {
      const container = document.getElementById('notifications-container');
      container.innerHTML = '';

      if (notifications.length === 0) {
        container.innerHTML = '<p>No notifications found.</p>';
        if (session) {
          console.log('User ID:', session.user.id); // 👉 This is the user_id you need
        }
        return;
      }

      notifications.forEach(notification => {
        const card = document.createElement('div');
        card.className = `notification-card ${notification.read ? 'read' : ''}`;

        card.innerHTML = `
          <div class="notification-message">${notification.message}</div>
          <div class="notification-type">Type: ${notification.type}</div>
          <div class="notification-date">Received: ${new Date(notification.created_at).toLocaleString()}</div>
          ${notification.read ? '<span style="color: green;">Read</span>' : `<button class="mark-read-button" onclick="markAsRead('${notification.id}')">Mark as Read</button>`}
        `;

        container.appendChild(card);
      });
    }

    async function markAsRead(notificationId) {
      const response = await fetch(`${BASE_URL}/rest/v1/notifications?id=eq.${notificationId}`, {
        method: 'PATCH',
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ read: true })
      });

      if (response.ok) {
        alert('Notification marked as read.');
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session) {
          fetchNotifications(session.user.id);
        }
      } else {
        alert('Failed to mark notification as read.');
      }
    }

    function displayNotLoggedIn() {
      const container = document.getElementById('notifications-container');
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
    document.addEventListener('DOMContentLoaded', async () => {
            const { data: { session } } = await window.supabaseClient.auth.getSession();

            const profileContainer = document.getElementById('profile-container');

            if (!session || !session.user) {
                profileContainer.innerHTML = `
                    <div style="text-align: center; margin-top: 50px;">
                        <h3>You are not logged in</h3>
                        <div class="auth-buttons">
                            <button class="login-button" onclick="redirectToLogin()">Login</button>
                            <button class="signup-button" onclick="redirectToSignup()">Sign Up</button>
                        </div>
                    </div>
                `;
                return;
            }

            const user = session.user;

            profileContainer.innerHTML = `
                <div class="user-card">
                    <h4>User Details</h4>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>User ID:</strong> ${user.id}</p>
                    <p><strong>Role:</strong> ${user.role}</p>
                    <p><strong>Email Confirmed At:</strong> ${user.email_confirmed_at || 'Not Confirmed'}</p>
                    <p><strong>Created At:</strong> ${user.created_at}</p>
                    <p><strong>Last Sign In At:</strong> ${user.last_sign_in_at}</p>
                    <button class="logout-button" onclick="logout()">Logout</button>
                </div>
            `;
        });

        async function logout() {
            const { error } = await window.supabaseClient.auth.signOut();
            if (error) {
                alert('Error during logout: ' + error.message);
            } else {
                window.location.href = 'login.html';
            }
        }

        

        function redirectToLogin() {
            window.location.href = 'login.html';
        }

        function redirectToSignup() {
            window.location.href = 'sign_up.html';
        }
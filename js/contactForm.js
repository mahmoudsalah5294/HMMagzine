(async () => {
  
    const supabase = window.supabaseClient;

 
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Function to display messages (success/error) to the user
    function displayMessage(message, type = 'success') {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`; // Add class for styling
        // Clear message after a few seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }

    // Add an event listener for the form submission
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission (page reload)

        // Basic validation (browser 'required' handles much of this, but good to double-check)
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            displayMessage('Please fill in all required fields (Name, Email, Message).', 'error');
            return;
        }

        // Basic email format validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            displayMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Disable button and show a sending state
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        displayMessage('Sending your message...', 'info'); // Provide immediate feedback

        // Send data to Supabase
        try {
            // IMPORTANT: 'contact_submissions' is the assumed table name.
            // Make sure this table exists in your Supabase database with matching column names.
            const { data, error } = await supabase
                .from('contact_submissions')
                .insert([
                    {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    }
                ]);

            if (error) {
                throw error;
            }

            displayMessage('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset(); // Clear the form fields
        } catch (error) {
            console.error('Error sending message:', error.message);
            displayMessage(`Failed to send message: ${error.message}`, 'error');
        } finally {
            submitButton.disabled = false; // Re-enable button
            submitButton.textContent = 'Send Message'; // Reset button text
        }
    });

})();

// supabase.js
const BASE_URL = 'https://qfjtrlvwwktkpyofbpaq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanRybHZ3d2t0a3B5b2ZicGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzOTgwODEsImV4cCI6MjA2NDk3NDA4MX0.hQU63u38d4LadR1p0W8TUJEIg6MrhhJXAUJBDwF6iXQ';

const supabaseClient = window.supabase.createClient(BASE_URL, API_KEY);

// Export the client
window.supabaseClient = supabaseClient;

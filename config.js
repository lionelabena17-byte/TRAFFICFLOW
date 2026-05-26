// config.js - Configuration Supabase (NE PAS PUSHER LA CLÉ SUR GITHUB)
const CONFIG = {
    SUPABASE_URL: 'https://ctntssmflnwfbqykpxau.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bnRzc21mbG53ZmJxeWtweGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NTExNzcsImV4cCI6MjA5MjEyNzE3N30.zsSPzHXIOv_oVv5gTIWvuthZw7ZlcXrVzGxDfQh3wLk'
};

// Empêche l'affichage accidentel dans la console
Object.freeze(CONFIG);

console.log('%c✅ Supabase Config chargée', 'color: #22c55e; font-weight: bold');
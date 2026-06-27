// ===== CONFIG.JS - CONFIGURATION SUPABASE SÉCURISÉE =====
// Les clés publiques Supabase sont OK en public (c'est leur design)
// Les clés secrètes restent TOUJOURS du côté serveur dans .env

const CONFIG = {
    // Supabase Public Config (sûr à exposer)
    SUPABASE_URL: 'https://ctntssmflnwfbqykpxau.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bnRzc21mbG53ZmJxeWtweGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NTExNzcsImV4cCI6MjA5MjEyNzE3N30.zsSPzHXIOv_oVv5gTIWvuthZw7ZlcXrVzGxDfQh3wLk',
    
    // API BACKEND
    API_URL: process.env.NODE_ENV === 'production' 
        ? 'https://trafficflow-api.herokuapp.com/api'
        : 'http://localhost:3000/api',
    
    // APP CONFIG
    APP_NAME: 'TrafficFlow',
    APP_VERSION: '1.0.0',
    LOCATION: 'Douala, Cameroon',
    
    // FEATURES
    ENABLE_MAPS: true,
    ENABLE_PWA: true,
    ENABLE_NOTIFICATIONS: true,
    
    // LOGGING
    DEBUG: process.env.NODE_ENV !== 'production'
};

// Vérifier que Supabase est bien configuré
if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_KEY) {
    console.error('❌ ERREUR: Configuration Supabase manquante!');
}

// Exposer globalement
window.CONFIG = CONFIG;

console.log('%c✅ Configuration TrafficFlow chargée', 'color: #22c55e; font-weight: bold');

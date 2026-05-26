// auth.js - Gestion complète de l'authentification Supabase

let supabaseClient = null;

// Initialisation du client Supabase
function initSupabase() {
    if (supabaseClient) return supabaseClient;
    
    if (typeof window.supabase === "undefined") {
        console.error("❌ Supabase library non chargée");
        return null;
    }

    supabaseClient = window.supabase.createClient(
        CONFIG.SUPABASE_URL,
        CONFIG.SUPABASE_KEY
    );
    
    console.log("%c✅ Supabase Client initialisé avec succès", "color: #22c55e; font-weight: bold");
    return supabaseClient;
}

// Inscription
async function signup(email, password, nom = "") {
    const client = initSupabase();
    if (!client) return { error: { message: "Erreur de connexion à la base" } };

    try {
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { nom: nom }
            }
        });
        return { data, error };
    } catch (err) {
        return { error: { message: err.message } };
    }
}

// Connexion
async function login(email, password) {
    const client = initSupabase();
    if (!client) return { error: { message: "Erreur de connexion à la base" } };

    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password
        });
        return { data, error };
    } catch (err) {
        return { error: { message: err.message } };
    }
}

// Vérifier si l'utilisateur est connecté
async function getCurrentUser() {
    const client = initSupabase();
    if (!client) return null;
    
    const { data: { user } } = await client.auth.getUser();
    return user;
}

// Protection des routes
async function protectRoute() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = 'connexion.html';
        return false;
    }
    return true;
}

// Déconnexion
async function logout() {
    const client = initSupabase();
    if (client) {
        await client.auth.signOut();
        window.location.href = 'connexion.html';
    }
}

// Exporter les fonctions
window.auth = {
    signup,
    login,
    getCurrentUser,
    protectRoute,
    logout,
    initSupabase
};
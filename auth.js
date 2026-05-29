// auth.js - Version finale et robuste
let supabaseClient = null;

function initSupabase() {
    if (supabaseClient) return supabaseClient;

    if (typeof window.supabase === "undefined") {
        console.error("❌ Supabase JS non chargé");
        return null;
    }

    supabaseClient = window.supabase.createClient(
        CONFIG.SUPABASE_URL,
        CONFIG.SUPABASE_KEY
    );

    console.log("%c✅ Supabase connecté avec succès", "color: #22c55e; font-weight: bold");
    return supabaseClient;
}

// Inscription
async function signup(email, password, nom = "") {
    const client = initSupabase();
    if (!client) return { error: { message: "Impossible de se connecter à la base" } };

    const { data, error } = await client.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { nom: nom }
        }
    });

    return { data, error };
}

// Connexion
async function login(email, password) {
    const client = initSupabase();
    if (!client) return { error: { message: "Impossible de se connecter à la base" } };

    const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password
    });

    return { data, error };
}

// Récupérer l'utilisateur actuel
async function getCurrentUser() {
    const client = initSupabase();
    if (!client) return null;

    const { data: { user } } = await client.auth.getUser();
    return user;
}

// Protection de route
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
        window.location.href = 'index.html';
    }
}

// Exposer les fonctions globalement
window.auth = {
    signup,
    login,
    getCurrentUser,
    protectRoute,
    logout,
    initSupabase
};

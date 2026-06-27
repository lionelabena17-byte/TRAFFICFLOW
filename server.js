// ===== TRAFFICFLOW SERVER.JS =====
// Backend Express complet avec API routes

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const supabase = require('@supabase/supabase-js');
const path = require('path');

dotenv.config();
const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== SUPABASE CONFIG =====
const sbUrl = process.env.SUPABASE_URL;
const sbKey = process.env.SUPABASE_KEY;
const supabaseClient = supabase.createClient(sbUrl, sbKey);

// ===== ROUTES =====

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'API TrafficFlow OK', timestamp: new Date().toISOString() });
});

// ===== AUTH ROUTES =====
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password, nom } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: { data: { nom } }
        });

        if (error) return res.status(400).json({ error: error.message });
        res.json({ data, message: 'Inscription réussie' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) return res.status(400).json({ error: error.message });
        res.json({ data, message: 'Connexion réussie' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== TRAFIC ROUTES =====
app.get('/api/trafic/stations', async (req, res) => {
    try {
        const { data, error } = await supabaseClient
            .from('stations')
            .select('*');

        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/trafic/positions', async (req, res) => {
    try {
        const { latitude, longitude, precision, userId } = req.body;

        const { data, error } = await supabaseClient
            .from('positions')
            .insert([{ latitude, longitude, precision, user_id: userId }]);

        if (error) throw error;
        res.json({ message: 'Position enregistrée', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/trafic/incidents', async (req, res) => {
    try {
        const { data, error } = await supabaseClient
            .from('incidents')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== STATISTIQUES ROUTES =====
app.get('/api/stats/horaires', async (req, res) => {
    try {
        // Données simulées — à remplacer par une vraie requête Supabase
        const data = [120, 200, 180, 150, 300, 850, 1400, 1200, 900, 700, 650, 800, 950, 700, 600, 650, 1100, 1500, 1300, 900, 600, 400, 250, 150];
        res.json({ data, heures: ['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h','20h','21h','22h','23h'] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/stats/jours', async (req, res) => {
    try {
        const data = [850, 1200, 1150, 1300, 1400, 600, 300];
        res.json({ data, jours: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== ROUTE ITINERAIRE =====
app.post('/api/itineraire/calculer', async (req, res) => {
    try {
        const { depart, destination, heure } = req.body;
        
        // Logique simple — à améliorer avec une vraie API de routing
        res.json({
            distance: '12.5 km',
            duree: '28 min',
            trafic: 'Modéré',
            via: 'Boulevard de la Liberté',
            conseil: 'Partez avant 7h30 pour éviter les embouteillages.'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur', message: err.message });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n✅ TrafficFlow API live sur http://localhost:${PORT}`);
    console.log(`🔗 API Health: http://localhost:${PORT}/api/health\n`);
});

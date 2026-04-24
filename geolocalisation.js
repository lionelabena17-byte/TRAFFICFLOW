// ===== GÉOLOCALISATION TRAFFICFLOW =====
let positionUtilisateur = null
let watchId = null

// Démarrer le tracking GPS
function demarrerGeolocalisation() {
    if(!navigator.geolocation) {
        console.log('Géolocalisation non supportée')
        return
    }

    watchId = navigator.geolocation.watchPosition(
        function(position) {
            positionUtilisateur = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                precision: position.coords.accuracy,
                timestamp: new Date().toISOString()
            }
            envoyerPositionSupabase(positionUtilisateur)
            mettreAJourCarte(positionUtilisateur)
        },
        function(erreur) {
            console.log('Erreur GPS:', erreur.message)
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000
        }
    )
}

// Arrêter le tracking
function arreterGeolocalisation() {
    if(watchId) navigator.geolocation.clearWatch(watchId)
}

// Envoyer position à Supabase
async function envoyerPositionSupabase(position) {
    if(typeof CONFIG === 'undefined') return

    try {
        const response = await fetch(CONFIG.SUPABASE_URL + '/rest/v1/positions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': CONFIG.SUPABASE_KEY,
                'Authorization': 'Bearer ' + CONFIG.SUPABASE_KEY,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                latitude: position.lat,
                longitude: position.lng,
                precision: position.precision,
                timestamp: position.timestamp
            })
        })
        console.log('Position envoyee a Supabase')
    } catch(err) {
        console.log('Erreur envoi position:', err)
    }
}

// Mettre à jour la carte si on est sur map.html
function mettreAJourCarte(position) {
    if(typeof map === 'undefined') return

    if(window.markerUtilisateur) {
        window.markerUtilisateur.setLatLng([position.lat, position.lng])
    } else {
        window.markerUtilisateur = L.circleMarker([position.lat, position.lng], {
            radius: 10,
            fillColor: '#C9A96E',
            color: '#1A0A00',
            weight: 3,
            fillOpacity: 1
        }).addTo(map)
        window.markerUtilisateur.bindPopup('<strong>Votre position</strong>')
    }

    map.setView([position.lat, position.lng], 14)
}

// Démarrer automatiquement
window.addEventListener('load', function() {
    demarrerGeolocalisation()
})
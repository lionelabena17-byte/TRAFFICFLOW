// cookie-consent.js - Gestion des cookies pour TrafficFlow

function showCookieConsent() {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        return;
    }

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style.cssText = `
        position: fixed; bottom: 0; left: 0; right: 0; 
        background: #1A0A00; color: white; padding: 20px 15px; 
        z-index: 10000; box-shadow: 0 -4px 15px rgba(0,0,0,0.4);
        font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;
    `;

    banner.innerHTML = `
        <div style="max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 260px;">
                <strong>Nous utilisons des cookies</strong><br>
                <small>Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et offrir des fonctionnalités personnalisées.</small>
            </div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <button onclick="acceptAllCookies()" style="background:#C9A96E; color:#1A0A00; border:none; padding:12px 28px; border-radius:8px; font-weight:700; cursor:pointer;">
                    Accepter tout
                </button>
                <button onclick="rejectCookies()" style="background:transparent; color:white; border:1px solid #777; padding:12px 28px; border-radius:8px; cursor:pointer;">
                    Refuser
                </button>
                <a href="politique-confidentialite.html" target="_blank" style="color:#C9A96E; text-decoration:underline; align-self:center;">
                    En savoir plus
                </a>
            </div>
        </div>
    `;

    document.body.appendChild(banner);
}

function acceptAllCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-banner').remove();
    console.log('%c✅ Cookies acceptés par l\'utilisateur', 'color: #22c55e');
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    document.getElementById('cookie-banner').remove();
    console.log('%c❌ Cookies refusés', 'color: #ef4444');
}

// Lancer le banner au chargement
document.addEventListener('DOMContentLoaded', showCookieConsent);
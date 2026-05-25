// ===== DONNÉES SIMULÉES DOUALA =====
const donneesHoraires = [120, 200, 180, 150, 300, 850, 1400, 1200, 900, 700, 650, 800, 950, 700, 600, 650, 1100, 1500, 1300, 900, 600, 400, 250, 150]
const heures = ['0h','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h','13h','14h','15h','16h','17h','18h','19h','20h','21h','22h','23h']
const donneesJours = [850, 1200, 1150, 1300, 1400, 600, 300]
const jours = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']
const or = '#C9A96E'
const orClair = 'rgba(201,169,110,0.15)'

// ===== GRAPHIQUE HORAIRE =====
const ctxHoraire = document.getElementById('chartHoraire')
if(ctxHoraire) {
    new Chart(ctxHoraire, {
        type: 'line',
        data: {
            labels: heures,
            datasets: [{
                label: 'Vehicules/heure',
                data: donneesHoraires,
                borderColor: or,
                backgroundColor: orClair,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: or,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: '#F0F0F0' }, ticks: { font: { size: 11 } } },
                y: { grid: { color: '#F0F0F0' }, ticks: { font: { size: 11 } } }
            }
        }
    })
}

// ===== GRAPHIQUE JOURS =====
const ctxJours = document.getElementById('chartJours')
if(ctxJours) {
    new Chart(ctxJours, {
        type: 'bar',
        data: {
            labels: jours,
            datasets: [{
                label: 'Volume moyen',
                data: donneesJours,
                backgroundColor: orClair,
                borderColor: or,
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: '#F0F0F0' } }
            }
        }
    })
}

// ===== GRAPHIQUE TYPES =====
const ctxTypes = document.getElementById('chartTypes')
if(ctxTypes) {
    new Chart(ctxTypes, {
        type: 'doughnut',
        data: {
            labels: ['Voitures', 'Motos', 'Taxis', 'Bus', 'Camions'],
            datasets: [{
                data: [45, 25, 18, 8, 4],
                backgroundColor: ['#C9A96E','#1A0A00','#8B6E52','#E8D5B0','#555'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom', labels: { font: { size: 12 } } } }
        }
    })
}

// ===== REPONSES FLOW =====
const reponsesFlow = {
    'ndokotti': 'Trafic modere a Ndokotti. Temps estime : 28 min depuis Akwa. Passez par le Boulevard de la Liberte.',
    'akwa': 'Akwa est fluide en ce moment. Vitesse moyenne : 35 km/h. Bon moment pour circuler.',
    'deido': 'Attention ! Deido est fortement congestionne. Temps attente : 35 min. Evitez avant 19h.',
    'bonanjo': 'Bonanjo est accessible. Trafic fluide sur axe principal. Duree depuis Akwa : 12 min.',
    'bessengue': 'Bessengue est la station la plus chargee avec 45% du volume total. Heure de pointe : 18h15.',
    'trafic': 'Situation globale : 3 axes fluides, 2 moderes, 1 bloque. Pic prevu a 18h30 sur Deido.',
    'bonjour': 'Bonjour ! Je suis FLOW, votre assistant trafic a Douala. Posez-moi une question.',
    'itineraire': 'Pour un itineraire, precisez depart et destination. Ex : Akwa vers Logbassa.',
    'logbassa': 'Logbassa : trafic fluide. Excellent moment pour y aller. Duree depuis Akwa : 18 min.',
    'bonapriso': 'Bonapriso : fluide. Trajet court depuis Akwa, environ 8 minutes.',
    'makepe': 'Makepe : trafic modere. Preferez partir avant 7h30 ou apres 9h.'
}

// CONNEXION SUPABASE
const supabaseClient = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY)

// CHARGER DONNÉES TRAFIC DEPUIS SUPABASE
async function chargerTrafic() {
    try {
        const { data, error } = await supabaseClient
            .from('trafic')
            .select('*')
            .order('timestamp', { ascending: false })

        if(error) return

        // Mettre à jour les cartes de trafic sur index.html
        const cartes = document.querySelectorAll('.card')
        if(cartes.length > 0 && data.length > 0) {
            data.slice(0, 3).forEach((item, i) => {
                if(cartes[i]) {
                    cartes[i].querySelector('.card-label').textContent = item.station.toUpperCase()
                    const val = cartes[i].querySelector('.card-val')
                    val.textContent = item.niveau.charAt(0).toUpperCase() + item.niveau.slice(1)
                    val.className = 'card-val ' + (item.niveau === 'fluide' ? 'green' : item.niveau === 'modere' ? 'amber' : 'red')
                }
            })
        }
    } catch(err) {
        console.log('Supabase non disponible, donnees simulees utilisees')
    }
}

window.addEventListener('load', function() {
    chargerTrafic()
})

let flowOpen = false
let flowMessages = []
let isDragging = false
let dragOffset = { x: 0, y: 0 }

const flowResponses = {
    'akwa': 'Akwa est généralement fluide le matin. Vérifiez la carte en temps réel pour l\'heure actuelle.',
    'deido': '⚠️ Deido connaît souvent des embouteillages entre 17h-19h. Évitez cette zone à ces heures.',
    'trafic': 'Le trafic est actuellement modéré à Douala. Les axes principaux sont surveillés en direct.',
    'incident': 'Aucun incident majeur signalé pour l\'instant. Consultez la communauté pour les alertes locales.',
    'itineraire': 'Utilisez la carte pour planifier votre itinéraire optimal. FLOW vous propose le meilleur chemin.',
    'bonjour': 'Bonjour ! Je suis FLOW, assistant IA de TrafficFlow. Comment puis-je vous aider ?',
    'aide': 'Je peux vous aider sur : le trafic à Douala, les itinéraires, les zones embouteillées, incidents. Posez votre question !',
    'default': 'Je comprends votre question. Consultez la carte en direct ou les statistiques pour plus de détails.'
}

function toggleFlow() {
    flowOpen = !flowOpen
    const win = document.getElementById('flowWindow')
    if(win) {
        win.classList.toggle('open', flowOpen)
        if(flowOpen) document.getElementById('flowInput').focus()
    }
}

function envoyerFlow() {
    const input = document.getElementById('flowInput')
    const messages = document.getElementById('flowMessages')
    const question = input.value.trim()
    if(!question) return

    flowMessages.push({ role: 'user', text: question })
    messages.innerHTML += `<div class="flow-msg-bubble user"><div class="bubble">${question}</div></div>`
    input.value = ''
    messages.scrollTop = messages.scrollHeight

    setTimeout(() => {
        const q = question.toLowerCase()
        const cle = Object.keys(flowResponses).find(k => q.includes(k))
        const reponse = flowResponses[cle] || flowResponses.default

        flowMessages.push({ role: 'bot', text: reponse })
        messages.innerHTML += `<div class="flow-msg-bubble bot"><div class="bubble">${reponse}</div></div>`
        messages.scrollTop = messages.scrollHeight
    }, 700)
}

// DRAG & DROP FLOW
document.addEventListener('mousedown', function(e) {
    const header = document.querySelector('.flow-window-header')
    if(!header || !header.contains(e.target)) return
    isDragging = true
    const win = document.getElementById('flowWindow')
    const rect = win.getBoundingClientRect()
    dragOffset.x = e.clientX - rect.left
    dragOffset.y = e.clientY - rect.top
})

document.addEventListener('mousemove', function(e) {
    if(!isDragging) return
    const win = document.getElementById('flowWindow')
    const x = e.clientX - dragOffset.x
    const y = e.clientY - dragOffset.y
    win.style.position = 'fixed'
    win.style.left = x + 'px'
    win.style.top = y + 'px'
})

document.addEventListener('mouseup', function() {
    isDragging = false
})

// TOUCH DRAG (mobile)
let touchStart = { x: 0, y: 0 }
document.addEventListener('touchstart', function(e) {
    const header = document.querySelector('.flow-window-header')
    if(!header || !header.contains(e.target)) return
    isDragging = true
    const win = document.getElementById('flowWindow')
    const rect = win.getBoundingClientRect()
    touchStart.x = e.touches[0].clientX - rect.left
    touchStart.y = e.touches[0].clientY - rect.top
}, { passive: true })

document.addEventListener('touchmove', function(e) {
    if(!isDragging) return
    const win = document.getElementById('flowWindow')
    const x = e.touches[0].clientX - touchStart.x
    const y = e.touches[0].clientY - touchStart.y
    win.style.position = 'fixed'
    win.style.left = x + 'px'
    win.style.top = y + 'px'
}, { passive: true })

document.addEventListener('touchend', function() {
    isDragging = false
})

// ===== FILTRES =====
function appliquerFiltres() {
    const station = document.getElementById('station').value
    alert(`Filtres appliques pour : ${station}`)
}
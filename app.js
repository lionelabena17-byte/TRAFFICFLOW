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

// ===== FLOW =====
let flowOpen = false
let isDragging = false
let dragOffset = { x: 0, y: 0 }

const flowResponses = {
    'ndokotti': 'Trafic modéré à Ndokotti. Temps estimé: 28 min depuis Akwa.',
    'akwa': 'Akwa est fluide. Vitesse moyenne: 35 km/h.',
    'deido': '⚠️ Deido congestionné. Évitez avant 19h.',
    'bonanjo': 'Bonanjo fluide. Durée depuis Akwa: 12 min.',
    'bessengue': 'Bessengue est chargée. Heure de pointe: 18h15.',
    'trafic': 'Situation globale: 3 axes fluides, 2 modérés, 1 bloqué.',
    'bonjour': 'Bonjour! Je suis FLOW, assistant IA de TrafficFlow.',
    'itineraire': 'Pour un itinéraire, précisez départ et destination.',
    'logbassa': 'Logbassa fluide. Durée depuis Akwa: 18 min.',
    'bonapriso': 'Bonapriso fluide. Durée: 8 minutes.',
    'makepe': 'Makepe modéré. Partez avant 7h30 ou après 9h.',
    'aide': 'Je peux vous aider sur le trafic, itinéraires, incidents.',
    'default': 'Consultez la carte en direct ou les statistiques.'
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

    messages.innerHTML += `<div class="flow-msg-bubble user"><div class="bubble">${question}</div></div>`
    input.value = ''
    messages.scrollTop = messages.scrollHeight

    setTimeout(() => {
        const q = question.toLowerCase()
        const cle = Object.keys(flowResponses).find(k => q.includes(k))
        const reponse = flowResponses[cle] || flowResponses.default
        messages.innerHTML += `<div class="flow-msg-bubble bot"><div class="bubble">${reponse}</div></div>`
        messages.scrollTop = messages.scrollHeight
    }, 700)
}

// DRAG FLOW
document.addEventListener('mousedown', e => {
    const header = document.querySelector('.flow-window-header')
    if(!header || !header.contains(e.target)) return
    isDragging = true
    const win = document.getElementById('flowWindow')
    const rect = win.getBoundingClientRect()
    dragOffset.x = e.clientX - rect.left
    dragOffset.y = e.clientY - rect.top
})

document.addEventListener('mousemove', e => {
    if(!isDragging) return
    const win = document.getElementById('flowWindow')
    win.style.position = 'fixed'
    win.style.left = (e.clientX - dragOffset.x) + 'px'
    win.style.top = (e.clientY - dragOffset.y) + 'px'
})

document.addEventListener('mouseup', () => { isDragging = false })

// TOUCH DRAG
let touchStart = { x: 0, y: 0 }
document.addEventListener('touchstart', e => {
    const header = document.querySelector('.flow-window-header')
    if(!header || !header.contains(e.target)) return
    isDragging = true
    const win = document.getElementById('flowWindow')
    const rect = win.getBoundingClientRect()
    touchStart.x = e.touches[0].clientX - rect.left
    touchStart.y = e.touches[0].clientY - rect.top
}, { passive: true })

document.addEventListener('touchmove', e => {
    if(!isDragging) return
    const win = document.getElementById('flowWindow')
    win.style.position = 'fixed'
    win.style.left = (e.touches[0].clientX - touchStart.x) + 'px'
    win.style.top = (e.touches[0].clientY - touchStart.y) + 'px'
}, { passive: true })

document.addEventListener('touchend', () => { isDragging = false })

// ===== FILTRES =====
function appliquerFiltres() {
    const station = document.getElementById('station').value
    alert(`Filtres appliqués pour: ${station}`)
}
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

// ===== FLOW TOGGLE =====
let isDragging = false

function toggleFlow() {
    if(isDragging) return
    const win = document.getElementById('flowWindow')
    win.classList.toggle('open')
}

// ===== FLOW ENVOYER =====
function envoyerFlow() {
    const input = document.getElementById('flowInput')
    const messages = document.getElementById('flowMessages')
    const question = input.value.trim()
    if(!question) return

    messages.innerHTML += `<div class="flow-msg-bubble user"><div class="bubble">${question}</div></div>`
    input.value = ''

    messages.innerHTML += `<div class="flow-msg-bubble bot" id="flowTyping"><div class="bubble">FLOW analyse...</div></div>`
    messages.scrollTop = messages.scrollHeight

    setTimeout(function() {
        const cle = Object.keys(reponsesFlow).find(function(k) {
            return question.toLowerCase().includes(k)
        })
        const reponse = cle ? reponsesFlow[cle] : "Je n'ai pas de donnees pour cette requete. Essayez : Akwa, Deido, Ndokotti, Bonanjo, Bessengue."
        const typing = document.getElementById('flowTyping')
        if(typing) typing.remove()
        messages.innerHTML += `<div class="flow-msg-bubble bot"><div class="bubble">${reponse}</div></div>`
        messages.scrollTop = messages.scrollHeight
    }, 800)
}

// ===== FLOW DRAGGABLE =====
window.addEventListener('load', function() {
    const btn = document.querySelector('.flow-btn')
    if(!btn) return

    let startX, startY, startLeft, startTop

    btn.addEventListener('mousedown', function(e) {
        isDragging = false
        const rect = btn.getBoundingClientRect()
        startX = e.clientX
        startY = e.clientY
        startLeft = rect.left
        startTop = rect.top
        btn.style.right = 'auto'
        btn.style.bottom = 'auto'
        btn.style.left = startLeft + 'px'
        btn.style.top = startTop + 'px'
        document.addEventListener('mousemove', onDrag)
        document.addEventListener('mouseup', stopDrag)
        e.preventDefault()
    })

    function onDrag(e) {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        if(Math.abs(dx) > 5 || Math.abs(dy) > 5) isDragging = true
        if(isDragging) {
            btn.style.left = (startLeft + dx) + 'px'
            btn.style.top = (startTop + dy) + 'px'
        }
    }

    function stopDrag() {
        document.removeEventListener('mousemove', onDrag)
        document.removeEventListener('mouseup', stopDrag)
    }

    btn.addEventListener('touchstart', function(e) {
        const touch = e.touches[0]
        const rect = btn.getBoundingClientRect()
        startX = touch.clientX
        startY = touch.clientY
        startLeft = rect.left
        startTop = rect.top
        btn.style.right = 'auto'
        btn.style.bottom = 'auto'
        btn.style.left = startLeft + 'px'
        btn.style.top = startTop + 'px'
    }, { passive: true })

    btn.addEventListener('touchmove', function(e) {
        const touch = e.touches[0]
        btn.style.left = (touch.clientX - startX + startLeft) + 'px'
        btn.style.top = (touch.clientY - startY + startTop) + 'px'
        e.preventDefault()
    }, { passive: false })
})

// ===== FILTRES =====
function appliquerFiltres() {
    const station = document.getElementById('station').value
    alert(`Filtres appliques pour : ${station}`)
}
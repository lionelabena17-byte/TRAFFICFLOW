document.addEventListener('DOMContentLoaded', () => {

  // 1. Évolution horaire
  const ctxEvolution = document.getElementById('chartEvolution') || document.getElementById('chartHoraireStats');
  if(ctxEvolution) {
    new Chart(ctxEvolution, {
      type: 'line',
      data: {
        labels: ['6h','7h','8h','9h','10h','12h','14h','16h','17h','18h','19h','20h'],
        datasets: [{
          label: 'Trafic actuel',
          data: [30, 65, 90, 75, 55, 60, 50, 70, 85, 95, 80, 45],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34,197,94,0.1)',
          tension: 0.4,
          fill: true
        },{
          label: 'Moyenne historique',
          data: [35, 60, 85, 70, 52, 58, 48, 68, 82, 90, 75, 42],
          borderColor: '#C9A96E',
          borderDash: [5,5],
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#F0F0F0' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // 2. Répartition véhicules
  const ctxTypes = document.getElementById('chartTypes') || document.getElementById('chartTypesStats');
  if(ctxTypes) {
    new Chart(ctxTypes, {
      type: 'doughnut',
      data: {
        labels: ['Voitures','Motos','Taxis','Camions','Bus'],
        datasets: [{
          data: [45, 25, 18, 8, 4],
          backgroundColor: ['#22c55e','#C9A96E','#eab308','#ef4444','#1A0A00'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  // 3. Comparaison semaine
  const ctxJours = document.getElementById('chartJours') || document.getElementById('chartSemaine');
  if(ctxJours) {
    new Chart(ctxJours, {
      type: 'bar',
      data: {
        labels: ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
        datasets: [{
          label: 'Volume moyen',
          data: [850, 1200, 1150, 1300, 1400, 600, 300],
          backgroundColor: 'rgba(201,169,110,0.2)',
          borderColor: '#C9A96E',
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: '#F0F0F0' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // 4. Radar congestion
  const ctxCongestion = document.getElementById('chartCongestion');
  if(ctxCongestion) {
    new Chart(ctxCongestion, {
      type: 'radar',
      data: {
        labels: ['Akwa','Bonanjo','Deido','Ndokotti','Bessengue','Makepe'],
        datasets: [{
          label: 'Congestion %',
          data: [45, 30, 90, 65, 85, 55],
          backgroundColor: 'rgba(201,169,110,0.2)',
          borderColor: '#C9A96E',
          borderWidth: 2,
          pointBackgroundColor: '#C9A96E'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  // 5. Graphique horaire dashboard
  const ctxHoraire = document.getElementById('chartHoraire');
  if(ctxHoraire) {
    new Chart(ctxHoraire, {
      type: 'line',
      data: {
        labels: ['0h','2h','4h','6h','8h','10h','12h','14h','16h','18h','20h','22h'],
        datasets: [{
          data: [120,150,100,200,850,1200,950,700,800,1500,900,400],
          borderColor: '#C9A96E',
          backgroundColor: 'rgba(201,169,110,0.15)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: '#F0F0F0' } },
          y: { grid: { color: '#F0F0F0' } }
        }
      }
    });
  }

});
const years = Array.from({
  length: 51
}, (_, i) => i);
// Randomly generated data for simulation
const generateData = (year) => {
  if (year < 10) return Math.random() * 1000; // Pre-industrial era
  if (year < 20) return Math.random() * 500 + 1000; // Growth
  if (year < 30) return Math.random() * 1000 + 2000; // Success
  return Math.random() * 500 + 3000; // Decline
};
const gdpData = years.map(generateData);
const povertyData = years.map((year) => year < 10 ? Math.random() * 50 : year < 20 ? Math.random() * 30 : year < 30 ? Math.random() * 20 : Math.random() * 50 + 30);
const qualityData = years.map((year) => {
  if (year < 10) return Math.random() * 30; // Pre-industrial era
  if (year < 20) return Math.random() * 20 + 30; // Growth
  if (year < 30) return Math.random() * 30 + 50; // Success
  return Math.random() * 20 + 10; // Decline
});
const inequalityData = years.map((year) => year < 10 ? Math.random() * 10 : year < 20 ? Math.random() * 20 : year < 30 ? Math.random() * 30 : Math.random() * 50 + 30);
const mobilityData = years.map((year) => year < 10 ? Math.random() * 30 : year < 20 ? Math.random() * 20 + 30 : year < 30 ? Math.random() * 10 + 20 : Math.random() * 10);
// Smoothing function
const smoothData = (data, factor) => {
  const smoothed = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      smoothed.push(data[i]);
    } else {
      const smoothedValue = (1 - factor) * data[i] + factor * smoothed[i - 1];
      smoothed.push(smoothedValue);
    }
  }
  return smoothed;
};
// Chart configurations
const createChart = (ctx, label, data) => {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: label,
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Years'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
};
// Create individual charts
let gdpChart = createChart(document.getElementById('gdpChart'), 'GDP Over Time', gdpData);
let povertyChart = createChart(document.getElementById('povertyChart'), 'Poverty Rates Over Time', povertyData);
let qualityChart = createChart(document.getElementById('qualityChart'), 'Quality of Life Over Time', qualityData);
let inequalityChart = createChart(document.getElementById('inequalityChart'), 'Inequality Over Time', inequalityData);
let mobilityChart = createChart(document.getElementById('mobilityChart'), 'Economic Mobility Over Time', mobilityData);
// Create combined chart
const createCombinedChart = (ctx) => {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: 'Poverty Rates',
        data: povertyData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.1
      }, {
        label: 'Quality of Life',
        data: qualityData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.1
      }, {
        label: 'Inequality',
        data: inequalityData,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        tension: 0.1
      }, {
        label: 'Economic Mobility',
        data: mobilityData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Years'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
};
// Create combined chart
let combinedChart = createCombinedChart(document.getElementById('combinedChart'));
// Update charts with smoothing
function updateCharts() {
  const smoothingFactor = parseFloat(document.getElementById('smoothing').value);
  document.getElementById('smoothingRate').textContent = smoothingFactor.toFixed(1);
  gdpChart.data.datasets[0].data = smoothData(gdpData, smoothingFactor);
  povertyChart.data.datasets[0].data = smoothData(povertyData, smoothingFactor);
  qualityChart.data.datasets[0].data = smoothData(qualityData, smoothingFactor);
  inequalityChart.data.datasets[0].data = smoothData(inequalityData, smoothingFactor);
  mobilityChart.data.datasets[0].data = smoothData(mobilityData, smoothingFactor);
  combinedChart.data.datasets[0].data = smoothData(povertyData, smoothingFactor);
  combinedChart.data.datasets[1].data = smoothData(qualityData, smoothingFactor);
  combinedChart.data.datasets[2].data = smoothData(inequalityData, smoothingFactor);
  combinedChart.data.datasets[3].data = smoothData(mobilityData, smoothingFactor);
  gdpChart.update();
  povertyChart.update();
  qualityChart.update();
  inequalityChart.update();
  mobilityChart.update();
  combinedChart.update();
}
// Apply settings on page load
updateCharts();
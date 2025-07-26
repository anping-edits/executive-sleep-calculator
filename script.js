function calculateSleepEfficiency() {
  const timeInBedHours = parseInt(document.getElementById('timeInBedHours').value) || 0;
  const timeInBedMinutes = parseInt(document.getElementById('timeInBedMinutes').value) || 0;
  const timeToFallAsleep = parseInt(document.getElementById('timeToFallAsleep').value) || 0;
  const timeAwakeDuringNight = parseInt(document.getElementById('timeAwakeDuringNight').value) || 0;

  const totalTimeInBed = (timeInBedHours * 60) + timeInBedMinutes;

  if (totalTimeInBed === 0) {
    alert('Please enter the total time spent in bed.');
    return;
  }

  if (timeToFallAsleep + timeAwakeDuringNight >= totalTimeInBed) {
    alert('Awake time cannot exceed time in bed.');
    return;
  }

  const actualSleepTime = totalTimeInBed - timeToFallAsleep - timeAwakeDuringNight;
  const sleepEfficiency = Math.round((actualSleepTime / totalTimeInBed) * 100);

  displayResults(sleepEfficiency, totalTimeInBed, actualSleepTime, timeToFallAsleep, timeAwakeDuringNight);
}

function displayResults(efficiency, totalTime, actualSleep, fallAsleepTime, awakeTime) {
  const resultDiv = document.getElementById('efficiencyResult');
  const percentageDiv = document.getElementById('efficiencyPercentage');
  const breakdownDiv = document.getElementById('sleepBreakdown');
  const interpretationDiv = document.getElementById('efficiencyInterpretation');

  percentageDiv.textContent = efficiency + '%';

  const actualSleepHours = Math.floor(actualSleep / 60);
  const actualSleepMinutes = actualSleep % 60;
  const totalHours = Math.floor(totalTime / 60);
  const totalMinutes = totalTime % 60;

  breakdownDiv.innerHTML = `
    <p><strong>Sleep Breakdown:</strong></p>
    <p>Total time in bed: ${totalHours}h ${totalMinutes}m</p>
    <p>Time to fall asleep: ${fallAsleepTime} minutes</p>
    <p>Time awake during night: ${awakeTime} minutes</p>
    <p>Actual sleep time: ${actualSleepHours}h ${actualSleepMinutes}m</p>
  `;

  let interpretation = '';
  let recommendationColor = '';

  if (efficiency >= 85) {
    interpretation = '🌟 Excellent sleep efficiency!';
    recommendationColor = '#038E92';
  } else if (efficiency >= 75) {
    interpretation = '👍 Good sleep efficiency. Room to improve.';
    recommendationColor = '#42B7DA';
  } else {
    interpretation = '⚠️ Poor sleep efficiency. Revisit your routine.';
    recommendationColor = '#35555A';
  }

  interpretationDiv.innerHTML = `<strong>Assessment:</strong> ${interpretation}`;
  interpretationDiv.style.backgroundColor = recommendationColor;
  interpretationDiv.style.color = 'white';

  resultDiv.classList.add('show');
}

window.addEventListener('load', () => {
  document.getElementById('timeInBedHours').value = '7';
  document.getElementById('timeInBedMinutes').value = '0';
  document.getElementById('timeToFallAsleep').value = '25';
  document.getElementById('timeAwakeDuringNight').value = '25';
});

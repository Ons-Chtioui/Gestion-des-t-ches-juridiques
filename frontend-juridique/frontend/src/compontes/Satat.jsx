import React, { useState } from 'react';
import Chart from 'chart.js/auto';

function Satat() {
  const [numUnits, setNumUnits] = useState(5);
  const [unitType, setUnitType] = useState('année');
  const [data, setData] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

  const handleNumUnitsChange = (e) => {
    const newNumUnits = parseInt(e.target.value);
    setNumUnits(newNumUnits);
    setData(generateInitialData(newNumUnits, unitType));
  };

  const handleUnitTypeChange = (e) => {
    const newUnitType = e.target.value;
    setUnitType(newUnitType);
    setData(generateInitialData(numUnits, newUnitType));
  };

  const generateInitialData = (numUnits, unitType) => {
    const initialData = {};
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    for (let i = 0; i < numUnits; i++) {
      if (unitType === 'année') {
        initialData[currentYear] = 100; // Prix initial par défaut
        currentYear++;
      } else if (unitType === 'mois') {
        initialData[`${currentYear}-${currentMonth}`] = 100; // Prix initial par défaut
        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
      }
    }
    return initialData;
  };

  const handlePriceChange = (yearMonth, value) => {
    setData(prevData => ({
      ...prevData,
      [yearMonth]: parseFloat(value)
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    drawChart();
  };

  const drawChart = () => {
    const labels = Object.keys(data);
    const prices = Object.values(data);

    const ctx = document.getElementById('priceChart');

    if (chartInstance) {
      chartInstance.destroy(); // Détruire le graphique précédent s'il existe
    }

    setChartInstance(new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Augmentation des prix',
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond de la ligne
            borderWidth: 2, // Épaisseur de la ligne
            tension: 0.1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Evolution des prix au fil du temps', // Titre du graphique
              font: {
                size: 18,
                family: 'Arial',
                weight: 'bold'
              }
            },
            legend: {
              display: true,
              labels: {
                font: {
                  size: 14
                }
              }
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Prix (en euros)', // Titre de l'axe Y
                font: {
                  size: 16
                }
              },
              ticks: {
                font: {
                  size: 14
                }
              }
            },
            x: {
              title: {
                display: true,
                text: unitType === 'année' ? 'Année' : 'Mois', // Titre de l'axe X
                font: {
                  size: 16
                }
              },
              ticks: {
                font: {
                  size: 14
                }
              }
            }
          }
        }
      }));
    }
  return (
    <div>
      <h2>Visualisation de l'augmentation des prix par {unitType}</h2>
      <label>
        Nombre de {unitType}s :
        <input type="number" value={numUnits} onChange={handleNumUnitsChange} min="1" />
      </label>
      <select value={unitType} onChange={handleUnitTypeChange}>
        <option value="année">Année</option>
        <option value="mois">Mois</option>
      </select>
      <form onSubmit={handleSubmit}>
        {Object.keys(data).map(yearMonth => (
          <div key={yearMonth}>
            <label>
              {unitType === 'année' ? `Année ${yearMonth}` : `Mois ${yearMonth}`} :
              <input type="number" value={data[yearMonth]} onChange={(e) => handlePriceChange(yearMonth, e.target.value)} />
            </label>
          </div>
        ))}
        <button type="submit">Afficher le graphique</button>
      </form>
      <canvas id="priceChart" width="400" height="400"></canvas>
    </div>
  );
}

export default Satat;

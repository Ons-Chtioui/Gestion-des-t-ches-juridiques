import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import './StatAffaire.css';
import Layout from './Layout';
import './fan.css';

function StatPlant() {
  const [affaires, setAffaires] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      drawChart();
    } else {
      drawChartAllDates();
    }
  }, [startDate, endDate, affaires]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3020/api/affaire');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données des affaires');
      }
      const jsonData = await response.json();
      setAffaires(jsonData);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const drawChartAllDates = () => {
    const affairesList = getAffairesList(affaires);
    const labels = affairesList.map(affaire => `${affaire.plant}`);
    const dataSets = affairesList.map(affaire => affaire.nombres);

    setChartOptions({
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: labels,
      },
      title: {
        text: 'Comparaison des nombres d\'affaires pour chaque plant',
        align: 'center',
        style: {
          fontSize: '18px',
          fontFamily: 'Arial',
          fontWeight: 'bold',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      colors: randomColors(dataSets.length), // Assigner des couleurs aléatoires
    });

    setChartSeries([{
      name: 'Nombre d\'affaires par plante',
      data: dataSets,
    }]);
  };

  const drawChart = () => {
    const filteredAffaires = affaires.filter(affaire => {
      const affaireDate = new Date(affaire.dateCreation).getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      const endTimestamp = end.getTime();
      return affaireDate >= start && affaireDate <= endTimestamp;
    });

    const affairesList = getAffairesList(filteredAffaires);
    const labels = affairesList.map(affaire => `${affaire.plant}`);
    const dataSets = affairesList.map(affaire => affaire.nombres);

    setChartOptions({
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: labels,
      },
      title: {
        text: 'Comparaison des nombres d\'affaires pour chaque plant',
        align: 'center',
        style: {
          fontSize: '18px',
          fontFamily: 'Arial',
          fontWeight: 'bold',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      colors: randomColors(dataSets.length), // Assigner des couleurs aléatoires
    });

    setChartSeries([{
      name: 'Nombre d\'affaires par plante',
      data: dataSets,
    }]);
  };

  const getAffairesList = (affairesData) => {
    const plantMap = new Map();
    affairesData.forEach(affaire => {
      const plant = affaire.plant;
      if (plantMap.has(plant)) {
        plantMap.set(plant, plantMap.get(plant) + 1);
      } else {
        plantMap.set(plant, 1);
      }
    });
    return Array.from(plantMap, ([plant, nombres]) => ({ plant, nombres }));
  };

  const randomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`);
    }
    return colors;
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <Layout>
      <div className="stat-container">
        <h2>Comparaison des nombres d'affaires pour chaque plant</h2>
        <form>
          <label htmlFor="startDate">Date de début :</label>
          <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} required />
          <label htmlFor="endDate">Date de fin :</label>
          <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} required />
        </form>
        <ApexCharts
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={500}
        />
      </div>
    </Layout>
  );
}

export default StatPlant;

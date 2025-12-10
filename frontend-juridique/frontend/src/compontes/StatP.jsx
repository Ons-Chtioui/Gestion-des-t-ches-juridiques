import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import './StatAffaire.css';
import Layout from './Layout';

function StatP() {
  const [affaires, setAffaires] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate && selectedPlant) {
      drawChart();
    } else {
      drawChartAllDates();
    }
  }, [startDate, endDate, selectedPlant, affaires]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3020/api/affaire');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données des affaires');
      }
      const jsonData = await response.json();
      setAffaires(jsonData);
      // Si vous souhaitez afficher toutes les données dès le chargement de la page
      drawChartAllDates(jsonData);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const drawChartAllDates = (data) => {
    const chartData = generateChartData(data || affaires);
    setOptions(chartData.options);
    setSeries(chartData.series);
  };

  const drawChart = () => {
    const chartData = generateChartData(affaires);
    setOptions(chartData.options);
    setSeries(chartData.series);
  };

  const generateChartData = (affairesData) => {
    let filteredAffaires = affairesData;

    if (selectedPlant) {
      filteredAffaires = filteredAffaires.filter(affaire => affaire.plant === selectedPlant);
    }

    if (startDate && endDate) {
      filteredAffaires = filteredAffaires.filter(affaire => {
        const affaireDate = new Date(affaire.dateCreation).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1);
        const endTimestamp = end.getTime();
        return affaireDate >= start && affaireDate <= endTimestamp;
      });
    }

    const affairesByStatus = groupAffairesByStatus(filteredAffaires);
    const labels = Object.keys(affairesByStatus);
    const data = Object.values(affairesByStatus);

    const chartOptions = {
      chart: {
        type: 'line',
        height: 350,
        fontFamily: 'Arial, sans-serif',
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Nombre d\'affaires',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif'
          }
        },
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      title: {
        text: selectedPlant ? `Comparaison des nombres d'affaires pour le plant ${selectedPlant}` : 'Comparaison des nombres d\'affaires pour tous les plants',
        align: 'left',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif'
        }
      },
      stroke: {
        curve: 'smooth',
        colors: ['#C7794B'],
        width: 3
      }
    };

    const chartSeries = [{ data: data }];

    return { options: chartOptions, series: chartSeries };
  };

  const groupAffairesByStatus = (affairesData) => {
    const affairesByStatus = {};
    affairesData.forEach(affaire => {
      const status = affaire.status;
      affairesByStatus[status] = affairesByStatus[status] ? affairesByStatus[status] + 1 : 1;
    });
    return affairesByStatus;
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handlePlantChange = (event) => {
    setSelectedPlant(event.target.value);
  };

  return (
    <Layout>
      <div className="stat-container">
        <h2>Comparaison des nombres d'affaires pour chaque plant</h2>
        <form>
          <label htmlFor="plant">Choisir votre Plant :</label>
          <select id="plant" value={selectedPlant} onChange={handlePlantChange}>
            <option>Choisir votre Plant</option>
            <option value="MH1">MH1</option>
            <option value="MH2">MH2</option>
            <option value="AUDI">AUDI</option>
            <option value="OEM">OEM</option>
            <option value="BMW">BMW</option>
            <option value="VW">VW</option>
          </select>
          <label htmlFor="startDate">Date de début :</label>
          <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} required />
          <label htmlFor="endDate">Date de fin :</label>
          <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} required />
        </form>
        <ReactApexChart options={options} series={series} type="area" height={500} />
      </div>
    </Layout>
  );
}

export default StatP;

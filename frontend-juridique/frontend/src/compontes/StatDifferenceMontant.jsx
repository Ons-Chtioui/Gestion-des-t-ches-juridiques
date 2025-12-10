import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import './StatAffaire.css';
import NavBar from './NavBar';
import Layout from './Layout';
import './fan.css';

function StatDifferenceMontant() {
  const [affaires, setAffaires] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [customYear, setCustomYear] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const year = selectedYear === 'custom' ? customYear : selectedYear;
    if (year) {
      calculateMonthlyTotals(affaires, year);
    }
  }, [selectedYear, customYear, affaires]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3020/api/affaire');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données des affaires');
      }
      const jsonData = await response.json();
      setAffaires(jsonData);
      extractYears(jsonData);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const extractYears = (data) => {
    const allYears = Array.from(new Set(data.map(affaire => new Date(affaire.dateCreation).getFullYear())));
    const recentYears = allYears.sort((a, b) => b - a).slice(0, 5); // Les 5 années les plus récentes
    setYears(recentYears);
    setSelectedYear(recentYears[0]); // Select the first year by default
  };

  const calculateMonthlyTotals = (data, year) => {
    const filteredData = data.filter(affaire => new Date(affaire.dateCreation).getFullYear() === parseInt(year));
    const totalsByMonth = filteredData.reduce((acc, affaire) => {
      const date = new Date(affaire.dateCreation);
      const month = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;
      if (!acc[month]) {
        acc[month] = { montantGlobal: 0, montantEntrant: 0 };
      }
      acc[month].montantGlobal += affaire.montantGlobal;
      acc[month].montantEntrant += affaire.montantEntrant;
      return acc;
    }, {});
    setMonthlyData(totalsByMonth);
  };

  const drawChart = () => {
    const months = Object.keys(monthlyData);
    const montantGlobalTotals = months.map(month => monthlyData[month].montantGlobal);
    const montantEntrantTotals = months.map(month => monthlyData[month].montantEntrant);
    const resteTotals = months.map(month => monthlyData[month].montantGlobal - monthlyData[month].montantEntrant);

    const pieChartOptions = {
      chart: {
        type: 'pie'
      },
      labels: ['Montant Global', 'Montant Entrant', 'Reste'],
      colors: ['#FF6384', '#36A2EB', '#4BC0C0'],
      title: {
        text: `Différence entre le montant global et le montant entrant en ${selectedYear === 'custom' ? customYear : selectedYear}`,
        align: 'center'
      }
    };

    const barChartOptions = {
      chart: {
        type: 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: months,
      },
      title: {
        text: `Différence entre le montant global et le montant entrant par mois en ${selectedYear === 'custom' ? customYear : selectedYear}`,
        align: 'center'
      }
    };

    const series = [
      {
        name: 'Montant Global',
        data: montantGlobalTotals,
      },
      {
        name: 'Montant Entrant',
        data: montantEntrantTotals,
      },
      {
        name: 'Reste',
        data: resteTotals,
      }
    ];

    return { pieChartOptions, barChartOptions, series };
  };

  const { pieChartOptions, barChartOptions, series } = drawChart();

  return (
    <Layout>
      <div>
        <div className="stat-container">
          <h2>Différence entre le montant global et le montant entrant par mois</h2>
          <div className="year-selector">
            <label htmlFor="year">Sélectionner une année : </label>
            <select id="year" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
              <option value="custom">Entrer une année</option>
            </select>
            {selectedYear === 'custom' && (
              <input
                type="number"
                placeholder="Entrer une année"
                value={customYear}
                onChange={e => setCustomYear(e.target.value)}
              />
            )}
          </div>
          <div id="statf" className="charts-container canvas-container">
            <ApexCharts options={pieChartOptions} series={series.map(serie => serie.data.reduce((a, b) => a + b, 0))} type="pie" height={500} width={600} />
            <ApexCharts options={barChartOptions} series={series} type="bar" height={500} width={600} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default StatDifferenceMontant;

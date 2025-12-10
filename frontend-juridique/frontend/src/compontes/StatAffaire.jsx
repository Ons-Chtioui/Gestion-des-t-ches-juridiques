import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import './StatAffaire.css';
import NavBar from './NavBar';
import Layout from './Layout';

function StatAffaire() {
  const [timePeriod, setTimePeriod] = useState('day');
  const [data, setData] = useState({});
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetchData();
  }, [timePeriod]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3020/api/affaire?period=${timePeriod}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données des affaires');
      }
      const jsonData = await response.json();
      const generatedData = generateInitialData(jsonData, timePeriod);
      setData(generatedData.data);
      setOptions(generatedData.options);
      setSeries(generatedData.series);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const generateInitialData = (jsonData, period) => {
    const initialData = {};
    const currentDate = new Date();
  
    // Définir la période de début en fonction de la période sélectionnée
    let startDate;
    if (period === 'day') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7); // Début: il y a une semaine
    } else if (period === 'month') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1); // Début: il y a 6 mois
    } else if (period === 'year') {
      startDate = new Date(currentDate.getFullYear() - 1, 0, 1); // Début: il y a un an
    }
  
    // Générer les dates pour la période sélectionnée jusqu'à la date actuelle
    const currentDatePointer = new Date(startDate);
    while (currentDatePointer <= currentDate) {
      const formattedDate = period === 'day' ? currentDatePointer.toISOString().split('T')[0] :
                            (period === 'month' ? currentDatePointer.toISOString().split('-').slice(0, 2).join('-') :
                            currentDatePointer.getFullYear().toString());
      initialData[formattedDate] = 0; // Initialiser avec 0 affaire
      currentDatePointer.setDate(currentDatePointer.getDate() + 1); // Avancer d'un jour, mois ou année selon la période sélectionnée
    }
  
    // Compter le nombre d'affaires pour chaque date
    jsonData.forEach(affaire => {
      const date = period === 'day' ? affaire.dateCreation.split('T')[0] :
                  (period === 'month' ? affaire.dateCreation.split('-').slice(0, 2).join('-') :
                  affaire.dateCreation.split('-')[0]);
      initialData[date] = (initialData[date] || 0) + 1;
    });

    const chartData = Object.values(initialData);
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
        categories: Object.keys(initialData),
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Affaires crées',
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
        text: `Affaires crées par ${period === 'day' ? 'jour' : (period === 'month' ? 'mois' : 'année')}`,
        align: 'left',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif'
        }
      } 
    };

    return { data: initialData, options: chartOptions, series: [{ data: chartData }] };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handlePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <Layout>
      <div>
        <div className="stat-container">
          <h2>Visualisation de l'augmentation des affaires crées</h2>
          
          <div className="flex w-full max-w-45 justify-end">
  <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
    <form onSubmit={handleSubmit} className="flex gap-2">
      <select
        value={timePeriod}
        onChange={handlePeriodChange}
        className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
      >
       <option value="day">Jour</option>
              <option value="month">Mois</option>
              <option value="year">Année</option>
      </select>
     
    </form>
  </div>
</div>

          <div id="chartOne" className="-ml-5">
          <ReactApexChart options={options} series={series} type="area" height={500} />
        </div></div>
      </div>
    </Layout>
  );
}

export default StatAffaire;

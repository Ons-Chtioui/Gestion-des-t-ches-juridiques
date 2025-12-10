import React, { useState , useEffect } from 'react';
import './Agenda.css'; // Import du fichier CSS pour la mise en forme
import NavBar from './NavBar';
import {addEvenement,getAllEvenements, deleteEvenement,getEvenementById, updateEvenement } from "./UtilisateurService";
import Layout from './Layout';
import { RiDeleteBinLine } from 'react-icons/ri'; // Import de l'icône de suppression depuis React Icons
import { RiRefreshLine } from 'react-icons/ri'; // Import de l'icône de mise à jour depuis React Icons
import { RiEditLine } from 'react-icons/ri';
import axios from 'axios';
const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ titre: '', date: '', emails: [] });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [updatedEventData, setUpdatedEventData] = useState({}); // Ajouter cette ligne pour définir updatedEventData

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'emails') {
      // Split the input value by comma and trim each email
      const emails = value.split(',').map(email => email.trim());
      setNewEvent({ ...newEvent, [name]: emails });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  
  useEffect(() => {
    fetchEvents();
  }, []); // Fetch events when component mounts
 
  const fetchEvents = async () => {
    try {
      const events = await getAllEvenements();
      if (events && events.length > 0) {
        setEvents(events);
      } else {
        console.warn('Aucun événement trouvé.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
    }
  };
  
  
  const handleAddEvent = async () => {
    try {
      if (newEvent.date.trim() !== '' && newEvent.titre.trim() !== '') {
        const response = await addEvenement(newEvent);
        console.log('Event added:', response.data);
  
        // Préparation des données de l'email
        const formData = new FormData();
        formData.append("to", "chtiouiines0@gmail.com");
        formData.append("cc", newEvent.emails.join(','));
        formData.append("subject", "Novelle Evénement: " + newEvent.titre);
        formData.append("date", newEvent.date);  // S'assurer que la date est au format yyyy-MM-dd
    
        // Envoi de l'email
        await axios.post("http://localhost:3020/mail/notification/evenement", formData);
    
        // Réinitialisation de l'événement
        fetchEvents();
        setNewEvent({ titre: '', date: '', emails: [] });
      }
    } catch (error) {
      console.error('Error adding event or sending email:', error);
    }
  };

  const handleDateClick = (date) => {
    const selectedDate = new Date(selectedYear, selectedMonth, date);
    setSelectedDate(selectedDate.getDate());
    setNewEvent({ ...newEvent, date: selectedDate });
  };
  const isDateHighlighted = (date) => {
    const cellDate = new Date(selectedYear, selectedMonth, date);
    return events.some((event) => isSameDay(event.date, cellDate));
  };
  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };
  

  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (dimanche) à 6 (samedi)
    const calendar = [[]];
    let currentWeek = 0;

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar[currentWeek].push('');
    }

    for (let i = 1; i <= daysInMonth; i++) {
      if (calendar[currentWeek].length === 7) {
        currentWeek++;
        calendar.push([]);
      }
      calendar[currentWeek].push(i);
    }

    while (calendar[currentWeek].length < 7) {
      calendar[currentWeek].push('');
    }

    return calendar;
  };
  const handleEditEvent = async (id) => {
    try {
      const response = await getEvenementById(id);
      const event = response.data;
      updateEvenement(event); // Mettre à jour l'état avec les données de l'événement
    } catch (error) {
      console.error('Error fetching event by id:', error);
    }
  };

  const renderCalendar = () => {
    const calendar = generateCalendar(selectedYear, selectedMonth);

    return (
      
      <div id="agenda" className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center">
      <div id="selecteur"className="month-year-selector flex items-center justify-center">
        <button onClick={() => setSelectedYear(selectedYear - 1)}>&lt;&lt;</button>
        <button onClick={() => setSelectedMonth(selectedMonth === 0 ? 11 : selectedMonth - 1)}>&lt;</button>
        <h2>{new Date(selectedYear, selectedMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => setSelectedMonth(selectedMonth === 11 ? 0 : selectedMonth + 1)}>&gt;</button>
        <button onClick={() => setSelectedYear(selectedYear + 1)}>&gt;&gt;</button>
      </div>
      <div className="weekdays">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      {calendar.map((week, rowIndex) => (
        <div key={rowIndex} className="week">
          {week.map((date, colIndex) => (
            <div
              key={colIndex}
              className={`day ${date === selectedDate ? 'selected' : ''} ${
                isDateHighlighted(date) ? 'highlighted' : ''
              }`} 
             
              onClick={() => handleDateClick(date)}
            >
              {date !== '' && <span className="date">{date}</span>}
              {isDateHighlighted(date) && events.filter((event) => isSameDay(event.date, new Date(selectedYear, selectedMonth, date))).map((event, index) => (
                <div key={index} className="title" >
                
                  {event.titre}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
    
    );
  };
  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvenement(id);
      fetchEvents(); // Actualiser la liste des événements après la suppression
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <Layout>
      <div className='agenda'>
 
    <div className='evenement'>
    {renderCalendar()}
        <div className="form">
          <h4>Ajouter un événement </h4>
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="titre"
            placeholder="Titre de l'événement"
            value={newEvent.titre}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="emails"
            placeholder='Email pour notification '
            value={newEvent.emails.join(', ')} // Join emails with comma for display
            onChange={handleInputChange}
          />
          <button onClick={handleAddEvent}>Ajouter</button>
        </div>
     </div>
      <div className="event-list">
          <h2>Liste des événements:</h2>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th >Date</th>
                <th>Titre</th>
                <th >Emails</th>
                <th >Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td >{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.titre}</td>
                  <td>
             {event.emails && event.emails.length > 0 ? (
                   <div className='email-container'>
                     {event.emails.map((email, index) => (
                    <div key={index}>{email}</div>
                  ))}
                </div>
                 ) : (
                      "Aucun email"
                    )}
              </td>

                  <td>
                
                  <button className='btn btn-danger' onClick={() => handleDeleteEvent(event.id)}>  <RiDeleteBinLine /></button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

    </div></Layout>
  );
};

export default Agenda;
 

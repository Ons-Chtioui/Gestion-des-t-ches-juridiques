import { RiLogoutCircleLine } from 'react-icons/ri'; // Import de l'icône de déconnexion depuis React Icons
import Rh from"./logo.png";
import React from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './header.css';

export default function Header({ handleSideBar }) {
    const { user, logout } = useAuth(); // Utilisation de useAuth pour obtenir l'utilisateur et la fonction logout
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        if (user) {
            setUserDataLoaded(true);
        }
    }, [user]);

    // Si les données de l'utilisateur ne sont pas encore chargées, afficher "Loading..."
    if (!userDataLoaded) {
        return <div>Loading...</div>;
    }

    // Fonction de déconnexion
    const handleLogout = () => {
        logout(); // Appel de la fonction logout fournie par useAuth
        navigator('/'); // Redirection vers la page d'accueil après la déconnexion
    };

    // Affichage du type d'utilisateur et du message de bienvenue une fois les données de l'utilisateur chargées
    return (
        
        <header className='header'>
               {/* <img src={Rh}/>  */}
            <div className='profile'>
               {/* {user && (
                    <h2>Bonjour, {user.name}</h2>
                )} */}
              
                <div className='logout'>
               <h5 className='text'>se déconnecter</h5>
                <button onClick={handleLogout}> <RiLogoutCircleLine /></button>
              </div>
            </div>
        </header>
    );
}

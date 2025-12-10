import React from 'react';
import Sidebar from './NavBar'; // Assurez-vous que le chemin d'importation est correct
import "./layout.css"
import Header from './Header';

const Layout = ({ children }) => {

  return (
    
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar-container">
        <Sidebar />
      </div>
      
      {/* Contenu principal */}
      <div className="main-content">
        <Header/>
        {children}
      </div>
    </div>
  );
};

export default Layout;

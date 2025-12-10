import React from "react";
import Leoni from "./R.png";
import Rh from "./image001.png";
import "./nav.css";
import {ADMIN} from "../constant/constant";
import {useAuth} from "./useAuth";

const Sidebar = () => {
    const {user} = useAuth();
  
    return (
        <div className="sidebar">
            <ul className="nav flex-column">
            <li id="sid-image">
                            <img src={Leoni} />
                        </li>
                {user.userType === ADMIN ? (
                    <>
                        <li className="nav-item">
                            <a className="nav-link active" href="/page-admin/admin">
                                Accueil
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/signup">
                                Création Compte
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/agenda">
                            Événement
                            </a>
                        </li>
                    </>
                ) : null}
                {user.userType === ADMIN || user.userType==="Avocate" ? (
                    <>
                       <li className="nav-item dropdown">
                    <a
                        className="nav-link active dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Type Affaire{" "}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <a className="dropdown-item" href="/legallegal/legaLlegal">
                                Legal Legal
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="/legalrh/legalrh">
                                Legal Rh
                            </a>
                        </li>
                      
                        
                    </ul>
                </li>
                    </>
                ) : null}
                 {user.userType === ADMIN || user.userType==="Avocate"  || user.userType==="RH" ? (
                    <>
                        <li className="nav-item dropdown">
                    <a
                        className="nav-link active dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
              AffaireInterne{" "}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <a className="dropdown-item" href="/listeaffairinterne/CCL">
                                CCl
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="/listeaffairinterne/Dossier Interne">
                               Dossier Interne
                            </a>
                        </li>
                        
                        
                    </ul>
                </li>
                    </>
                ) : null}
                
               
                {user.userType === ADMIN ? (
                    <>
                        <li className="nav-item">
                            <a className="nav-link active" href="/chat">
                               Question
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link active dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Statistique 
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a className="dropdown-item" href="/stat">
                                        Statistique
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/statType">
                                        Statistique Type
                                    </a>
                                </li>

                                <li>
                                    <a className="dropdown-item" href="/plant">
                                        Statistique Plant
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/statP">
                                        Statistique Status
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/statFinance">
                                        Statistique Finance
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </>
                ) : null}
                {/* <li id="sid-image">
                            <img src={Rh} />
                        </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./compontes/Admin";
import Login from "./compontes/Login";
import Signup from "./compontes/Signup";

import Affaire from "./compontes/Affaire";
import LegalLegal from "./compontes/LegalLegal";
import ListeAffaire from "./compontes/ListeAffaire";
import ListeAffaireStatus from "./compontes/ListeAffaireStatus";
import Choix from "./compontes/Choix";

import Dg from "./compontes/Dg";
import StatAffaire from "./compontes/StatAffaire";
import StatType from "./compontes/StataType";
import Agenda from "./compontes/Agenda";
import Chatbot from "./compontes/Chatbot";
import StatPlant from "./compontes/StatPlant";
import StatDifferenceMontant from "./compontes/StatDifferenceMontant";

import ListeFichiers from "./compontes/ListeFichiers";
import ListeCommentaires from "./compontes/ListeCommentaires";
import StatP from "./compontes/StatP";
import FichierDetails from "./compontes/FichierDetails";
import {AuthProvider,RequireAuthAV, RequireAuth,RequireAuthFinance} from "./compontes/useAuth";
import ListeAffaireInterne from "./compontes/ListeAffaireInterne";
import AffaireForm from "./compontes/AffaireForm";
import FichierIntern from "./compontes/FichierIntern";
import InterfaceRh from "./compontes/InterfaceRh";



function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        {/*// http://localhost:3000 */}
                        <Route path="/" element={<Login />}></Route>
                        {/*// http://localhost:3000/Sign-Up */}
                        <Route path="/signup" element={ <RequireAuth><Signup/></RequireAuth>}></Route>
                        {/*// http://localhost:3000/Sign-Up/1 */}
                        <Route path="/edit-utilisateur/:id" element={ <RequireAuth><Signup /></RequireAuth>}></Route>
                        {/*// http://localhost:3000/Admin */}
                        <Route
                            path="/page-admin/:val"
                            element={
                                <RequireAuth>
                                    <Admin />
                                </RequireAuth>
                            }
                        ></Route>
                        {/*// http://localhost:3000/Choise */}
                        <Route path="/page-choix/:val" element={<Choix />}></Route>
                        {/*// http://localhost:3000/Ajouter-Affaire/RH */}
                        <Route path="/ajouteraffaire/:val" element={<RequireAuthAV><Affaire /></RequireAuthAV>}></Route>
                        {/*// http://localhost:3000/Ajouter-Affaire/Legal */}
                        <Route path="/ajouteraffaire/:val" element={<RequireAuthAV><Affaire /></RequireAuthAV>}></Route>
                        {/*// http://localhost:3000/LegalLegal */}
                        <Route path="/legallegal/:val" element={<RequireAuthAV><LegalLegal /></RequireAuthAV>}></Route>
                        {/*// http://localhost:3000/LegalRh */}
                        <Route path="/legalrh/:val" element={<RequireAuthAV><LegalLegal /></RequireAuthAV>}></Route>

                        {/*// http://localhost:3000/Liste */}
                        <Route path="/liste/:val/:typeAffairee" element={<RequireAuthAV><ListeAffaire /></RequireAuthAV>}></Route>
                        {/*// http://localhost:3000/direction/affair/1*/}
                        <Route path="/affair/:id" element={<Dg />}></Route>
                        {/*// http://localhost:3000/affair/1 */}
                        <Route path="edit-affaire/:id" element={<RequireAuthFinance><Affaire /></RequireAuthFinance>}></Route>
                        <Route path="edit-affaire/:val/:typeAffairee/:id" element={<Affaire />}></Route>
                        <Route path="edit-affaire/Clôture/:id" element={<Affaire />}></Route>


                        <Route path="/affairinterne/:val" element={<AffaireForm />}></Route>
                        <Route path="/listeaffairinterne/:typeAffaire" element={<ListeAffaireInterne />}></Route>

                        <Route path="/edit-affaireinterne/:val/:id" element={<AffaireForm />}></Route>
                        <Route path="/affaireInterne/:id" element={<FichierIntern/>}></Route>

                      
                        {/*// http://localhost:3000/Agenda*/}
                        <Route path="agenda" element={ <RequireAuth><Agenda /></RequireAuth>}></Route>
                        {/*// http://localhost:3000/Chat*/}
                        <Route path="chat" element={<Chatbot />}></Route>
                        {/*// http://localhost:3000/ListeAffaireStatus*/}
                        <Route path="/finance" element={<ListeAffaireStatus />}></Route>
                        {/*// http://localhost:3000/statplant*/}
                        <Route path="plant" element={<RequireAuth><StatPlant /></RequireAuth>}></Route>
                        {/*// http://localhost:3000/statfinance*/}
                        <Route path="statFinance" element={<RequireAuth><StatDifferenceMontant /></RequireAuth>}></Route>
                        {/*// http://localhost:3000/satat */}
                        <Route path="stat" element={<RequireAuth><StatAffaire /></RequireAuth>}></Route>
                        {/*// http://localhost:3000/satatSP  */}
                        <Route path="statP" element={<RequireAuth><StatP /></RequireAuth>}></Route>
                        {/*// http://localhost:3000/satatType */}
                        <Route path="statType" element={
                                <RequireAuth>
                                   <StatType />
                                </RequireAuth>
                        }></Route>

                        <Route path="/:pdfURL" element={<RequireAuthAV><FichierDetails /></RequireAuthAV>}></Route>

                        <Route path="/affaire/:id" element={<RequireAuthAV><ListeFichiers /></RequireAuthAV>}></Route>

                        <Route path="/commaintaire/:id" element={<RequireAuthAV><ListeCommentaires /></RequireAuthAV>}></Route>
                        <Route path="/interfaceRh" element={<InterfaceRh/>}></Route>
                       
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;

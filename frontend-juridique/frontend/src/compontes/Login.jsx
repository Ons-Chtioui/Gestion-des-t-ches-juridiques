import React, { useState } from "react";
import axios from "axios";
import './login.css';
import Leoni from"./R.png";
import law from"./law.png";
import Rh from"./image001.png";
import { useNavigate } from 'react-router-dom';
import Sidebar from './NavBar'; // Importez le composant Sidebar
import { useAuth } from "./useAuth";
// Import SweetAlert2
import Swal from 'sweetalert2';

function Login() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigator = useNavigate();
    const [userType, setUserType] = useState(""); // Ajoutez un état pour stocker le type d'utilisateur
    const {login} = useAuth();
    console.log(login);
    async function userLogin(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:3020/api/v1/utilisateur/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
             console.log(res.data);
             
             if (res.data.message === "Email not exists") 
             {
              
               Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Email not exists",
                width: '300px',
                customClass: {
                  container: 'my-swal-top-right'
                },
              });
             } 
             else if(res.data.message === "Login Success")
             { 
           
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'success.',
                showConfirmButton: false,
                timer: 1500, // Auto close after 1500ms (1.5 seconds)
                width: '300px',
               
                customClass: {
                  container: 'my-swal-top-right'
                },
                toast: true, // Enable toast style (optional for better positioning)
              
              });
              console.log("success")
              const userType =res.data.userType;
              const name=res.data.name;
              login({userType: userType,name:name})
              setUserType(userType,name); // Mettez à jour le type d'utilisateur
              // Redirection en fonction du type d'utilisateur
              if (userType === "Admin") {
                navigator(`/page-admin/admin`);
              }
              else if (userType === "Ministère-finances"){
                navigator("/finance");
              }
              else if(userType==="RH"){
                navigator("/listeaffairinterne/CCL");
              }
              else {
                navigator(`legallegal/legaLlegal`);
              }
               
             } 
              else 
             { 
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Incorrect Email and Password not match",
                width: '450px',
                customClass: {
                  container: 'my-swal-top-right'
                },
              });
               
             }
          }, fail => {
           console.error(fail); // Error!
  });
        }

 
         catch (err) {
          alert(err);
        }
      
      }

    return (
  
      <div id="conlogin" className="con">
        
      <div className='container'>
        <div className="demi-ecran">
            <h2>Bienvenue</h2>
            <img src={law}/>
        </div>
        <div className="login" id="login">
        <img src={Leoni}/>
                <h2><strong>Se connecter</strong></h2>
            <form>
              
             <div className='inputsl' >
             <label id="label">Email</label>
             <input type="email"   id="e-mail" placeholder="Entrer un e-mail"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          />
        </div>
        
        <div className='inputsl'>
            <label id="label">Mot de passe</label>
            <input type="password"  id="password" placeholder="Entrer un mot de passe "
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            />
          </div>
                  <button  type="submit"  onClick={userLogin} >Login</button>
              </form>
            </div>
    </div>
     </div>
    );
  }
  
  export default Login;

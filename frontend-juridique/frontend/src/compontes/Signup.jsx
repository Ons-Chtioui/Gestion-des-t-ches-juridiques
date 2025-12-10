import law from"./law.png";import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addUtilisateur, getUtilisateur, updateUtilisateur } from "./UtilisateurService";
import Layout from './Layout';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [matricule, setMatricule] = useState("");
  const [num, setNumero] = useState("");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getUtilisateur(id)
        .then((response) => {
          setName(response.data.name);
          setEmail(response.data.email);
          setType(response.data.type);
          setMatricule(response.data.matricule);
          setNumero(response.data.num);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsCopy = {};
    let valid = true;

    if (!name.trim()) {
      errorsCopy.name = "Name is required";
      valid = false;
    }
    if (!password.trim() || !/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
      errorsCopy.password = "Password must contain both numbers and letters";
      valid = false;
    }
    if (!email.trim() || !email.includes('@')) {
      errorsCopy.email = "Valid email address is required";
      valid = false;
    }
    if (!type.trim()) {
      errorsCopy.type = "Type is required";
      valid = false;
    }
    if (num.toString().trim().length !== 8 || isNaN(num)) {
      errorsCopy.num = "Numero must contain 8 digits";
      valid = false;
    }

    setErrors(errorsCopy);

    if (valid) {
      const utilisateur = { name, email, matricule, num, type, password };
      if (id) {
        updateUtilisateur(id, utilisateur)
          .then((response) => {
            navigator("/page-admin/admin");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addUtilisateur(utilisateur)
          .then((response) => {
            navigator("/page-admin/admin");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const pageTitle = () => {
    return id ? <h2><strong>Modifier Utilisateur</strong></h2> : <h2><strong>Ajouter Utilisateur</strong></h2>;
  };

  return (
    <Layout>
      <div className="con">
        <div className='container'>
          <div className="demi-ecran">
           
            <img src={law} alt="Law" />
          </div>
          <div className="signup">
            {pageTitle()}
            <form onSubmit={handleSubmit} >
              <div className='inputsl' >
                <input 
                  type="text" 
                  placeholder='Entrer un nom-prenom' 
                  name="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className='inputsl'>
                <input 
                  type="email" 
                  placeholder='Entrer un e-mail' 
                  name="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className='inputsl'>
                <input 
                  type="number" 
                  placeholder='Entrer un numéro' 
                  name="num" 
                  value={num} 
                  onChange={(e) => setNumero(e.target.value)}
                  required 
                />
              </div>
              <div className='inputsl'>
                <input 
                  type="number" 
                  placeholder='Entrer un matricule' 
                  name="matricule" 
                  value={matricule} 
                  onChange={(e) => setMatricule(e.target.value)}
                  required 
                />
              </div>
              <div className='inputsl'>
                <input 
                  type="password" 
                  placeholder='Entrer un mot de passe' 
                  name="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className='inputsl'>
                <select 
                  name='type' 
                  id="option" 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Choisir un type d'utilisateur</option>
                  <option value="Admin">Admin</option>
                  
                  <option value="Avocate">Avocate محامي</option>
                  <option value="RH">RH</option>
                  <option value="Adminstration-publique">Adminstration publique الإدارة العامة</option>
                  <option value="Ministère-finances">Departement des finances قسم المالية</option>
                </select>
              </div>
              {errors.password && <div className="error">{errors.password}</div>}
              <button type="submit">Créer</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

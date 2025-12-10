import React, { useState } from 'react';
import axios from 'axios';

import Layout from './Layout';
const Chatbot = () => {

  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3020/api/chatbot', { question });
      setResponse(res.data.answer);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };

 
  return (
    <Layout>
    <div>
      
     <div>
      
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', fontFamily: 'Arial, sans-serif' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Chatbot</h2>
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <label htmlFor="question" style={{ display: 'block', marginBottom: '10px' }}>Posez votre question :</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', borderRadius: '3px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Envoyer</button>
          </form>
          {response && (
            <div>
              <h3 style={{ marginBottom: '10px' }}>Réponse :</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
        </div>
    </div></Layout>
  );
};

export default Chatbot;

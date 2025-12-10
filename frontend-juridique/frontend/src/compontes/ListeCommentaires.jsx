import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCommentsByAffaireId, addComment } from './UtilisateurService';
import './ListeCommentaires.css';
import moment from 'moment'; 
import Layout from './Layout';

const ListeCommentaires = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsByAffaireId(id);
        setComments(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    };

    fetchComments();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!newComment.trim()) {
        return;
      }

      const currentDate = new Date().toLocaleString('fr-FR');

      const commentToAdd = {
        contenu: newComment,
        date: currentDate
      };

      await addComment(commentToAdd, id);

      // Ajout du nouveau commentaire en haut de la liste
      setComments([commentToAdd, ...comments]);

      setNewComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    }
  };

  return (
    <Layout>
      <div className='CommentaireInterface'>
    <div className='commentaire'>
      <h4><strong>Ajouter votre commentaire:</strong></h4>
      <form  onSubmit={handleSubmit} className='formComm'>
        <textarea
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Ajouter un nouveau commentaire"
          rows="4" cols="40"
        ></textarea>
        <button className='ajouterComm' type="submit" >Ajouter</button>
      </form>
      </div>
      {comments && comments.length > 0 ? (
        <div className='list'>
           <h3>   Liste des commentaires associés à cette affaire </h3>
        <div className="comment-list">
      
          {comments.slice().reverse().map((comment, index) => (
            <div key={index} className="comment">
              <div className='content'>
              <div className="comment-content">{comment.contenu}</div>
              <div className="comment-date">
                <strong>Date de saisie:</strong> {moment(comment.dateCreation).format('DD/MM/YYYY HH:mm')}
              </div></div>
              <div id="ligne"></div>
            </div> 
          ))}
        </div>
        </div>
      ) : (
        <p>Aucun commentaire pour le moment.</p>
      )}
    </div>
    </Layout>
  );
};

export default ListeCommentaires;

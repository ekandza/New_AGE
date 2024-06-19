// itemsRouter.js
const express = require('express');
const router = express.Router();
const Stat = require('../models/stats');





// Route pour récupérer tous les articles

router.get('/stats', async (req, res) => {
  try {
    // Récupération de tous les articles depuis la base de données
    const articles = await Stat.find();
    // Envoi de la réponse avec les articles récupérés
    res.status(200).json(articles);
    console.log(articles);
  } catch (error) {
    // Envoi d'une réponse d'erreur si une erreur se produit
    console.error("Une erreur s'est produite lors de la récupération des articles :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des articles." });
  }
});

 



 


 




// Route pour la racine de l'URL
router.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil');
});




module.exports = router;

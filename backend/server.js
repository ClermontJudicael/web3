require('dotenv').config();
const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/events', eventRoutes);

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ 
    message: err.message || 'Une erreur est survenue!',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
  console.log('URL de l\'API:', `http://localhost:${port}`);
  console.log('CORS origin:', process.env.CORS_ORIGIN || 'http://localhost:3000');
});

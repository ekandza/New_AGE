const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const statsRouter = require('./routes/statsRouter');
const itemsRouter = require('./routes/itemsRouter');
const usersRouter = require('./routes/usersRouter');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRouter = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Configurer CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Remplacez localhost:8080 par votre domaine réel
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/*
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});
*/


// Remplacez newpassword123 par votre nouveau mot de passe
const uri = 'mongodb+srv://ebpekandzabilapeniel:nMVN3eKMhxi3bHsN@cluster0.ggmdpbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});




// Use items router
app.use('/api/items', itemsRouter);
app.use('/api/compte', usersRouter);
app.use('/api/', authRouter);
app.use('/api/stats',statsRouter)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Serve static files from the Vue app
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Handle SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

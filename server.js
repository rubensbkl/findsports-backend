require('dotenv').config();
const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const server = express();
const router = jsonServer.router('database.json');
const db = router.db;

server.use(cors());
server.use(bodyParser.json());
server.use('/api', router);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    req.userId = user.id; 
    next();
  });
}

server.post('/verify-token', authenticateToken, (req, res) => {
    res.json({ valid: true });
});

// User Register
server.post('/user-register', async (req, res) => {
  console.log(process.env.JWT_SECRET);
  console.log("teste");
  const users = db.get('users');
  const newUser = req.body;

  if(users.find({ username: newUser.username }).value()) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // BCrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = hashedPassword;

  // Default values
  newUser.id = users.size().value() + 1;
  newUser.isAdmin = false;
  newUser.name = newUser.username;
  newUser.likes = 1;
  newUser.dislikes = 1;
  newUser.rating = newUser.likes / newUser.dislikes;

  users.push(newUser).write();

  res.status(200).json({ message: 'User registered successfully' });
});

// User Login
server.post('/user-login', async (req, res) => {
  const users = db.get('users');
  const credentials = req.body;

  const user = users.find({ username: credentials.username }).value();

  if(user) {
    // BCrypt
    const match = await bcrypt.compare(credentials.password, user.password);
    if(match) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Logged in successfully', token: token });
    }
  }

  return res.status(400).json({ message: 'Invalid username or password' });
});

// User Update
server.put('/user-edit', authenticateToken, async (req, res) => {
  const users = db.get('users');
  const updateData = req.body;
  
  const user = users.find({ id: req.user.id }).value();
  
  if(user) {
    users.find({ id: req.user.id })
      .assign(updateData)
      .write();
  
    return res.status(200).json({ message: 'User updated successfully' });
  }
  
  return res.status(400).json({ message: 'User not found' });
});

// Get All Users
server.get('/users', (req, res) => {
  const users = db.get('users').value();
  res.status(200).json(users);
});

// Get User Profile
server.get('/user-profile/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  // Busque o perfil do usuário com esse ID do banco de dados
  const user = db.get('users').find({ id: id }).value();

  if (!user) {
    // Se não houver usuário com esse ID, envie um erro 404
    return res.status(404).send('User not found');
  }

  // Se houver um usuário, envie-o de volta como resposta
  res.status(200).json(user);
});

// Arena Register
server.post('/arena-register', authenticateToken, async (req, res) => {
  const arenas = db.get('arenas');
  const newArena = req.body;

  // Default values
  newArena.id = arenas.size().value() + 1;

  // Include the user ID in the new arena
  newArena.ownerId = req.userId; // use req.userId here

  arenas.push(newArena).write();

  res.status(200).json({ message: 'Arena registered successfully' });
});

// Get All Arenas
server.get('/arenas', authenticateToken, (req, res) => {
  const arenas = db.get('arenas').value();
  res.status(200).json(arenas);
});

// Evento Register
server.post('/evento-register', authenticateToken, async (req, res) => {
  const eventos = db.get('eventos');
  const newEvento = req.body;

  // Default values
  newEvento.id = eventos.size().value() + 1;

  // Include the user ID in the new evento
  newEvento.ownerId = req.userId; // use req.userId here

  eventos.push(newEvento).write();

  res.status(200).json({ message: 'Evento registered successfully' });
});

// Get All Eventos
server.get('/eventos', authenticateToken, (req, res) => {
  const eventos = db.get('eventos').value();
  res.status(200).json(eventos);
});

// Send Notification
server.post('/send-notification', authenticateToken, async (req, res) => {
    const notifications = db.get('notifications');
    const newNotification = req.body;
  
    // // Default values
    // newArena.id = arenas.size().value() + 1;
  
    // // Include the user ID in the new arena
    // newArena.ownerId = req.userId; // use req.userId here
  
    notifications.push(newNotification).write();
  
    res.status(200).json({ message: 'Notificação enviada' });
});

// Get All Notifications
server.get('/notifications', authenticateToken, (req, res) => {
    const notifications = db.get('notifications').value();
    res.status(200).json(notifications);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
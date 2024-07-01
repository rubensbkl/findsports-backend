const express = require('express');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const server = express();

server.use(cors());

server.use(bodyParser.json());

const router = jsonServer.router('database.json');
const db = router.db;

server.use('/api', router);


// User Register
server.post('/user-register', async (req, res) => {
  const users = db.get('users');
  const newUser = req.body;

  if (users.find({ username: newUser.username }).value()) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // BCrypt
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = hashedPassword;

  // Default values
  newUser.id = users.size().value() + 1;
  newUser.isAdmin = false;
  newUser.name = newUser.username;
  newUser.likes = 0;
  newUser.dislikes = 0;
  newUser.rating = 0;

  users.push(newUser).write();

  res.status(200).json({ message: 'User registered successfully' });
});

// User Login
server.post('/user-login', async (req, res) => {
  const users = db.get('users');
  const credentials = req.body;

  const user = users.find({ username: credentials.username }).value();

  if (user) {
    // BCrypt
    const match = await bcrypt.compare(credentials.password, user.password);
    if (match) {
      return res.status(200).json({ message: 'Logged in successfully', token: user.id, username: user.username });
    }
  }

  return res.status(400).json({ message: 'Invalid username or password' });
});

// User Update
server.put('/user-edit', async (req, res) => {
    const users = db.get('users');
    const updateData = req.body;
    const userId = updateData.id; // Renomeado para maior clareza
    if (userId) {
      const userExists = users.find({ id: userId }).value(); // Verifica se o usuário existe
      if (userExists) {
        users.find({ id: userId }).assign(updateData).write();
        return res.status(200).json({ message: 'User updated successfully' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      return res.status(400).json({ message: 'No user ID provided' });
    }
  });

// Get All Users
server.get('/users', (req, res) => {
  const users = db.get('users').value();
  res.status(200).json(users);
});

// Get User Profile
server.get('/user-profile/:id', (req, res) => {
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
server.post('/arena-register', async (req, res) => {
  const arenas = db.get('arenas');
  const newArena = req.body;

  // Default values
  newArena.id = arenas.size().value() + 1;
  newArena.ownerId = req.userId; // use req.userId here
  newArena.likes = 0;
  newArena.dislikes = 0;
  newArena.rating = 0;

  arenas.push(newArena).write();

  res.status(200).json({ message: 'Arena registered successfully' });
});

// Get All Arenas
server.get('/arenas', (req, res) => {
  const arenas = db.get('arenas').value();
  res.status(200).json(arenas);
});

// Get Arena Profile
server.get('/arena-profile/:id', (req, res) => {
    const id = Number(req.params.id);
    // Busque o perfil do usuário com esse ID do banco de dados
    const arena = db.get('arenas').find({ id: id }).value();
  
    if (!arena) {
      // Se não houver usuário com esse ID, envie um erro 404
      return res.status(404).send('User not found');
    }
  
    // Se houver um usuário, envie-o de volta como resposta
    res.status(200).json(arena);
});

// Evento Register
server.post('/evento-register', async (req, res) => {
  const events = db.get('events');
  const newEvent = req.body;

  // Default values
  newEvent.id = events.size().value() + 1;

  events.push(newEvent).write();

  res.status(200).json({ message: 'Evento registered successfully' });
});

// Get All Events
server.get('/events', (req, res) => {
  const events = db.get('events').value();
  res.status(200).json(events);
});

// Get Arena Profile
server.get('/event-profile/:id', (req, res) => {
    const id = Number(req.params.id);
    // Busque o perfil do usuário com esse ID do banco de dados
    const event = db.get('events').find({ id: id }).value();
  
    if (!event) {
      // Se não houver usuário com esse ID, envie um erro 404
      return res.status(404).send('User not found');
    }
  
    // Se houver um usuário, envie-o de volta como resposta
    res.status(200).json(event);    
});

// Send Notification
server.post('/send-notification', async (req, res) => {
  const notifications = db.get('notifications');
  const newNotification = req.body;

  // // Default values
  // newArena.id = arenas.size().value() + 1;

  // // Include the user ID in the new arena
  // newArena.ownerId = req.userId; // use req.userId here

  notifications.push(newNotification).write();

  res.status(200).json({ message: 'Notificação enviada' });
});

// Adapted Get Notifications Endpoint
server.get('/notifications', (req, res) => {
    const id = req.query.token;
    let team = db.get('team-invite').value();
    let event = db.get('event-invite').value();
  
    // Filter notifications based on senderToken, if provided
    if (id) {
        team = team.filter(team => team.receiver === parseInt(id));
        event = event.filter(event => event.receiver === parseInt(id));   
    }
  
    res.status(200).json({ team, event });
});



server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
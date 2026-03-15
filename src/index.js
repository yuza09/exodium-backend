require('dotenv').config();
var express = require('express');
var cors = require('cors');
var helmet = require('helmet');
var morgan = require('morgan');
var http = require('http');
var socketio = require('socket.io');

var authRoutes = require('./routes/auth');
var planetRoutes = require('./routes/planets');
var fleetRoutes = require('./routes/fleets');
var marketRoutes = require('./routes/market');

var app = express();
var server = http.createServer(app);
var io = new socketio.Server(server);

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/planets', planetRoutes);
app.use('/api/fleets', fleetRoutes);
app.use('/api/market', marketRoutes);

app.get('/api/health', function(req, res) {
  res.json({ status: 'ok', game: 'Exodium' });
});

var PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log('Serveur Exodium port ' + PORT);
});
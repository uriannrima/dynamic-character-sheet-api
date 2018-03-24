const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const socketio = require('@feathersjs/socketio');
const events = require('./app.events');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const mongodb = require('./mongodb');

const authentication = require('./authentication');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing

var corsConfiguration = {
  credentials: true,
  origin: [
    'https://web-dcs.firebaseapp.com',
    'https://web-dcs-uriannrima.c9users.io',
    'http://localhost:4000'
  ],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsConfiguration));
app.options('*', cors(corsConfiguration)); // include before other routes

app.use(helmet());
app.use(compress());
app.use(cookieParser());

app.use(bodyParser.json({
  limit: '1mb'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

app.configure(mongodb);
app.configure(express.rest());
app.configure(socketio({ wsEngine: 'uws' }, io => events(io, app)));

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;

require('dotenv').config()
require('./core/config');
require('./core/mongo');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const useragent = require('express-useragent');

const cors = require('cors');
const featurePolicy = require('feature-policy');
const expressEnforcesSSL = require('express-enforces-ssl');

// routes
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');

const app = express();
const port = process.env.PORT || 3000;
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.eot'];

const initiateExpressListener = async () => {
  console.info('Initializing Node Server...');

  if(app.get('env') === 'production') {
    app.use(expressEnforcesSSL());
  } else {
    app.use(cors());
  }

  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.xssFilter());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.frameguard({ action: 'sameorigin' }));
  app.use(featurePolicy({ features: { fullscreen: ['\'self\''] } }));
  app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }));
  app.use(useragent.express());

  app.use(helmet.hsts({
    preload           : true,
    includeSubDomains : true,
    maxAge            : 1000 * 60 * 60 * 24 * 30,
  }));

  app.use(compression());
  app.use(bodyParser.raw({ limit: '50mb' }));
  app.use(bodyParser.text({ limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(cookieParser());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, timezone');
    res.setHeader('Content-Security-Policy', 'default-src \'self\' https://www.google.com; font-src \'self\' https://fonts.gstatic.com; img-src \'self\' data: https:; script-src \'self\' https://www.google.com https://www.googletagmanager.com https://www.gstatic.com; script-src-elem \'self\' \'unsafe-inline\' https://www.google.com https://www.googletagmanager.com; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; style-src-elem \'self\' \'unsafe-inline\' https://fonts.googleapis.com; frame-src \'self\' https://www.google.com; connect-src \'self\' https://www.google-analytics.com');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=()');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'sameorigin');
    next();
  });

  // routes
  app.use('/api/v1', publicRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/app', privateRoutes);

  // error handling
  app.use(async (err, req, res, next) => {
    if(err.name && err.name === 'ValidationError') {
      var validationErrors = [];
      Object.keys(err.errors).forEach(key => validationErrors.push(err.errors[key].message));
      res.status(422).send({
        success : false,
        error   : true,
        status  : 422,
        errors  : validationErrors,
        title   : err.title ? err.title : 'Validation error!',
        message : err.message ? err.message : 'Sorry, due to an validation error, we could not process your request at this time.'
      });
    } else if(err.formatter) {
      res.status(422).send({
        success : false,
        error   : true,
        status  : 422,
        errors  : err.array(),
        title   : err.title ? err.title : 'Validation error!',
        message : err.message ? err.message : 'Sorry, due to an validation error, we could not process your request at this time.'
      });
    } else if(err) {
      res.status(err.status ? err.status : 500).send({
        success : false,
        error   : true,
        status  : err.status ? err.status : 500,
        errors  : err.errors ? err.errors : err,
        title   : err.title ? err.title : 'Internal server error!',
        message : err.message ? err.message : 'Sorry, due to an internal server error, we could not process your request at this time.'
      });
    }
    next();
  });

  app.get('*', (req, res) => {
    if(allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
      let splitString = req.url.split('?');
      if(splitString && splitString[0]) {
        res.sendFile(path.resolve(`./web/${splitString[0]}`));
      }
    } else {
      res.sendFile(path.resolve('./web/index.html'));
    }
  });

  app.on('error', (error) => {
    console.error(error);
  });

  process.on('uncaughtException', (error) => {
    console.error(error);
  });

  app.listen(port);
};

mongoose.connection.on('connected', () => {
  initiateExpressListener().then(() => {
    console.log('\x1b[37m', '--------------------------------');
    console.log('\x1b[34m', ' MongoDB Initialized ✔');
    console.log('\x1b[37m', '--------------------------------');
    console.log('\x1b[32m', ' Node Server Initialized: ' + port);
    console.log('\x1b[37m', '--------------------------------');
  }).catch((error) => {
    console.error('ERROR:: Node Server Initialization Failed: ', error);
  });
});
'use strict'

const dotenv = require('dotenv').config();
const express = require('express');
const compression = require('compression');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const http = require('http');


let app = express();

app.use(compression());
app.use(bodyParse.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParse.json({ limit: '100mb' }));
app.use(morgan('combined', { stream: console.stream }));
app.use((req, res, nxt) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  console.log("Request: " + JSON.stringify(req.body));
  nxt();
});

require('./app/summary/summaryRoutes')(app);

let port = 3001;
let server = http.createServer(app);

server.listen(port, () => {
  console.log('REST API server listening at: ', port);
});
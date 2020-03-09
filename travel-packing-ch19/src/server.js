const {createServer} = require('https');
const {readFileSync} = require('fs');

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const {json} = require('body-parser');

const USE_HTTPS = true;

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

const app = polka().use(
  json(),
  compression({threshold: 0}),
  sirv('static', {dev}),
  sapper.middleware()
);

if (USE_HTTPS) {
  const options = {
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem')
  };

  createServer(options, app.handler).listen(PORT, err => {
    if (err) {
      console.error('error', err);
    } else {
      console.info('listening for HTTPS requests');
    }
  });
} else {
  app.listen(PORT, err => {
    if (err) console.error('error', err);
  });
}

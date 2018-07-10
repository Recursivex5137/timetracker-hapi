const hapi = require('hapi');
const mongoose = require('mongoose');
const config = require('./server/config');

const server = hapi.Server({
  port: 3000,
  host: 'localhost'
});

// update user and pass
mongoose.connect(`mongodb://<dbuser>:<dbpassword>@ds016058.mlab.com:16058/timetrackerdev`)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('connected to db');
});

mongoose.disconnect();

const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: function (req, rep) {
      return `<h2>Hello Hapi!</h2>`;
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
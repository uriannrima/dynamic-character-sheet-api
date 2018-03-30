/* eslint-disable no-unused-vars */
const memory = require('feathers-memory');

// In memory channels
const Channels = {};

class Service {
  constructor(options) {
    this.options = options || {};
    this.database = memory();
  }

  async create(data, { connection }) {
    if (connection) {
      const channelName = data.join('/');
      if (!Channels[channelName]) Channels[channelName] = [];
      Channels[channelName].push(connection);
      console.log('Joined:', channelName, connection);
      this.app.channel(channelName).join(connection);

      return channelName;
    }
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, { connection }) {
    if (connection) {
      const channelName = id.join('/');
      if (Channels[channelName]) {
        Channels[channelName] = Channels[channelName].filter(channelConnection => channelConnection !== connection);
        this.app.channel(channelName).leave(connection);
        console.log('Left:', channelName, connection);
      }
    }
  }

  setup(app) {
    this.app = app;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async create(data, params) {
    if (params.provider === 'socketio') {
      const { channel } = data;
      const { connection } = params;
      this.app.channel(`${channel.group}/${channel.id}`).join(connection);
    }
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }

  setup(app) {
    this.app = app;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

module.exports = function (io, app) {
  // Allow wildcard event name on socket.

  // Detect someone connected.
  io.on('connection', function (socket) {
    // After someone connected, we have it's socket.

    // A pattern to allow "easy" custom events.
    socket.on('custom', (methodName, serviceName, payload) => {

      const service = app.service(serviceName);
      if (!service) {
        console.log('Service not found.', serviceName);
        return;
      }
      var hook = { path: serviceName, service, app, result: payload, params: { connection: socket.feathers } };
      service.emit(methodName, payload, hook);
    });
  });
};

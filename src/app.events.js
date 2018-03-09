module.exports = function (io, app) {
  // Allow wildcard event name on socket.

  // Detect someone connected.
  io.on('connection', function (socket) {
    // After someone connected, we have it's socket.

    // A pattern to allow "easy" custom events.
    socket.on('custom', (methodName, serviceName, payload) => {
      app.emit(`${serviceName}/${methodName}`, socket.feathers, payload);
    });
  });
};
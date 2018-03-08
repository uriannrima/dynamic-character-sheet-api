module.exports = function (io, app) {
  // Detect someone connected.
  io.on('connection', function (socket) {
    // After someone connected, we have it's socket.

    // Listen and Emit a 'character/connect' to listen anywhere in the aplication
    socket.on('character/connect', payload => {
      app.emit('character/connect', socket.feathers, payload);
    });
  });
};
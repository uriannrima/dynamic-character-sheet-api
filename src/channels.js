module.exports = function () {
  const app = this;
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection) => {
    // On a new real-time connection, add it to the anonymous channel
    console.log('Someone connected in');
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    console.log('Someone logged in.', authResult, connection);

    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);

      // Channels can be named anything and joined on any condition 

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  });

  app.on('logout', (authResult, { connection }) => {
    console.log('Someone logged out.', authResult, connection);
    if (connection) {
      app.channel('authenticated').leave(connection);
    }
  });

  /* app.service('characters').on('connect', ({ payload, connection }) => {
    console.log(`Connecting to channel: characters/${payload.characterId}`);
    app.channel(`characters/${payload.characterId}`).join(connection);
    connection.characterId = payload.characterId;
    return 'oi';
  }); */

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

    // e.g. to publish all service events to all authenticated users use
    // return app.channel('anonymous').filter(connection => connection !== hook.params.connection);
  });

  app.service('characters').publish('created', (data, hook) => {
    return app.channel('anonymous').filter(connection => connection !== hook.params.connection);
  });

  app.service('characters').publish('updated', (data, hook) => {
    return app.channel('anonymous').filter(connection => connection !== hook.params.connection);
  });

  app.service('characters').publish('patched', (data, hook) => {
    const { model } = data;
    return app.channel(`characters/${model._id}`).filter(connection => connection !== hook.params.connection);
  });

  app.service('characters').publish('connect', (characterId, hook) => {
    const { connection } = hook.params;
    console.log(`Connecting to channel: characters/${characterId}`);
    app.channel(`characters/${characterId}`).join(connection);
    connection.characterId = characterId;
  });

  app.service('characters').publish('sync', (data, hook) => {
    const { characterId } = data;
    return app.channel(`characters/${characterId}`).filter(connection => connection !== hook.params.connection);
  });

  app.service('characters').on('disconnect', (connection) => {
    const { characterId } = connection;
    delete connection.characterId;
    console.log(`Disconnecting to channel: characters/${characterId}`);
    app.channel(`characters/${characterId}`).leave(connection);
  });

  // Here you can also add service specific event publishers
  // e..g the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};

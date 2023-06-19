require('dotenv').config();

const Hapi = require('@hapi/hapi');

const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesServices');
const NotesValidator = require('./validator/notes');

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const AuthenticationsValidator = require('./validator/authentications');
const TokenManager = require('./tokenize/TokenManager');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);

  // server.ext('onPreResponse', (request, h) => {
  //   const { response } = request;
  //   if (response instanceof Error) {
  //     if (response instanceof ClientError) {
  //       const newResponse = h.response({
  //         status: 'fail',
  //         message: response.message,
  //       });
  //       newResponse.code(response.statusCode);
  //       console.log(response.message);
  //       return newResponse;
  //     }

  //     if (!response.isServer) {
  //       return h.continue;
  //     }

  //     const newResponse = h.response({
  //       status: 'error',
  //       message: 'Maaf terjadi kegagalan pada server kami',
  //     });
  //     newResponse.code(500);
  //     console.log(response.message);
  //     return newResponse;
  //   }
  //   return h.continue;
  // });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

import { Express } from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import 'reflect-metadata'; // this shim is required
import cors from 'cors';
import helmet from 'helmet';

import winston from 'winston';
import expressWinston from 'express-winston';

import {
  createExpressServer,
  getMetadataArgsStorage,
  RoutingControllersOptions,
} from 'routing-controllers';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';

import { createConnection } from 'typeorm';
import * as AuthUtils from './util/AuthHelper.util';

import { UserController } from './controllers/User.controller';
import { AuthController } from './controllers/Auth.controller';
import UserEntity from './entity/ApplicationEntities/User.entity';
// import session from "express-session";
// import path from "path";
// import passport from "passport";
// import bluebird from "bluebird";
// API keys and Passport configuration
// import * as passportConfig from "./config/passport";

const routingControllersOptions: RoutingControllersOptions = {
  controllers: [AuthController, UserController],
  routePrefix: '/api',
  authorizationChecker: AuthUtils.default.authHandler,
};

// Create Express server
// creates express app, registers all controller routes and returns you express app instance
const app: Express = createExpressServer(routingControllersOptions);

// Parse class-validator classes into JSON Schema:
const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
});

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
  },
  info: {
    description: 'Generated with `routing-controllers-openapi`',
    title: 'A sample spec API',
    version: '0.0.1',
  },
});

// TODO: Include env file
// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
    // optional: control whether you want to log the meta data about the request (default to true)
    meta: true,
    // optional: customize the default logging message.
    // E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    msg: 'HTTP {{req.method}} {{req.url}}',
    // Use the default Express/morgan request formatting.
    // Enabling this will override any msg if true.Will only output colors with colorize set to true
    expressFormat: true,
    // Color the text and status code, using the Express/morgan color palette
    // (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    colorize: false,
  }),
);

app.use('/', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

// TODO: Setup passport
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: SESSION_SECRET,
//     store: new MongoStore({
//         url: mongoUrl,
//         autoReconnect: true
//     })
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * API examples routes.
 */
// app.get("/api", apiController.getApi);
// app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

/**
 * OAuth authentication routes. (Sign in)
 */
// app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//     res.redirect(req.session.returnTo || "/");
// });

createConnection()
  .then(async () => {
    const user = new UserEntity();
    user.username = 'gotinpi499';
    user.firstName = 'Ivan';
    user.lastName = 'Petrov';
    user.age = 25;
    await user.save();
  })
  .catch((error) => {
    console.error(error);
    console.error('Unable to establish a connection to the database');
    throw new Error(error);
  });

export default app;

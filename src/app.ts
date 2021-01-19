import { Express } from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import 'reflect-metadata'; // this shim is required
import cors from 'cors';
import helmet from 'helmet';
import lusca from 'lusca';

import {
  createExpressServer,
  getMetadataArgsStorage,
  RoutingControllersOptions,
} from 'routing-controllers';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';

import * as AuthUtils from './util/AuthHelper.util';

import { UserController } from './controllers/User.controller';
import { AuthController } from './controllers/Auth.controller';

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

app.use('/', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

export default app;

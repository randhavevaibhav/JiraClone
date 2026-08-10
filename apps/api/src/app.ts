import express from 'express';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/erros.middleware';
import { notFoundMiddleware } from './middlewares/not.found.middleware';
import swaggerUi from 'swagger-ui-express';
import { generateOpenAPIDocument } from './swagger/swagger';
import { registry } from './swagger/swagger';
import { healthModule, authModule } from './modules/index';
import { invalidJson } from './middlewares/invalid-json.middleware';
import { ApiModule } from './types/route';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(invalidJson);

function bootstrapModules(modules: ApiModule[]) {
  modules.forEach((mod) => {
    const router = express.Router();

    mod.routes.forEach((route) => {
      const fullSwaggerPath = `${mod.basePath}${route.swagger.path}`;

      registry.registerPath({
        ...route.swagger,
        path: fullSwaggerPath,
      });
      const method = route.swagger.method.toLowerCase() as
        | 'get'
        | 'post'
        | 'put'
        | 'delete'
        | 'patch';
      const middlewares = route.middlewares || [];
      router[method](route.swagger.path, ...middlewares, route.handler);
    });

    app.use(mod.basePath, router);
  });
}

//boostrap api modules with swagger docs

bootstrapModules([healthModule, authModule]);

app.use(
  '/api/doc',
  swaggerUi.serve,
  swaggerUi.setup(generateOpenAPIDocument()),
);

//404 Not found middleware
app.use(notFoundMiddleware);
//keep the error middleware last
app.use(errorMiddleware);

export default app;

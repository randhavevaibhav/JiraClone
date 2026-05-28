import express from 'express';
import cookieParser from 'cookie-parser';
import healthRoutes from './modules/health/health.routes';
import { errorMiddleware } from './middlewares/erros.middleware';
import swaggerUi from 'swagger-ui-express';
import './docs/paths/health';
import { generateOpenAPIDocument } from './swagger/swagger';

const app = express();

app.get('/', (_, res) => {
  res.send({
    message: 'Home page',
  });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(generateOpenAPIDocument()));

app.use(cookieParser());
app.use(express.json());
app.use('/health', healthRoutes);

//keep the error middleware last
app.use(errorMiddleware);

export default app;

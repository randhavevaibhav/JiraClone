import { checkDatabaseHealth, checkApiHealth } from './health.controller';
import { asyncHandler } from '../../middlewares/async-handler';
import type { ApiModule } from '../../types/route';
import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

const basePath = '/health';

const apiHealthSwaggerDoc: RouteConfig = {
  method: 'get',
  path: `/api`,
  tags: ['Health'],
  summary: 'checks API health',
  responses: {
    200: {
      description: 'checks If API is running.',

      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
  },
};

const dbHealthSwaggerDoc: RouteConfig = {
  method: 'get',
  path: `/db`,
  tags: ['Health'],
  summary: 'checks db health',
  responses: {
    200: {
      description: 'checks database connection by running simple select query.',

      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
            data: z.date(),
          }),
        },
      },
    },
  },
};

export const healthModule: ApiModule = {
  basePath,
  routes: [
    {
      swagger: apiHealthSwaggerDoc,
      handler: asyncHandler(checkApiHealth),
    },
    {
      swagger: dbHealthSwaggerDoc,
      handler: asyncHandler(checkDatabaseHealth),
    },
  ],
};

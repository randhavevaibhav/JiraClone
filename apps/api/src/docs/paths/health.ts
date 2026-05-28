import { z } from 'zod';

import { registry } from '@/swagger/swagger';

registry.registerPath({
  method: 'get',

  path: '/health/db',

  tags: ['Health'],

  summary: 'Check database connection',

  responses: {
    200: {
      description: 'Database connected successfully',

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
});

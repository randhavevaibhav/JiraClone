import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { RequestHandler } from 'express';

export interface UnifiedRoute {
  swagger: RouteConfig;
  middlewares?: RequestHandler[];
  handler: RequestHandler;
}
export interface ApiModule {
  basePath: string;
  routes: UnifiedRoute[];
}

import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';

export const registry =
  new OpenAPIRegistry();

export const generateOpenAPIDocument =
  () => {
    const generator =
      new OpenApiGeneratorV3(
        registry.definitions,
      );

    return generator.generateDocument({
      openapi: '3.0.0',
      info: {
        title: 'Jira Clone API',
        version: '1.0.0',
      },
    });
  };
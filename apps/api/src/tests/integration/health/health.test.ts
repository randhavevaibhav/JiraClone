import request from 'supertest';
import { Success } from '../../../types/api-response';
import app from '../../../app';

describe('GET /health/api', () => {
  it('checks api connection', async () => {
    const response = await request(app).get('/health/api').expect(200);
    const body: Success<string> = response.body;
    expect(body.message).toBe('API is started successfully');
    expect(body.success).toBe(true);
  });
});

describe('GET /health/db', () => {
  it('checks db connection', async () => {
    const response = await request(app).get('/health/db').expect(200);
    const body: Success<Date> = response.body;

    expect(body.message).toBe('Database connected successfully');
    expect(body.success).toBe(true);
  });
});

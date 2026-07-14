import { Success } from '../../types/api-response';
import app from '../../app';
import request from 'supertest';

describe('GET /health/db', () => {
  it('checks db connection', async () => {
    const response = await request(app).get('/health/db').expect(200);
    const body: Success<Date> = response.body;

    expect(body.message).toBe('Database connected successfully');
    expect(body.success).toBe(true);
  });
});

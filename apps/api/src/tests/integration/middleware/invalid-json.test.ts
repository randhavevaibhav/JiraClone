import request from 'supertest';
import app from '../../../app';

describe('Invalid JSON Middleware', () => {
  it('should reject malformed JSON', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .set('Content-Type', 'application/json')
      .send('{"name":"abc"')
      .expect(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Validation failed',
      errors: {
        errors: ['Malformed JSON payload syntax'],
        properties: {},
      },
    });
  });
});

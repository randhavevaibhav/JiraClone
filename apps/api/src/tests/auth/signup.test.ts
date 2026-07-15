import app from '../../app';
import request from 'supertest';
import { createSignupUserDto } from '../factories';

describe('POST /auth/signup', () => {
  it('should create new user', async () => {
    const dto = createSignupUserDto();

    const response = await request(app)
      .post('/auth/signup')
      .send(dto)
      .expect(200);

    expect(response.body).toEqual({
      success: true,
      message: `signup completed !`,
      data: {
        email: dto.email,
      },
    });
  });
  it('should return 409 when user with same email already exists', async () => {
    const dto = createSignupUserDto();

    await request(app).post('/auth/signup').send(dto).expect(200);

    const response = await request(app)
      .post('/auth/signup')
      .send(dto)
      .expect(409);

    expect(response.body).toEqual({
      success: false,
      message: 'Email already exists',
    });
  });
});

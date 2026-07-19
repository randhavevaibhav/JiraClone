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

  it('should reject invalid JSON', async () => {
    const malformedJsonString =
      '{"email": "test@example.com", "password": "123"';
    const response = await request(app)
      .post('/auth/signup')
      .set('Content-Type', 'application/json')
      .send(malformedJsonString)
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

  it('should reject empty request body', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({})
      .expect(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Validation failed',
      errors: {
        errors: [],
        properties: {
          name: {
            errors: ['Invalid input: expected string, received undefined'],
          },
          email: {
            errors: ['Invalid input: expected string, received undefined'],
          },
          password: {
            errors: ['Invalid input: expected string, received undefined'],
          },
        },
      },
    });
  });

  describe('User name validation tests', () => {
    it('should reject username less than 3 characters', async () => {
      const dto = createSignupUserDto({
        name: 'a',
      });

      const response = await request(app)
        .post('/auth/signup')
        .send(dto)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: 'Validation failed',
        errors: {
          errors: [],
          properties: {
            name: {
              errors: ['Full name must be at least 3 characters'],
            },
          },
        },
      });
    });
  });

  describe('Email validation tests', () => {
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

    it('should reject invalid email', async () => {
      const dto = createSignupUserDto({
        email: 'abc',
      });
      const response = await request(app)
        .post('/auth/signup')
        .send(dto)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: 'Validation failed',
        errors: {
          errors: [],
          properties: {
            email: {
              errors: ['Please enter a valid email address'],
            },
          },
        },
      });
    });
  });

  describe('Password validation tests', () => {
    test.each([
      {
        description:
          'should reject invalid password and give all validation errors.',
        password: '1',
        expectedErrors: [
          'Password must be at least 8 characters',
          'Password must contain at least one uppercase letter',
          'Password must contain at least one lowercase letter',
        ],
      },
      {
        description:
          'should reject short password and give respective error message.',
        password: '1aA',
        expectedErrors: ['Password must be at least 8 characters'],
      },
      {
        description: 'should reject password without a numeric character',
        password: 'aAbcdefghi',
        expectedErrors: ['Password must contain at least one number'],
      },
      {
        description: 'should reject password without a lowercase character',
        password: '1ABCDEFGHI&EE',
        expectedErrors: ['Password must contain at least one lowercase letter'],
      },
      {
        description: 'should reject password without a uppercase character',
        password: '1abcdefghik',
        expectedErrors: ['Password must contain at least one uppercase letter'],
      },
    ])('$description', async ({ password, expectedErrors }) => {
      const dto = createSignupUserDto({ password });
      const response = await request(app)
        .post('/auth/signup')
        .send(dto)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: 'Validation failed',
        errors: {
          errors: [],
          properties: {
            password: {
              errors: expectedErrors,
            },
          },
        },
      });
    });
  });
});

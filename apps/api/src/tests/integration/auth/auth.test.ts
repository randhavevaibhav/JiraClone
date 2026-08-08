import app from '../../../app';
import request from 'supertest';
import { createUserDto } from '../../factories';
import { db, users } from '../../../db';
import bcrypt from 'bcrypt';
import { Failure, Success } from '@/types/api-response';
import { LoginResponseType } from '@/modules/auth/auth.types';

describe('auth tests', () => {
  //db cleanup
  beforeEach(async () => {
    await db.delete(users);
  });

  // signup tests
  describe('POST /auth/signup', () => {
    it('should create new user', async () => {
      const dto = createUserDto();

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
        const dto = createUserDto({
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
        const dto = createUserDto();

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
        const dto = createUserDto({
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
          expectedErrors: [
            'Password must contain at least one lowercase letter',
          ],
        },
        {
          description: 'should reject password without a uppercase character',
          password: '1abcdefghik',
          expectedErrors: [
            'Password must contain at least one uppercase letter',
          ],
        },
      ])('$description', async ({ password, expectedErrors }) => {
        const dto = createUserDto({ password });
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

  // login tests
  describe('POST /auth/login', () => {
    const testUser = createUserDto();
    beforeEach(async () => {
      const passwordHash = await bcrypt.hash(testUser.password, 10);
      await db.insert(users).values({
        fullName: testUser.name,
        passwordHash,
        email: testUser.email,
      });
    });
    it('should reject login with empty body', async () => {
      const response = await request(app).post('/auth/login').send({});
      const body = response.body;
      expect(response.status).toBe(400);
      expect(body).toEqual({
        success: false,
        message: 'Validation failed',
        errors: {
          errors: [],
          properties: {
            email: {
              errors: ['Please enter a valid email address'],
            },
            password: {
              errors: ['Invalid input: expected string, received undefined'],
            },
          },
        },
      });
    });
    it('should able to login authenticated user', async () => {
      const response = await request(app).post('/auth/login').send({
        email: testUser.email,
        password: testUser.password,
      });
      const body: Success<LoginResponseType> = response.body;

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.message).toBe('user validated !');
    });
    it('should reject login when user does not exist', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'unknownuser123@gmial.com',
        password: '12345678AaRR',
      });
      const body: Failure = response.body;
      expect(response.status).toBe(401);
      expect(body.success).toBe(false);
      expect(body.message).toBe('Invalid email or password');
    });
    it('should reject login with incorrect password', async () => {
      const response = await request(app).post('/auth/login').send({
        email: testUser.email,
        password: 'WrongPass12345',
      });
      const body: Failure = response.body;
      expect(response.status).toBe(401);
      expect(body.success).toBe(false);
      expect(body.message).toBe('Invalid email or password');
    });
    it('should reject login with missing email', async () => {
      const response = await request(app).post('/auth/login').send({
        password: testUser.password,
      });
      const body: Failure = response.body;
      expect(response.status).toBe(400);
      expect(body).toEqual({
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
    it('should reject login with missing password', async () => {
      const response = await request(app).post('/auth/login').send({
        email: testUser.email,
      });
      const body: Failure = response.body;
      expect(response.status).toBe(400);
      expect(body).toEqual({
        success: false,
        message: 'Validation failed',
        errors: {
          errors: [],
          properties: {
            password: {
              errors: ['Invalid input: expected string, received undefined'],
            },
          },
        },
      });
    });
    it('should reject login for invalid email', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'not-a-email',
        password: testUser.password,
      });
      const body = response.body;
      expect(response.status).toBe(400);
      expect(body).toEqual({
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
});

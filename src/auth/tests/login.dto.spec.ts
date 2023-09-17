import { plainToInstance } from 'class-transformer';
import { LoginDto } from '../dto/login.dto';
import { validate } from 'class-validator';

describe('LoginDTO', () => {
  it('should pass when everything is OK', async () => {
    const loginData = {
      email: 'test@test.com',
      password: 'password',
    };
    const loginDto = plainToInstance(LoginDto, loginData);
    const errors = await validate(loginDto);
    expect(errors.length).toBe(0);
  });

  it('should throw when email is empty', async () => {
    const loginData = {
      password: 'password',
    };
    const loginDto = plainToInstance(LoginDto, loginData);
    const errors = await validate(loginDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('email should not be empty');
  });

  it('should throw when email is not valid', async () => {
    const loginData = {
      email: 'test',
      password: 'password',
    };
    const loginDto = plainToInstance(LoginDto, loginData);
    const errors = await validate(loginDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('email must be an email');
  });

  it('should throw when password is empty', async () => {
    const loginData = {
      email: 'test@test.com',
    };
    const loginDto = plainToInstance(LoginDto, loginData);
    const errors = await validate(loginDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('password should not be empty');
  });

  it('should throw when password is not a string', async () => {
    const loginData = {
      email: 'test@test.com',
      password: 1234567,
    };
    const loginDto = plainToInstance(LoginDto, loginData);
    const errors = await validate(loginDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('password must be a string');
  });

  it('should throw when password < 6 characters', async () => {
    const loginData = {
      email: 'test@test.com',
      password: 'test',
    };
    const loginDto = plainToInstance(LoginDto, loginData);
    const errors = await validate(loginDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      'password must be longer than or equal to 6 characters',
    );
  });
});

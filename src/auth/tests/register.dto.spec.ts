import { plainToInstance } from 'class-transformer';
import { RegisterDto } from '../dto/register.dto';
import { validate } from 'class-validator';

describe('RegisterDTO', () => {
  it('should pass when everything is OK', async () => {
    const registerDto = {
      email: 'test@test.com',
      name: 'Test Name',
      username: 'test',
      password: 'password',
    };
    const loginDto = plainToInstance(RegisterDto, registerDto);
    const errors = await validate(loginDto);
    expect(errors.length).toBe(0);
  });

  it('should throw when email is empty', async () => {
    const registerData = {
      name: 'Test Name',
      username: 'test',
      password: 'password',
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('email should not be empty');
  });

  it('should throw when email is not valid', async () => {
    const registerData = {
      email: 'test',
      name: 'Test Name',
      username: 'test',
      password: 'password',
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('email must be an email');
  });

  it('should throw when name is empty', async () => {
    const registerData = {
      email: 'test@test.com',
      username: 'test',
      password: 'password',
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('name should not be empty');
  });

  it('should throw when name is not a string', async () => {
    const registerData = {
      email: 'test@test.com',
      name: 12345,
      username: 'test',
      password: 'password',
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('name must be a string');
  });

  it('should throw when username is empty', async () => {
    const registerData = {
      email: 'test@test.com',
      name: 'Test User',
      password: 'password',
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('username should not be empty');
  });

  it('should throw when username is not a string', async () => {
    const registerData = {
      email: 'test@test.com',
      name: 'Test User',
      username: 123456,
      password: 'password',
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('username must be a string');
  });

  it('should throw when username < 4 symbols', async () => {
    const registerData = {
      email: 'test@test.com',
      name: 'Test User',
      username: 'cat',
      password: 'password',
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      'username must be longer than or equal to 4 characters',
    );
  });

  it('should throw when password is empty', async () => {
    const registerData = {
      email: 'test@test.com',
      name: 'Test User',
      username: 'test',
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('password should not be empty');
  });

  it('should throw when password is not a string', async () => {
    const registerData = {
      email: 'test@test.com',
      name: 'Test User',
      username: 'test',
      password: 12345678,
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('password must be a string');
  });

  it('should throw when password < 6 symbols', async () => {
    const registerData = {
      email: 'test@test.com',
      name: 'Test User',
      username: 'cat',
      password: 'pswd',
    };
    const registerDto = plainToInstance(RegisterDto, registerData);
    const errors = await validate(registerDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      'password must be longer than or equal to 6 characters',
    );
  });
});

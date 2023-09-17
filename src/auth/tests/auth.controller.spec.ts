import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthEntity } from '../entity/auth.entity';
import { RegisterDto } from '../dto/register.dto';
import { authEntityStub } from './authEntity.stub';
import { LoginDto } from '../dto/login.dto';

jest.mock('../auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    describe('when register is called', () => {
      let authEntity: AuthEntity;
      const registerDto: RegisterDto = {
        email: 'test@test.com',
        name: 'Test User',
        username: 'test',
        password: 'test_password',
      };

      beforeEach(async () => {
        authEntity = await authController.register(registerDto);
      });

      it('should call authService', () => {
        expect(authService.register).toBeCalledWith(registerDto);
      });

      it('should return accessToken', () => {
        expect(authEntity).toEqual(authEntityStub());
      });
    });
  });

  describe('login', () => {
    describe('when login is called', () => {
      let authEntity: AuthEntity;
      const loginDto: LoginDto = {
        email: 'test@test.com',
        password: 'test_password',
      };

      beforeEach(async () => {
        authEntity = await authController.login(loginDto);
      });

      it('should call authService', () => {
        expect(authService.login).toBeCalledWith(
          loginDto.email,
          loginDto.password,
        );
      });

      it('should return accessToken', () => {
        expect(authEntity).toEqual(authEntityStub());
      });
    });
  });
});

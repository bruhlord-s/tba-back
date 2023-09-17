import { authEntityStub } from '../tests/authEntity.stub';

export const AuthService = jest.fn().mockReturnValue({
  register: jest.fn().mockResolvedValue(authEntityStub()),
  login: jest.fn().mockResolvedValue(authEntityStub()),
});

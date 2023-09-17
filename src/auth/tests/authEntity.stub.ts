import { AuthEntity } from '../entity/auth.entity';

export const authEntityStub = (): AuthEntity => {
  return {
    accessToken: 'some_token_value',
  };
};

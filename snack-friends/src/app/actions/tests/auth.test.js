import { login } from '../auth';

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    delete: jest.fn(),
  })),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  compareSync: jest.fn(),
  hashSync: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

describe('auth functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return error if user is not found', async () => {
    const result = await login('cerceilanister@got.com', '123');
    expect(result).toEqual({
      message: 'Usuário não encontrado',
      status: 400,
    });
  });

  it('should return error if password is invalid', async () => {
    const result = await login('ellie@thelastofus.com', '456321');
    expect(result).toEqual({
      message: 'Senha inválida',
      status: 400,
    });
  });
});

import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { redirect, useRouter } from 'next/navigation';

import SignIn from '../page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    set: jest.fn(),
  })),
}));

describe('SignIn Page', () => {
  it('should render the login form', () => {
    render(<SignIn />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument();
    expect(screen.getByText('Crie aqui!')).toBeInTheDocument();
  });

  it('should navigate to the register page', async () => {
    const pushMock = jest.fn();
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }));

    render(<SignIn />);

    await userEvent.click(screen.getByText('Crie aqui!'));

    expect(pushMock).toHaveBeenCalledWith('/register');
  });

  it('should display an error message on login failure when user is not found', async () => {
    render(<SignIn />);

    await userEvent.type(
      screen.getByPlaceholderText('Email'),
      'link@zelda.com'
    );
    await userEvent.type(screen.getByPlaceholderText('Senha'), 'princesspeach');

    await userEvent.click(screen.getByText('Login'));

    expect(
      await screen.findByText('Usuário não encontrado')
    ).toBeInTheDocument();
  });

  it('should display an error message on login failure when password is wrong', async () => {
    render(<SignIn />);

    await userEvent.type(
      screen.getByPlaceholderText('Email'),
      'ellie@thelastofus.com'
    );
    await userEvent.type(screen.getByPlaceholderText('Senha'), '123564');

    await userEvent.click(screen.getByText('Login'));

    expect(await screen.findByText('Senha inválida')).toBeInTheDocument();
  });

  it('should login user successfully', async () => {
    render(<SignIn />);

    await userEvent.type(
      screen.getByPlaceholderText('Email'),
      'ellie@thelastofus.com'
    );
    await userEvent.type(screen.getByPlaceholderText('Senha'), '123456');

    await userEvent.click(screen.getByText('Login'));

    expect(redirect).toHaveBeenCalledWith('/');
  });
});

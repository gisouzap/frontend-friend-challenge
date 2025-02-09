import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { render, screen } from '@/test-utils';
import { register } from '@/app/actions/auth';
import { toaster } from '@/components/ui/toaster';

import Register from '../page';

jest.mock('@/app/actions/auth', () => ({
  register: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock('@/components/ui/toaster', () => ({
  toaster: {
    create: jest.fn(),
  },
  Toaster: () => <div>Toaster</div>,
}));

describe('Register Page', () => {
  afterEach(() => jest.clearAllMocks());

  it('should renders the registration form', () => {
    render(<Register />);

    expect(screen.getByText('Registrar')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Daenerys Targaryen')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('danytargaryen@gmail.com')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('drac4rys')).toBeInTheDocument();
    expect(screen.getByText('Já tem conta?')).toBeInTheDocument();
    expect(screen.getByText('Entre aqui!')).toBeInTheDocument();
  });

  it('should submit the registration form successfully', async () => {
    const pushMock = jest.fn();
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }));

    register.mockResolvedValue({
      status: 201,
      user: {
        id: 1,
        email: 'danytargaryen@gmail.com',
        username: 'Daenerys Targaryen',
      },
      message: 'Registro realizado com sucesso!',
    });

    render(<Register />);

    await userEvent.type(
      screen.getByPlaceholderText('Daenerys Targaryen'),
      'Daenerys Targaryen'
    );
    await userEvent.type(
      screen.getByPlaceholderText('danytargaryen@gmail.com'),
      'danytargaryen@gmail.com'
    );
    await userEvent.type(screen.getByPlaceholderText('drac4rys'), 'drac4rys');

    await userEvent.click(screen.getByText('Registrar'));

    expect(register).toHaveBeenCalledWith({
      email: 'danytargaryen@gmail.com',
      password: 'drac4rys',
      username: 'Daenerys Targaryen',
    });

    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('should displays an error message on registration failure', async () => {
    register.mockResolvedValue({
      status: 400,
      message: 'E-mail já está em uso.',
    });

    render(<Register />);

    await userEvent.type(
      screen.getByPlaceholderText('Daenerys Targaryen'),
      'Daenerys Targaryen'
    );
    await userEvent.type(
      screen.getByPlaceholderText('danytargaryen@gmail.com'),
      'danytargaryen@gmail.com'
    );
    await userEvent.type(screen.getByPlaceholderText('drac4rys'), 'drac4rys');

    await userEvent.click(screen.getByText('Registrar'));

    expect(toaster.create).toHaveBeenCalledWith({
      description: 'E-mail já está em uso.',
      type: 'error',
    });
  });

  it('should navigate to the login page', async () => {
    const pushMock = jest.fn();
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }));

    render(<Register />);

    await userEvent.click(screen.getByText('Entre aqui!'));

    expect(pushMock).toHaveBeenCalledWith('/sign-in');
  });
});

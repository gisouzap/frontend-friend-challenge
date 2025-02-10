// Dashboard.test.js
import React from 'react';
import { render, screen, waitFor } from '@/test-utils';

import Dashboard from '../page';
import userEvent from '@testing-library/user-event';
import { redirect, useRouter } from 'next/navigation';

jest.mock('@/app/actions/auth', () => ({
  __esModule: true,
  getAuthUser: jest.fn(),
  logout: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

describe('Dashboard', () => {
  const mockUser = {
    id: 1,
    username: 'Test User',
    picture: 'test.jpg',
  };

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUser));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the dashboard page properly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(`${mockUser.username}!`)).toBeInTheDocument();
    });

    expect(screen.getByText('Amigos Adicionados')).toBeInTheDocument();

    expect(screen.getByText('Descubra novos amigos')).toBeInTheDocument();

    expect(screen.getByText('Convites Recebidos')).toBeInTheDocument();
  });

  it('should send a friend request', async () => {
    const { container, rerender } = render(<Dashboard />);

    rerender(<Dashboard />);

    const sendRequestButton = screen.getAllByTestId('add-button')[0];
    userEvent.click(sendRequestButton);

    await waitFor(() => {
      expect(screen.getByText('Convite enviado!')).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });
});

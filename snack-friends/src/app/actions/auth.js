'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { findUserByEmail, usersDB, findUserById } from '@/app/lib/mockDB';

export async function login(email, password) {
  const user = findUserByEmail(email);
  if (!user) {
    return {
      message: 'Usuário não encontrado',
      status: 400,
    };
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return {
      message: 'Senha inválida',
      status: 400,
    };
  }

  const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });

  const cookieStore = await cookies();

  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    path: '/',
  });

  redirect('/');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');

  redirect('/sign-in');
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, 'secreto');

    const user = findUserById(decoded.userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      picture: user.picture,
    };
  } catch (error) {
    return null;
  }
}

export async function register({ email, password, username }) {
  try {
    if (!email || !password || !username) {
      return { message: 'Todos os campos são obrigatórios.', status: 400 };
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return { message: 'E-mail inválido.', status: 400 };
    }

    if (password.length < 6) {
      return {
        message: 'A senha deve ter pelo menos 6 caracteres.',
        status: 400,
      };
    }

    if (findUserByEmail(email)) {
      return { message: 'Usuário já existe.', status: 400 };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      id: usersDB.length + 1,
      email,
      username,
      password: hashedPassword,
      friends: [],
    };

    const token = jwt.sign({ userId: newUser.id }, 'secreto', {
      expiresIn: '1h',
    });

    const cookieStore = cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
    });

    return {
      user: newUser,
      status: 201,
      message: 'Usuário criado com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);

    return {
      message:
        'Ocorreu um erro ao registrar o usuário. Tente novamente mais tarde.',
      status: 500,
    };
  }
}

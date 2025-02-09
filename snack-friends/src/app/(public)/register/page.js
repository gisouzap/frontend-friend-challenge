'use client';

import { toaster, Toaster } from '@/components/ui/toaster';

import { register } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import logoImg from '@/public/snack-logo.png';

import {
  Box,
  Button,
  Field,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function Register() {
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
      username: formData.get('username'),
    };

    const response = await register(userData);

    if (response.status === 400) {
      return toaster.create({
        description: response.message,
        type: 'error',
      });
    }

    if (response.status === 201) {
      localStorage.setItem('user', JSON.stringify(response.user));

      toaster.create({
        description: response.message,
        type: 'success',
      });
    }

    router.push('/');
  };

  const handleLoginClick = () => {
    router.push('/sign-in');
  };

  return (
    <Box
      alignContent="center"
      alignSelf="center"
      backgroundColor="bg.subtle"
      borderRadius="md"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      gap={8}
      height={{ base: '100%', md: 'auto', lg: 'auto' }}
      justifyContent="center"
      maxHeight="auto"
      maxWidth="100%"
      mh="auto"
      mx="auto"
      overflow="hidden"
      p="6"
      width={{ base: '100%', md: '40%', lg: '40%' }}
    >
      <HStack
        alignItems="baseline"
        gap={2}
        justifyContent="center"
        width="100%"
      >
        <Image src={logoImg} alt="logo snack" width={100} height={100} />
        <Heading
          color="yellow.100"
          fontSize={{ base: '1xl', md: '1xl', lg: '2xl' }}
        >
          Friends
        </Heading>
      </HStack>

      <form onSubmit={handleSubmit}>
        <Box
          alignContent="center"
          display="flex"
          flexDirection="column"
          gap={4}
          overflow="hidden"
        >
          <Field.Root>
            <Field.Label fontSize={{ base: 'sm', md: 'md' }}>
              Usuário
            </Field.Label>
            <Input
              type="username"
              name="username"
              placeholder="Daenerys Targaryen"
              required
            />
          </Field.Root>
          <Field.Root>
            <Field.Label fontSize={{ base: 'sm', md: 'md' }}>Email</Field.Label>
            <Input
              type="email"
              name="email"
              placeholder="danytargaryen@gmail.com"
              required
            />
          </Field.Root>
          <Field.Root>
            <Field.Label fontSize={{ base: 'sm', md: 'md' }}>Senha</Field.Label>
            <Input
              type="password"
              name="password"
              placeholder="drac4rys"
              required
            />
          </Field.Root>
          <Button size="md" type="submit">
            Registrar
          </Button>

          <VStack gap="1" justifyContent="center">
            <Text fontSize={{ base: 'xs', md: 'sm' }}>Já tem conta?</Text>
            <Button
              fontSize={{ base: 'xs', md: 'sm' }}
              onClick={handleLoginClick}
              size="small"
              type="button"
              variant="plain"
            >
              Entre aqui!
            </Button>
          </VStack>
        </Box>
      </form>
      <Toaster />
    </Box>
  );
}

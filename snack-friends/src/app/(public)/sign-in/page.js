'use client';

import { toaster, Toaster } from '@/components/ui/toaster';
import { login } from '@/app/actions/auth';
import logoImg from '@/public/snack-logo.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await login(email, password);

    if (result?.status === 400) {
      toaster.create({
        description: result.message,
        type: 'error',
      });
    }

    setIsLoading(false);
  };

  const handleRegisterClick = () => {
    router.push('/register');
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
        <Image src={logoImg} alt="logo snack" width={100} />
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
            <Field.Label fontSize={{ base: 'sm', md: 'md' }}>Email</Field.Label>
            <Input type="email" name="email" placeholder="Email" required />
          </Field.Root>

          <Field.Root>
            <Field.Label fontSize={{ base: 'sm', md: 'md' }}>Senha</Field.Label>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              required
            />
          </Field.Root>

          <Button loading={isLoading} size="md" type="submit">
            Login
          </Button>
        </Box>
      </form>

      <VStack gap="1" justifyContent="center">
        <Text fontSize={{ base: 'xs', md: 'sm' }}>Ainda não tem conta?</Text>
        <Button
          fontSize={{ base: 'xs', md: 'sm' }}
          onClick={handleRegisterClick}
          size="small"
          type="button"
          variant="plain"
        >
          Crie aqui!
        </Button>
      </VStack>
      <Toaster />
    </Box>
  );
}

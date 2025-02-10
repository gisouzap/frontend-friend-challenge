'use client';

import { Avatar, Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { RiUserAddLine } from 'react-icons/ri';

const AvailableUsers = ({ users, onSendRequest }) => {
  if (!users.length) {
    return <Text fontSize="sm">Nenhum usuário encontrado.</Text>;
  }

  return (
    <>
      {users?.map(u => (
        <Box
          key={u.id}
          p="4"
          boxShadow="md"
          borderRadius="md"
          borderWidth="thin"
          borderColor="gray.800"
          overflow="hidden"
          width="100%"
        >
          <HStack
            alignItems="center"
            spacing="4"
            justifyContent="space-between"
          >
            <Avatar.Root size={'md'}>
              <Avatar.Fallback name={u.username} />
              <Avatar.Image src={u.picture} />
            </Avatar.Root>

            <Text fontSize="medium" fontWeight="light">
              {u.username}
            </Text>

            <IconButton
              size={'sm'}
              onClick={() => onSendRequest(u.id)}
              colorPalette="gray"
            >
              <RiUserAddLine />
            </IconButton>
          </HStack>
        </Box>
      ))}
    </>
  );
};

export default memo(AvailableUsers);

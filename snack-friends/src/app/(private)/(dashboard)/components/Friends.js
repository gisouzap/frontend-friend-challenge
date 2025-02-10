'use client';

import { Avatar, Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { FaUserXmark } from 'react-icons/fa6';

const Friends = ({ users, onRemoveFriend }) => {
  if (!users.length) {
    return <Text fontSize="sm">Nenhum usuário encontrado.</Text>;
  }

  return (
    <>
      {users?.map(user => (
        <Box
          key={user.id}
          p="4"
          boxShadow="md"
          borderRadius="md"
          borderWidth="thin"
          borderColor="gray.800"
          overflow="hidden"
          width="100%"
        >
          <HStack key={user.id} justifyContent="space-between">
            <Avatar.Root size={'md'}>
              <Avatar.Fallback name={user.username} />
              <Avatar.Image src={user.picture} />
            </Avatar.Root>
            <Text fontSize="sm">{user.username}</Text>
            <IconButton
              size="sm"
              colorPalette="red"
              onClick={() => onRemoveFriend(user.id)}
            >
              <FaUserXmark />
            </IconButton>
          </HStack>
        </Box>
      ))}
    </>
  );
};

export default memo(Friends);

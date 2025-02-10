'use client';

import { Avatar, Box, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';

const SentFriendRequests = ({ users }) => {
  if (!users.length) {
    return <Text fontSize="sm"> Nenhum usuário adicionado.</Text>;
  }

  return (
    <>
      {users.map(user => (
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
          <VStack>
            <Text>{user.username}</Text>
            <Avatar.Root size={'md'}>
              <Avatar.Fallback name={user.username} />
              <Avatar.Image src={user.picture} />
            </Avatar.Root>
            <Text fontSize="sm"> (Aguardando)</Text>
          </VStack>
        </Box>
      ))}
    </>
  );
};

export default memo(SentFriendRequests);

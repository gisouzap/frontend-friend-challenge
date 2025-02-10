'use client';

import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { FaUserXmark } from 'react-icons/fa6';

const ReceivedFriendRequests = ({ users, onAccept, onDecline }) => {
  if (!users.length) {
    return <Text fontSize="sm">Nenhuma solicitação recebida.</Text>;
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
          <VStack key={user.id}>
            <Avatar.Root size={'md'}>
              <Avatar.Fallback name={user.username} />
              <Avatar.Image src={user.picture} />
            </Avatar.Root>
            <Text>{user.username}</Text>
            <HStack>
              <IconButton
                colorPalette="green"
                onClick={() => onAccept(user.id)}
              >
                <FaUserCheck />
              </IconButton>
              <IconButton colorPalette="red" onClick={() => onDecline(user.id)}>
                <FaUserXmark />
              </IconButton>
            </HStack>
          </VStack>
        </Box>
      ))}
    </>
  );
};

export default memo(ReceivedFriendRequests);

'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { Avatar, Button, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';

const Friends = ({ users, onRemoveFriend }) => {
  if (!users.length) {
    return <Text fontSize="sm">Nenhum usuário encontrado.</Text>;
  }

  return (
    <>
      {users?.map(user => (
        <VStack key={user.id}>
          <Tooltip content={user.username}>
            <Avatar.Root size={'md'}>
              <Avatar.Fallback name={user.username} />
              <Avatar.Image src={user.picture} />
            </Avatar.Root>
          </Tooltip>
          <Button color="red" onClick={() => onRemoveFriend(user.id)}>
            excluir amigo
          </Button>
        </VStack>
      ))}
    </>
  );
};

export default memo(Friends);

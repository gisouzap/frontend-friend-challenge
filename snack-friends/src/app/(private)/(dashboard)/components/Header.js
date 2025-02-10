import { Heading, HStack, IconButton } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';

import Image from 'next/image';
import logoImg from '@/public/snack-logo.png';

const Header = ({ onLogout }) => {
  return (
    <HStack justifyContent="space-between" mb={6}>
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

      <IconButton
        aria-label="Logout"
        data-testid="logout-button"
        onClick={onLogout}
      >
        <MdLogout />
      </IconButton>
    </HStack>
  );
};

export default Header;

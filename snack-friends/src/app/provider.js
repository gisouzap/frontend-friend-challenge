'use client';

import { defaultSystem, ChakraProvider, Theme } from '@chakra-ui/react';

export default function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Theme appearance="dark" colorPalette="yellow">
        {props.children}
      </Theme>
    </ChakraProvider>
  );
}

'use client';

import { defaultSystem, ChakraProvider, Theme } from '@chakra-ui/react';

export default function RootLayout(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Theme appearance="dark" colorPalette="yellow">
        {props.children}
      </Theme>
    </ChakraProvider>
  );
}

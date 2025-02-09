import { ChakraProvider, theme, defaultSystem } from '@chakra-ui/react';
import { render } from '@testing-library/react';

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => (
      <ChakraProvider theme={theme} value={defaultSystem}>
        {children}
      </ChakraProvider>
    ),
    ...options,
  });

export * from '@testing-library/react';

export { customRender as render };

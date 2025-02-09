import { Box } from '@chakra-ui/react';
import Provider from '../provider';
import { Roboto } from 'next/font/google';

export const metadata = {
  title: 'Snack Friends',
  description: 'Techinical frontend test',
};

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function PublicLayout({ children }) {
  return (
    <html className={roboto.className} suppressHydrationWarning>
      <body>
        <Provider>
          <Box
            height="100vh"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            w="100%"
          >
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}

import { GridItem, VStack, Heading, Separator } from '@chakra-ui/react';

const SectionContainer = ({ title, children, borderColor = 'yellow.100' }) => {
  return (
    <GridItem
      border="1px solid"
      borderColor={borderColor}
      borderRadius={4}
      p={6}
      overflow="auto"
      height="100%"
      colorScheme="dark"
    >
      <VStack p={0} gap={6}>
        <Heading>{title}</Heading>
        <Separator borderColor="yellow.500" width="100%" />
        {children}
      </VStack>
    </GridItem>
  );
};

export default SectionContainer;

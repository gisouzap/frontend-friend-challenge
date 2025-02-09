import '@testing-library/jest-dom';

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = obj => {
    if (obj === undefined) {
      return undefined;
    }
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (error) {
      console.error('Error cloning the object', error);
      return null;
    }
  };
}

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

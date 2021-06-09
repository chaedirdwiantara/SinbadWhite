jest.mock('react-native-fs', () => {
    return {
        RNFS: jest.fn()
    };
  });
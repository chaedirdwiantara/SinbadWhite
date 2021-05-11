jest.mock('rn-fetch-blob', () => {
    return {
        RNFetchBlob: jest.fn()
    };
  });

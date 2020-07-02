import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const LoadingLoadMore = () => {
  return (
    <View style={styles.loadMoreContainer}>
      <Image
        source={require('../assets/gif/loading/load_more.gif')}
        style={{ height: 50, width: 50 }}
      />
    </View>
  );
};

const LoadingPage = () => {
  return (
    <View style={styles.loadingPage}>
      <Image
        source={require('../assets/gif/loading/load_triagle.gif')}
        style={{ height: 80, width: 80 }}
      />
    </View>
  );
};

const LoadingHorizontal = () => {
  return (
    <View style={styles.loadingPage}>
      <Image
        source={require('../assets/gif/loading/load-horizontal.gif')}
        style={{ height: 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadMoreContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  loadingPage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

export { LoadingLoadMore, LoadingPage, LoadingHorizontal };

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 02072020
* updatedFunction:
* -> Add component LoadingHorizontal
* 
*/


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

const styles = StyleSheet.create({
  loadMoreContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  }
});

export { LoadingLoadMore };

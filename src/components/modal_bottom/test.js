import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  Image,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

class TestModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightModal: 0,
      initialHeight: 100
    };
  }

  test(persen) {
    const heightM = 1 - persen;
    this.setState({ heightModal: heightM * height });
  }

  finish(dir) {
    if (dir.swipingDirection === 'up') {
      if (this.state.initialHeight + this.state.heightModal >= 0.45 * height) {
        this.setState({
          initialHeight: 0.45 * height,
          heightModal: 0
        });
      } else if (this.state.initialHeight + this.state.heightModal > 100) {
        this.setState({
          initialHeight: 0.45 * height,
          heightModal: 0
        });
      }
    } else {
      this.setState({
        initialHeight: 100,
        heightModal: 0
      });
    }
  }

  renderItem({ item, index }) {
    return (
      <View key={index}>
        <Text>{item}</Text>
      </View>
    );
  }

  renderSeparator() {
    return <View style={{ borderBottomWidth: 2 }} />;
  }

  renderFlatlist() {
    return (
      <FlatList
        contentContainerStyle={styles.boxTag}
        initialScrollIndex={0}
        showsHorizontalScrollIndicator={false}
        data={[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18'
        ]}
        extraData={this.props}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }

  render() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={false}
        coverScreen={false}
        scrollOffset={1}
        scrollOffsetMax={0.45}
        swipeDirection={['up', 'down']}
        swipeThreshold={0}
        onSwipeComplete={dir => this.finish(dir)}
        onSwipeMove={persen => this.test(persen)}
        deviceHeight={height}
        style={{ marginBottom: 0, marginLeft: 0, marginRight: 0 }}
      >
        <View
          style={[
            styles.modalContainer,
            { height: this.state.initialHeight + this.state.heightModal }
          ]}
        >
          {this.renderFlatlist()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    borderTopRightRadius: 20,
    //  height: 0.45 * height,
    maxHeight: 0.45 * height,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(TestModal);

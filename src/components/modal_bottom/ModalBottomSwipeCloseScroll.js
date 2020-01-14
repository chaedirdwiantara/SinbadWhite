import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import masterColor from '../../config/masterColor.json';
import { StatusBarBlackOP40 } from '../StatusBarGlobal';
import GlobalStyle from '../../helpers/GlobalStyle';
import Fonts from '../../helpers/GlobalFont';

const { width, height } = Dimensions.get('window');

class ModalBottomSwipeCloseScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: null
    };
    this.scrollViewRef = React.createRef();
  }

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo(p);
    }
  };
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <View style={GlobalStyle.linesSwipeModal} />
        </View>
        <View style={styles.boxContentTitle}>
          {this.props.closeButton ? (
            <TouchableOpacity
              style={styles.boxClose}
              onPress={this.props.close}
            >
              <MaterialIcon
                name="close"
                color={masterColor.fontBlack50}
                size={24}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {this.props.title ? (
            <View>
              <Text style={Fonts.type7}>{this.props.title}</Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>
        <ScrollView
          style={{ height: 0.2 * height }}
          ref={this.scrollViewRef}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={16}
        >
          <View style={{ flex: 1 }}>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lili</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lala</Text>
            <Text>lili</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  /** === RENDER STATUS BAR === */
  renderContent() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        scrollOffsetMax={0.2 * height} // content height - ScrollView height
        swipeDirection={['down']}
        backdropColor={masterColor.fontBlack100}
        backdropOpacity={0.4}
        onSwipeMove={this.props.close}
        deviceHeight={height}
        style={styles.mainContainer}
      >
        <View style={styles.contentContainer}>
          {this.renderContentTitle()}
          {this.renderContentBody()}
        </View>
      </Modal>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View>
        <StatusBarBlackOP40 />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: 0.3 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1,
    paddingTop: 20
  },
  boxContentTitle: {
    marginTop: 18,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(ModalBottomSwipeCloseScroll);

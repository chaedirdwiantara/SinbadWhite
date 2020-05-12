import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from 'react-native-text';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

class ProgressBarType1 extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * ======================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER TITLE === */
  renderTitle() {
    return (
      <View style={styles.boxTitle}>
        <Text style={Fonts.type8}>
          {this.props.currentStep}/{this.props.totalStep} {this.props.title}
        </Text>
      </View>
    );
  }
  /** === RENDER BAR === */
  renderBar() {
    return (
      <View style={styles.boxBar}>
        <View style={styles.fullBar}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${(this.props.currentStep / this.props.totalStep) *
                  100}%`
              }
            ]}
          />
        </View>
        <View style={{ paddingLeft: 16 }}>
          <Text style={Fonts.type17}>
            {this.props.currentStep}/{this.props.totalStep}
          </Text>
        </View>
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.props.title ? this.renderTitle() : <View />}
        {this.renderBar()}
      </View>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  fullBar: {
    height: 8,
    flex: 1,
    backgroundColor: masterColor.fontBlack10,
    borderRadius: 8
  },
  boxBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  boxTitle: {
    paddingBottom: 10
  },
  progressBar: {
    position: 'absolute',
    height: '100%',
    left: 0,
    borderRadius: 8,
    backgroundColor: masterColor.mainColor
  }
});

export default ProgressBarType1;

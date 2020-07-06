import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import masterColor from '../config/masterColor.json';
import Fonts from '../helpers/GlobalFont';
import GlobalStyles from '../helpers/GlobalStyle';

class SelectedMerchantName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
  }
  /**
   * =================
   * FUNCTIONAL
   * =================
   */
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.contentContainer,
            this.props.shadow ? GlobalStyles.shadowForBox : null
          ]}
        >
          <Image
            source={require('../assets/icons/merchant/store.png')}
            style={{ height: 24, width: 24, marginRight: 8 }}
          />
          {this.props.merchant.selectedMerchant.name.length >= 60 ? (
            <Text style={[Fonts.type16, { textTransform: 'capitalize' }]}>
              {this.props.merchant.selectedMerchant.name.substring(0, 60)}
              ...
            </Text>
          ) : (
            <Text style={[Fonts.type16, { textTransform: 'capitalize' }]}>
              {this.props.merchant.selectedMerchant.name}
            </Text>
          )}
        </View>
        {this.props.lines ? (
          <View style={GlobalStyles.lines} />
        ) : (
          <View style={GlobalStyles.boxPadding} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(SelectedMerchantName);

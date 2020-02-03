import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import ComingSoon from '../../components/empty_state/ComingSoon';
import { StatusBarRed } from '../../components/StatusBarGlobal';

class HistoryDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER HEADER STATUS */
  renderHeaderStatus() {
    return (
      <View>
        <Text>header status</Text>
      </View>
    );
  }
  /** RENDER RINGKASAN PESANAN */
  renderRingkasanPesanan() {
    return (
      <View>
        <Text>ringkasan pesanan</Text>
      </View>
    );
  }
  /** RENDER PRODUCT LIST */
  renderProductList() {
    return (
      <View>
        <Text>product list</Text>
      </View>
    );
  }
  /** RENDER PRODUCT LIST */
  renderPaymentInformation() {
    return (
      <View>
        <Text>payment information</Text>
      </View>
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <ScrollView>
          {this.renderHeaderStatus()}
          {this.renderRingkasanPesanan()}
          {this.renderProductList()}
          {this.renderPaymentInformation()}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
      </View>
    );
  }
  /** BACKGROUND */
  renderBackground() {
    return <View style={styles.backgroundRed} />;
  }
  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderBackground()}
        {this.renderContent()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000
  },
  backgroundRed: {
    backgroundColor: masterColor.mainColor,
    height: 46
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetailView);

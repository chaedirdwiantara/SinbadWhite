import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import ComingSoon from '../../components/empty_state/ComingSoon';

class HistoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT FUNCTION === */
  componentDidMount() {
    this.checkNewOrderNotif();
  }

  /** WILL UNMOUNT */
  componentWillUnmount() {
    this.props.merchantGetLogAllActivityProcess(
      this.props.merchant.selectedMerchant.id
    );
  }
  /** CHECK NEW ORDER NOTIF */
  checkNewOrderNotif() {
    if (this.props.merchant.selectedMerchant !== null) {
      const data = this.props.permanent.newOrderSuccessPerMerchant;
      const selectedStoreId = this.props.merchant.selectedMerchant.storeId;
      const index = this.props.permanent.newOrderSuccessPerMerchant.indexOf(
        selectedStoreId
      );
      if (index > -1) {
        data.splice(index, 1);
        this.props.historyDeleteNewOrderNotifPerMerchant(data);
      }
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        <ComingSoon />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ merchant, permanent }) => {
  return { merchant, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HistoryView);

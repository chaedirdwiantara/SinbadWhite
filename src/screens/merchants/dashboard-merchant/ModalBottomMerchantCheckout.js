import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import masterColor from '../../../config/masterColor.json';
import { StatusBarRedOP50 } from '../../../components/StatusBarGlobal';
import Fonts from '../../../helpers/GlobalFont';
import * as ActionCreators from '../../../state/actions';
import ButtonSingle from '../../../components/button/ButtonSingle';
import GlobalStyle from '../../../helpers/GlobalStyle';
import ModalBottomWithClose from '../../../components/modal_bottom/ModalBottomSwipeCloseNotScroll';

const { height } = Dimensions.get('window');

class ModalBottomMerchantCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInTime: null
    };
  }
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    if (
      prevProps.merchant.dataGetLogPerActivity !==
      this.props.merchant.dataGetLogPerActivity
    ) {
      if (this.props.merchant.dataGetLogPerActivity !== null) {
        if (this.props.merchant.dataGetLogPerActivity.length > 0) {
          if (
            this.props.merchant.dataGetLogPerActivity[0].activity === 'check_in'
          ) {
            this.setState({
              checkInTime: this.props.merchant.dataGetLogPerActivity[0]
                .createdAt
            });
          }
        }
      }
    }
  }

  /** CHECK CHECK IN */
  checkCheckIn() {
    if (
      (!this.props.merchant.loadingGetLogPerActivity &&
        this.props.merchant.dataGetLogPerActivity !== null) ||
      this.state.checkInTime !== null
    ) {
      if (this.state.checkInTime !== null) {
        return moment(this.state.checkInTime).format('HH:mm:ss');
      }
      return 'Anda belum check-in';
    }
    return 'Checking...';
  }
  /** CHECK DISABLE BUTTON */
  checkDisableButton() {
    if (
      !this.props.merchant.loadingGetLogPerActivity &&
      this.props.merchant.dataGetLogPerActivity !== null
    ) {
      if (this.props.merchant.dataGetLogPerActivity.length > 0) {
        return false;
      }
      return true;
    }
    return true;
  }
  /** FIND DIFF KUNJUNGAN */
  findDiffVisit() {
    const a = moment();
    const b = this.state.checkInTime
      ? moment(this.state.checkInTime)
      : moment();
    return a.diff(b, 'minutes');
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** RENDER CONTENT LIST */
  renderContentList() {
    const store = this.props.merchant.selectedMerchant;
    return (
      <View>
        <View style={GlobalStyle.lines} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 11,
            paddingHorizontal: 16
          }}
        >
          <Text style={Fonts.type8}>
            {store.externalId
              ? store.externalId
              : '-'}{' '}
            - {store.name}
          </Text>
        </View>
        <View style={GlobalStyle.lines} />
        <View
          style={{
            paddingVertical: 22,
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <View>
              <Text style={Fonts.type23}>Kunjungan dimulai</Text>
              <Text style={[Fonts.type24, { marginTop: 5 }]}>
                {this.checkCheckIn()}
              </Text>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text style={Fonts.type23}>Kunjungan berakhir</Text>
              <Text style={[Fonts.type24, { marginTop: 5 }]}>
                {moment().format('HH:mm:ss')}
              </Text>
            </View>
          </View>
          <View>
            {this.state.checkInTime !== null ? (
              <View style={styles.cirlce}>
                <Text>
                  <Text style={Fonts.type66}>{this.findDiffVisit()}</Text>
                  <Text style={Fonts.type23}> Min</Text>
                </Text>
                <Text style={Fonts.type65}>Durasi</Text>
                <Text style={Fonts.type65}>Kunjungan</Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <ButtonSingle
          disabled={
            this.props.merchant.loadingGetLogPerActivity ||
            this.checkDisableButton() ||
            this.props.merchant.loadingPostActivity
          }
          title={'Keluar Toko'}
          loading={
            this.props.merchant.loadingGetLogPerActivity ||
            this.props.merchant.loadingPostActivity
          }
          borderRadius={4}
          onPress={this.props.onPress}
        />
      </View>
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>{this.renderContentList()}</View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View>
        <StatusBarRedOP50 />
        <ModalBottomWithClose
          open={this.props.open}
          title={'Keluar Toko'}
          close={this.props.close}
          content={this.renderContentBody()}
        />
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
    borderBottomWidth: 0,
    maxHeight: 0.5 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 2000
  },
  boxContentBody: {
    flex: 1
    // paddingVertical: 10
  },
  boxContentTitle: {
    marginTop: 18,
    marginBottom: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  },
  // Circle
  cirlce: {
    width: 85,
    height: 85,
    borderColor: masterColor.fontRed40,
    borderWidth: 2,
    borderRadius: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  durationWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomMerchantCheckout);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: tatas
* updatedDate: 06072020
* updatedFunction:
* -> Change key
* 
*/

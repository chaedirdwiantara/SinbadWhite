import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  MaterialIcon,
  connect
} from '../../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  ButtonSingle,
  LoadingPage,
  InputType3,
  ToastType1
} from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';

class MerchantNoOrderReason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReason: '',
      reason: '',
      showToast: false,
      notifToast: '',
      viewOnly: false
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.prevReason();
    this.props.merchantGetNoOrderReasonProcess();
  }
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    if (
      prevProps.merchant.dataPostActivityV2 !==
      this.props.merchant.dataPostActivityV2
    ) {
      if (this.props.merchant.dataPostActivityV2 !== null) {
        /** IF CHECK OUT SUCCESS */
        if (this.props.merchant.dataPostActivityV2.activity === 'check_out') {
          NavigationService.goBack(this.props.navigation.state.key);
          this.props.merchantGetLogAllActivityProcessV2(
            this.props.merchant.selectedMerchant.journeyBookStores.id
          );
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            showToast: true,
            notifToast: 'Keluar Toko Berhasil'
          });
          /** FOR GET LOG ALL ACTIVITY */
          this.props.merchantGetLogAllActivityProcessV2(
            this.props.merchant.selectedMerchant.journeyBookStores.id
          );
        }
      }
    }
  }

  /** INITIAL PREVIOUS REASON */
  prevReason = () => {
    try {
      let payload = this.props.navigation.state.params.noOrderReason;
      if (payload) {
        this.setState({
          viewOnly: true,
          selectedReason: payload.noOrderReasonId,
          reason: payload.noOrderReasonNote
        });
      }
    } catch {
      console.log('do noting');
    }
  };

  /** REASON SELECT */
  selectReason(id) {
    if (id === this.state.selectedReason) {
      this.setState({ selectedReason: '' });
    } else {
      this.setState({ selectedReason: id });
    }
  }
  /** CHECKOUT */
  checkOut() {
    Keyboard.dismiss();
    this.props.merchantPostActivityProcessV2({
      journeyBookStoreId: this.props.merchant.selectedMerchant.journeyBookStores
        .id,
      activityName: 'check_out',
      latitude: this.props.merchant.selectedMerchant.journeyBookStores
        .latitudeCheckIn,
      longitude: this.props.merchant.selectedMerchant.journeyBookStores
        .longitudeCheckIn,
      noOrderReasonId: this.state.selectedReason,
      noOrderReasonNote: this.state.reason
    });
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER CONTENT ITEM */
  renderContentItem(item, index) {
    let checked = false;
    if (this.state.selectedReason === item.id) checked = true;

    return (
      <TouchableOpacity
        key={index}
        disabled={this.state.viewOnly}
        onPress={() => {
          this.selectReason(item.id);
        }}
      >
        <View style={[
            styles.boxContentItem, 
            { borderColor: checked ? Color.fontRed10 : Color.fontWhite }
          ]}>
          <View style={{ flex: 1 }}>
            <Text style={checked ? Fonts.type8 : Fonts.type9}>{item.reason}</Text>
          </View>
          <View style={styles.boxIconRight}>
            <View style={[styles.circleEmptyCheck, { borderColor: checked ? Color.mainColor : Color.fontBlack40 }]}>
              {checked ? (<View style={styles.circleChecked}/>) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.contentContainer}> 
        {this.props.merchant.dataGetNoOrderReason.map((item, index) => {
            return this.renderContentItem(item, index);
          })
        }
      </View>
    )
  }
  /** RENDER CONTENT REASON */
  renderContentReason() {
    return (
      <View style={styles.contentReasonContainer}>
        <InputType3
          title={'Catatan'}
          editable={!this.state.viewOnly}
          value={this.state.reason}
          placeholder={'Silahkan isi catatan untuk alasan yang dipilih'}
          keyboardType={'default'}
          text={text => this.setState({ reason: text })}
          error={false}
          errorText={''}
          maxLength={140}
          backgroundColor={Color.backgroundWhite}
        />
        <View style={styles.maxCharacters}>
          <Text style={Fonts.type12}>{`${this.state.reason.length}/140 karakter`}</Text>
        </View>
      </View>
    );
  }
  /** RENDER DATA */
  renderData() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {this.renderContent()}
          {this.renderContentReason()}
        </ScrollView>
        {this.state.viewOnly ? null : this.renderButton()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.state.selectedReason === '' ||
          this.state.reason === '' ||
          this.props.merchant.loadingPostActivity
        }
        title={'Simpan Alasan'}
        loading={this.props.merchant.loadingPostActivity}
        borderRadius={4}
        onPress={() => this.checkOut()}
      />
    );
  }
  /**
   * ===================
   * TOAST
   * ====================
   */
  renderToast() {
    return this.state.showToast ? (
      <ToastType1 margin={30} content={this.state.notifToast} />
    ) : (
      <View />
    );
  }
  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {!this.props.merchant.loadingGetNoOrderReason &&
        this.props.merchant.dataGetNoOrderReason !== null ? (
          this.renderData()
        ) : (
          <LoadingPage />
        )}
        {/* modal */}
        {this.renderToast()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    backgroundColor: Color.fontBlack05, 
    paddingVertical: 16,
  },
  boxContentItem: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
    justifyContent: 'space-between'
  },
  boxIconRight: {
    position: 'absolute',
    right: 20
  },
  circleChecked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Color.mainColor,
  },
  circleEmptyCheck: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentReasonContainer: {
    marginTop: 20,
  },
  maxCharacters: {
    paddingHorizontal: 16, 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
  },
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantNoOrderReason);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Change key
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 * updatedBy: dyah
 * updatedDate: 25022021
 * updatedFunction:
 * -> Update the props of log activity.
 * updatedBy: dyah
 * updatedDate: 26022021
 * updatedFunction:
 * -> Update the props of post activity.
 * -> Update payload noOrderReasonNote.
 * updatedBy: dyah
 * updatedDate: 31052021
 * updatedFunction:
 * -> New UI for no order reason screen.
 */

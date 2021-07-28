import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  ButtonSingle,
  LoadingPage,
  ModalConfirmation,
  ModalBottomErrorRespons,
  Address
} from '../../../library/component';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';

class MerchantNoVisitReasonDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalError: false,
      modalConfirmation: false
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    const { journeyBookStores } = this.props.merchant.selectedMerchant;
    this.props.merchantGetNoVisitReasonProcess();
    if (!journeyBookStores.visitStorePhotos) {
      this.props.merchantGetDetailJourneyBookProcess(journeyBookStores.id);
    }
  }
  componentDidUpdate(prevProps) {
    /** error get list of reason not visit */
    if (
      prevProps.merchant.errorGetNoVisitReason !==
      this.props.merchant.errorGetNoVisitReason
    ) {
      if (this.props.merchant.errorGetNoVisitReason !== null) {
        this.setState({ openModalError: true });
      }
    }
    /** error get journey book detail */
    if (
      prevProps.merchant.errorGetJourneyBookDetail !==
      this.props.merchant.errorGetJourneyBookDetail
    ) {
      if (this.props.merchant.errorGetJourneyBookDetail !== null) {
        this.setState({ openModalError: true });
      }
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /**
   * ===================
   * Render Merchant
   * ====================
   */
  renderMerchant() {
    const merchant = this.props.merchant.selectedMerchant;
    return (
      <View style={styles.merchantContainer}>
        <View style={styles.merchantView}>
          <View>
            <Image
              source={require('../../../assets/images/menu/list_toko.png')}
              style={styles.imageCircle}
            />
          </View>
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={Fonts.type12}>{merchant.externalId}</Text>
            <View style={{ height: 4 }} />
            <Text style={Fonts.type23}>{merchant.name}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingRight: 12 }}>
          <View style={{ width: 40 }} />
          <View style={{ paddingLeft: 12, paddingRight: 16 }}>
            <Address
              substring
              font={Fonts.type56}
              address={merchant.address}
              urban={merchant.urbans}
            />
          </View>
        </View>
      </View>
    );
  }
  /**
   * ===================
   * Render Reason
   * ====================
   */
  renderReason() {
    const { journeyBookStores } = this.props.merchant.selectedMerchant;
    const index = this.props.merchant.dataGetNoVisitReason.findIndex(
      item => item.id === journeyBookStores.noVisitReasonId
    );
    return (
      <View style={styles.reasonContainer}>
        <Text style={Fonts.type23}>Alasan tidak masuk toko</Text>
        <View style={styles.reasonView}>
          <Text style={Fonts.type36}>
            {this.props.merchant.dataGetNoVisitReason[index]?.reason}
          </Text>
          <View style={{ height: 4 }} />
          <Text style={Fonts.type60}>
            {journeyBookStores.noVisitReasonNote}
          </Text>
        </View>
        <View style={{ height: 300, borderRadius: 8, paddingVertical: 16 }}>
          {journeyBookStores.visitStorePhotos ? (
            <Image
              style={{ height: '100%', borderRadius: 8 }}
              source={{
                uri: journeyBookStores.visitStorePhotos[0].photoStoreUrl
              }}
            />
          ) : null}
        </View>
      </View>
    );
  }
  /**
   * ===================
   * Render Button
   * ====================
   */
  renderButton() {
    return (
      <View style={styles.buttonBottom}>
        <ButtonSingle
          title={'Kunjungi Toko Lagi'}
          white
          borderRadius={5}
          onPress={() => this.setState({ modalConfirmation: true })}
        />
      </View>
    );
  }
  /**
   * ===================
   * Render Content
   * ====================
   */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        <View>
          {this.renderMerchant()}
          {this.props.merchant.dataGetNoVisitReason.length > 0 &&
            this.renderReason()}
        </View>
        {this.renderButton()}
      </View>
    );
  }
  /**
   * ===================
   * RENDER MODAL
   * ====================
   */
  /** Render Modal Confirmation */
  renderModalConfirmation() {
    return (
      <ModalConfirmation
        statusBarWhite
        title={'Mengunjungi Toko Kembali'}
        open={this.state.modalConfirmation}
        content={
          'Konfirmasi jika anda yakin ingin kembali mengunjungi toko ini'
        }
        type={'okeNotRed'}
        okText={'Tidak'}
        cancelText={'Kunjungi'}
        ok={() => this.setState({ modalConfirmation: false })}
        cancel={() =>
          this.setState({ modalConfirmation: false }, () =>
            NavigationService.navigate('MerchantCheckinView')
          )
        }
      />
    );
  }
  /** Render Modal Error Response */
  renderModalErrorResponse() {
    return this.state.openModalError ? (
      <ModalBottomErrorRespons
        statusBarType={'transparent'}
        open={this.state.openModalError}
        onPress={() => this.setState({ openModalError: false })}
      />
    ) : (
      <View />
    );
  }
  /** Main */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.props.merchant.dataGetNoVisitReason &&
        !this.props.merchant.loadingGetJourneyBookDetail ? (
          this.renderContent()
        ) : (
          <LoadingPage />
        )}
        {/* MODAL */}
        {this.renderModalConfirmation()}
        {this.renderModalErrorResponse()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  merchantContainer: {
    padding: 16,
    backgroundColor: Color.backgroundWhite
  },
  merchantView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageCircle: {
    width: 40,
    height: 40,
    borderRadius: 40
  },
  reasonContainer: {
    backgroundColor: Color.fontBlack05,
    padding: 16,
    height: '100%'
  },
  reasonView: {
    padding: 16,
    backgroundColor: Color.backgroundWhite,
    marginTop: 8,
    borderRadius: 8
  },
  buttonBottom: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: Color.backgroundWhite,
    paddingBottom: 8
  }
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
)(MerchantNoVisitReasonDetailView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 26072021
 * updatedBy: dyah
 * updatedDate: 27072021
 * updatedFunction:
 * -> update size of photo.
 * -> add validation when showing the detail.
 */

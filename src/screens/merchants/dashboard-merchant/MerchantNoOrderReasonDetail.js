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
  MaterialIcon,
  connect
} from '../../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  ButtonSingle,
  LoadingPage,
  ModalConfirmation,
  Address,
} from '../../../library/component';
import { Fonts, } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';

class MerchantNoOrderReasonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalConfirmation: false,
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
  */
  componentDidMount() {
    this.props.merchantGetNoOrderReasonProcess();
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
  renderMerchant(){
    const merchant = this.props.merchant.selectedMerchant
    return (
      <View style={styles.merchantContainer}>
        <View style={styles.merchantView}>
          <View>
            <Image  
              source={require('../../../assets/images/menu/list_toko.png')} 
              style={styles.imageCircle}/>
          </View>
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={Fonts.type12}>{merchant.externalId}</Text>
            <View style={{ height: 4, }} />
            <Text style={Fonts.type23}>{merchant.name}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingRight: 12 }}>
          <View style={{ width: 40, }} />
          <View style={{ paddingLeft: 12, paddingRight: 16, }}>
            <Address
                substring
                font={Fonts.type56}
                address={merchant.address}
                urban={merchant.urbans}
              />
          </View>
        </View>
      </View>
    )
  }
  /**
   * ===================
   * Render Reason
   * ====================
   */
  renderReason() {
    const { journeyBookStores } = this.props.merchant.selectedMerchant
    const index = this.props.merchant.dataGetNoOrderReason.findIndex(item => item.id === journeyBookStores.noOrderReasonId)
    return (
      <View style={styles.reasonContainer}>
        <Text style={Fonts.type23}>Alasan tidak ada Order</Text>
        <View style={styles.reasonView}>
          <Text style={Fonts.type36}>{this.props.merchant.dataGetNoOrderReason[index].reason}</Text>
          <View style={{ height: 4, }}/>
          <Text style={Fonts.type60}>{journeyBookStores.noOrderReasonNote}</Text>
        </View>
      </View>
    )
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
          title='Buat Order Lagi'
          white
          borderRadius={5}
          onPress={() => this.setState({ modalConfirmation: true })}
        />
      </View>
    )
  }
  /**
   * ===================
   * Render Modal
   * ====================
   */
   renderModalConfirmation() {
    return (
      <ModalConfirmation
        statusBarWhite
        title={'Buat Order Toko Kembali'}
        open={this.state.modalConfirmation}
        content={'Konfirmasi jika anda yakin ingin kembali membuat order untuk toko ini'}
        type={'okeNotRed'}
        okText={'Tidak'}
        cancelText={'Ya, Buat Order'}
        ok={() => this.setState({ modalConfirmation: false })}
        cancel={() => this.setState({ modalConfirmation: false }, () => NavigationService.navigate('PdpView'))}
      />
    )
  }
  renderNewContent() {
    return (
      <View style={styles.mainContainer}>
        <View>
          {this.renderMerchant()}
          {this.renderReason()}
        </View>
        {this.renderButton()}
      </View>
    )
  }
  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        { this.props.merchant.dataGetNoOrderReason ? 
            this.renderNewContent() : 
            <LoadingPage/>
        }
        {this.renderModalConfirmation()}
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
    backgroundColor: Color.backgroundWhite,
  },
  merchantView: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  imageCircle: {
    width: 40, 
    height: 40, 
    borderRadius: 40,
  },
  reasonContainer: {
    backgroundColor: Color.fontBlack05, 
    padding: 16, 
    height: '100%',
  },
  reasonView: {
    padding: 16, 
    backgroundColor: Color.backgroundWhite, 
    marginTop: 8, 
    borderRadius: 8,
  },
  buttonBottom: {
    bottom: 0, 
    position: 'absolute', 
    width: '100%', 
    backgroundColor: Color.backgroundWhite, 
    paddingBottom: 8,
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
)(MerchantNoOrderReasonDetail);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 02062021
 * updatedBy: 
 * updatedDate: 
 * updatedFunction:
 * ->  crete new screen for detail reason (no order).
 */

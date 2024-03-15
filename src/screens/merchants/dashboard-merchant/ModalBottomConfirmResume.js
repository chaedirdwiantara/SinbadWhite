import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  Dimensions
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  moment,
  Button
} from '../../../library/thirdPartyPackage';
import {
  StatusBarRedOP50,
  ModalBottomType1
} from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';

const { height } = Dimensions.get('window');

/**
 * ===================
 * PROPS
 * ===================
 * - onOk
 * - onCancel
 * 
 */

class ModalBottomConfirmResume extends Component {
  pauseDate = this.props.merchant.selectedMerchant.journeyBookStores.pauseDate
  /** FIND DIFF PAUSE DATE */
  findDiffVisit() {
    const a = moment();
    const b = moment(this.props.merchant.selectedMerchant.journeyBookStores.pauseDate);
    return a.diff(b, 'minutes');
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** RENDER CONTENT LIST */
  renderContentList() {
    return (
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 11,
            paddingHorizontal: 16
          }}
        >
          <Text style={[Fonts.type8, { textAlign: 'center', paddingHorizontal: 35 }]}>
            Penundaan kunjungan hanya bisa dilakukan 1 kali per hari untuk toko ini.
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
              <Text style={Fonts.type23}>Penundaan dimulai</Text>
              <Text style={[Fonts.type24, { marginTop: 5 }]}>
                {moment(this.props.merchant.selectedMerchant.journeyBookStores.pauseDate).format('HH:mm:ss')}
              </Text>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text style={Fonts.type23}>Penundaan berakhir</Text>
              <Text style={[Fonts.type24, { marginTop: 5 }]}>
                {moment().format('HH:mm:ss')}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.cirlce}>
              <Text>
                <Text style={Fonts.type66}>{this.findDiffVisit()}</Text>
                <Text style={Fonts.type23}> Min</Text>
              </Text>
              <Text style={Fonts.type65}>Durasi</Text>
              <Text style={Fonts.type65}>Penundaan</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1, }}>
            <Button
              title="Kembali"
              titleStyle={[Fonts.type93, { color: Color.mainColor }]}
              buttonStyle={{ width: '100%', paddingVertical: 16, backgroundColor: Color.backgroundWhite, borderColor: Color.mainColor, borderWidth: 1 }}
              onPress={this.props.onCancel}
            />
          </View>
          <View style={{ width: 16 }} />
          <View style={{ flex: 1, }}>
            <Button
              title="Lanjutkan"
              titleStyle={[Fonts.type93]}
              buttonStyle={{ width: '100%', paddingVertical: 16, backgroundColor: Color.mainColor, }}
              onPress={this.props.onOk}
            />
          </View>
        </View>
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
        <ModalBottomType1
          open={this.props.open}
          title={'Kunjungan di Toko Ini akan Dilanjutkan'}
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
    backgroundColor: Color.backgroundWhite,
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
    borderColor: Color.fontRed40,
    borderWidth: 2,
    borderRadius: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  durationWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 24, 
    marginBottom: 32 ,
    alignItems: 'center',
    alignContent: 'stretch'
  }
});

const mapStateToProps = ({ user, merchant, sfa }) => {
  return { user, merchant, sfa };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomConfirmResume);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: raka
 * createdDate: 20012022
 * updatedBy: raka
 * updatedDate: 26012022
 * updatedFunction:
 * -> handle pause date to be show on modal
 */

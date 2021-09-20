/**
 * THIS MODAL FOR CHECK IN (MerchanCheckinView)
 */
import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import { GlobalStyle, Fonts } from '../../helpers';
import { Color } from '../../config';

const { height } = Dimensions.get('window');

class ModalBottomType6 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ======================
   * FUNCTIONAL
   * ======================
   */
  /** CHECK STATUS AND COUNT */
  checkStatusAndCount() {
    let title = 'Perhatikan Posisi Anda dengan Toko';
    let desc = 'Perbarui lokasi anda jika belum sesuai dengan titik toko ';
    let backgroundColor = Color.fontBlue50;
    let icon = 'refresh';
    // SUCCESS (in radius)
    if (this.props.success) {
      title = 'Posisi Telah Sesuai';
      desc = 'Anda bisa lanjut mengunjungi toko';
      icon = 'beenhere';
    }
    // FAILED (not in radius)
    if (!this.props.success && this.props.count !== 0) {
      title = 'Posisi Anda Belum Sesuai dengan Toko';
      desc = 'Gunakan tombol refresh untuk memperbarui lokasi';
      backgroundColor = Color.fontYellow50;
    }
    return { title, desc, backgroundColor, icon };
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <View style={styles.titleContainer}>
        <View style={{ alignItems: 'center' }}>
          <View style={GlobalStyle.linesSwipeModal} />
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10
            }}
          >
            {this.props.noTitle ? (
              this.props.noTitle
            ) : (
              <Text style={Fonts.type8}>{this.props.title}</Text>
            )}
          </View>
          <View style={GlobalStyle.lines} />
        </View>
      </View>
    );
  }
  /** RENDER BODY */
  renderBody() {
    return (
      <View
        style={{
          flex: 1,
          height: this.props.height ? this.props.height : null
        }}
      >
        {this.props.body}
      </View>
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return <View style={styles.boxContentBody}>{this.renderBody()}</View>;
  }
  /** === RENDER STATUS BAR === */
  renderContent() {
    return (
      <View
        style={[
          styles.contentContainer,
          GlobalStyle.shadow,
          {
            backgroundColor: this.checkStatusAndCount().backgroundColor,
            maxHeight: this.props.maxHeight
              ? this.props.maxHeight
              : 0.45 * height
          }
        ]}
      >
        <View
          style={[
            styles.content,
            {
              backgroundColor: this.checkStatusAndCount().backgroundColor
            }
          ]}
        >
          <View>
            <Text style={Fonts.type63}>{this.checkStatusAndCount().title}</Text>
            <Text style={Fonts.type26}>{this.checkStatusAndCount().desc}</Text>
          </View>
          <TouchableOpacity
            onPress={this.props.onRefresh}
            disabled={this.props.success}
          >
            <MaterialIcon
              name={this.checkStatusAndCount().icon}
              color={Color.fontWhite}
              size={20}
            />
          </TouchableOpacity>
        </View>
        {this.renderContentTitle()}
        {this.renderContentBody()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return <View>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 2000
  },
  content: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 0,
    backgroundColor: Color.backgroundWhite
  },
  boxContentBody: {
    flex: 1
  }
});

export default ModalBottomType6;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 20092021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> add modal bottom type 6 (for checkin)
 *
 */

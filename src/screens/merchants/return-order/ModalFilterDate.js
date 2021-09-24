import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  width,
  height
} from '../../../library/reactPackage';
import { Modal, moment } from '../../../library/thirdPartyPackage';
import { StatusBarBlackOP40 } from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';

class ModalFilterDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayDate: '',
      yesterdayDate: '',
      lastWeekStartDate: '',
      lastWeekEndDate: '',
      lastMonthStartDate: '',
      lastMonthEndDate: '',
      customStartDate: '',
      customEndDate: ''
    };
  }

  componentDidMount() {
    this.getDate();
  }

  getDate() {
    const todayDate = moment(new Date());
    const yesterdayDate = moment().subtract(1, 'days');
    const lastWeekStartDate = moment()
      .subtract(1, 'weeks')
      .startOf('week');
    const lastWeekEndDate = moment()
      .subtract(1, 'weeks')
      .endOf('week');
    const lastMonthStartDate = moment()
      .subtract(1, 'months')
      .startOf('month');
    const lastMonthEndDate = moment()
      .subtract(1, 'months')
      .endOf('month');

    this.setState({
      todayDate,
      yesterdayDate,
      lastWeekStartDate,
      lastWeekEndDate,
      lastMonthStartDate,
      lastMonthEndDate
    });
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <View style={GlobalStyle.linesSwipeModal} />
        </View>
        <View style={styles.boxContentTitle}>
          <TouchableOpacity style={styles.boxClose} onPress={this.props.close}>
            {this.props.custom ? this.props.icon : null}
          </TouchableOpacity>
          <View>
            <Text style={Fonts.type7}>{this.props.title}</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginVertical: 16 }]} />
      </View>
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>
        {this.renderBody()}
        {this.renderButton()}
      </View>
    );
  }
  renderBody() {
    return (
      <View>
        {/* Today Date */}
        <View style={{ justifyContent: 'space-around', marginBottom: 16 }}>
          <Text>Hari ini</Text>
          <Text>{moment(this.state.todayDate).format('DD MMMM')}</Text>
        </View>
        {/* Yesterday Date */}
        <View style={{ justifyContent: 'space-around', marginBottom: 16 }}>
          <Text>Kemarin</Text>
          <Text>{moment(this.state.yesterdayDate).format('DD MMMM')}</Text>
        </View>
        {/* Last Week Date Range */}
        <View style={{ justifyContent: 'space-around', marginBottom: 16 }}>
          <Text>Minggu Lalu</Text>
          <Text>
            {moment(this.state.lastWeekStartDate).format('D')} -{' '}
            {moment(this.state.lastWeekEndDate).format('DD MMMM')}
          </Text>
        </View>
        {/* Last Week Date Range */}
        <View style={{ justifyContent: 'space-around', marginBottom: 16 }}>
          <Text>Bulan Lalu</Text>
          <Text>
            {moment(this.state.lastMonthStartDate).format('D')} -{' '}
            {moment(this.state.lastMonthEndDate).format('DD MMMM')}
          </Text>
        </View>
        {/* Custom Date Range */}
        <View style={{ justifyContent: 'space-around', marginBottom: 16 }}>
          <Text>Tanggal lainnya</Text>
        </View>
      </View>
    );
  }
  renderButton() {
    return (
      <View>
        <Text>Button</Text>
      </View>
    );
  }
  /** === RENDER STATUS BAR === */
  renderContent() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={this.props.hasBackdrop}
        coverScreen={true}
        swipeDirection={['down']}
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        onSwipeMove={this.props.close}
        deviceHeight={height}
        style={styles.mainContainer}
      >
        <View style={styles.contentContainer}>
          {this.renderContentTitle()}
          {this.renderContentBody()}
        </View>
      </Modal>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View>
        <StatusBarBlackOP40 />
        {this.renderContent()}
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
    maxHeight: 0.8 * height,
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1,
    marginHorizontal: 16
  },
  boxContentTitle: {
    marginTop: 18,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  }
});

export default ModalFilterDate;

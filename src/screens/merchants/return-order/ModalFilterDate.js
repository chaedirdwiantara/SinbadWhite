import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  height
} from '../../../library/reactPackage';
import {
  Modal,
  moment,
  MaterialCommunityIcons
} from '../../../library/thirdPartyPackage';
import { StatusBarBlackOP40, ButtonSingle } from '../../../library/component';
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
      customStartDate: this.props.startDate,
      customEndDate: this.props.endDate,
      selectedDate: this.props.selectedDate
    };
  }

  componentDidMount() {
    this.getDate();
  }

  toParentFunction(data) {
    this.props.parentFunction({ type: 'dateFilter', data });
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
      lastMonthEndDate,
      customStartDate: this.props.startDate,
      customEndDate: this.props.endDate
    });
  }

  submitFilter() {
    switch (this.state.selectedDate) {
      case 'today':
        this.toParentFunction({
          dateFilter: {
            dateGte: moment(this.state.todayDate).format('YYYY-MM-DD'),
            dateLte: moment(this.state.todayDate).format('YYYY-MM-DD')
          },
          selectedDate: this.state.selectedDate
        });
        break;
      case 'yesterday':
        this.toParentFunction({
          dateFilter: {
            dateGte: moment(this.state.yesterdayDate).format('YYYY-MM-DD'),
            dateLte: moment(this.state.yesterdayDate).format('YYYY-MM-DD')
          },
          selectedDate: this.state.selectedDate
        });
        break;
      case 'lastWeek':
        this.toParentFunction({
          dateFilter: {
            dateGte: moment(this.state.lastWeekStartDate).format('YYYY-MM-DD'),
            dateLte: moment(this.state.lastWeekEndDate).format('YYYY-MM-DD')
          },
          selectedDate: this.state.selectedDate
        });
        break;
      case 'lastMonth':
        this.toParentFunction({
          dateFilter: {
            dateGte: moment(this.state.lastMonthStartDate).format('YYYY-MM-DD'),
            dateLte: moment(this.state.lastMonthEndDate).format('YYYY-MM-DD')
          },
          selectedDate: this.state.selectedDate
        });
        break;
      case 'customDate':
        this.toParentFunction({
          dateFilter: {
            dateGte: moment(this.props.startDate).format('YYYY-MM-DD'),
            dateLte: moment(this.props.endDate).format('YYYY-MM-DD')
          },
          selectedDate: this.state.selectedDate
        });
        break;

      default:
        break;
    }
  }

  resetFilter() {
    this.toParentFunction({
      dateFilter: {
        dateGte: '',
        dateLte: ''
      },
      selectedDate: ''
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
      <View style={{ marginHorizontal: 16 }}>
        {/* Today Date */}
        <TouchableOpacity
          onPress={() => this.setState({ selectedDate: 'today' })}
        >
          <View
            style={{
              justifyContent: 'space-between',
              marginBottom: 16,
              flexDirection: 'row'
            }}
          >
            <View>
              <Text
                style={[
                  {
                    marginBottom: 4,
                    color:
                      this.state.selectedDate === 'today'
                        ? Color.fontRed50
                        : Color.fontBlack80
                  },
                  Fonts.fontH10Bold
                ]}
              >
                Hari ini
              </Text>
              <Text style={[Fonts.fontH12Medium, { color: Color.fontBlack60 }]}>
                {moment(this.state.todayDate).format('DD MMMM')}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                position: 'absolute',
                right: 16
              }}
            >
              {this.state.selectedDate === 'today' ? (
                this.renderSelectedActive()
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  color={Color.fontBlack40}
                  size={24}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        {/* Yesterday Date */}
        <TouchableOpacity
          onPress={() => this.setState({ selectedDate: 'yesterday' })}
        >
          <View
            style={{
              justifyContent: 'space-between',
              marginBottom: 16,
              flexDirection: 'row'
            }}
          >
            <View>
              <Text
                style={[
                  {
                    marginBottom: 4,
                    color:
                      this.state.selectedDate === 'yesterday'
                        ? Color.fontRed50
                        : Color.fontBlack80
                  },
                  Fonts.fontH10Bold
                ]}
              >
                Kemarin
              </Text>
              <Text style={[Fonts.fontH12Medium, { color: Color.fontBlack60 }]}>
                {moment(this.state.yesterdayDate).format('DD MMMM')}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                position: 'absolute',
                right: 16
              }}
            >
              {this.state.selectedDate === 'yesterday' ? (
                this.renderSelectedActive()
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  color={Color.fontBlack40}
                  size={24}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        {/* Last Week Date Range */}
        <TouchableOpacity
          onPress={() => this.setState({ selectedDate: 'lastWeek' })}
        >
          <View
            style={{
              justifyContent: 'space-between',
              marginBottom: 16,
              flexDirection: 'row'
            }}
          >
            <View>
              <Text
                style={[
                  {
                    marginBottom: 4,
                    color:
                      this.state.selectedDate === 'lastWeek'
                        ? Color.fontRed50
                        : Color.fontBlack80
                  },
                  Fonts.fontH10Bold
                ]}
              >
                Minggu Lalu
              </Text>
              <Text style={[Fonts.fontH12Medium, { color: Color.fontBlack60 }]}>
                {moment(this.state.lastWeekStartDate).format('D')} -{' '}
                {moment(this.state.lastWeekEndDate).format('DD MMMM')}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                position: 'absolute',
                right: 16
              }}
            >
              {this.state.selectedDate === 'lastWeek' ? (
                this.renderSelectedActive()
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  color={Color.fontBlack40}
                  size={24}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        {/* Last Week Date Range */}
        <TouchableOpacity
          onPress={() => this.setState({ selectedDate: 'lastMonth' })}
        >
          <View
            style={{
              justifyContent: 'space-between',
              marginBottom: 16,
              flexDirection: 'row'
            }}
          >
            <View>
              <Text
                style={[
                  {
                    marginBottom: 4,
                    color:
                      this.state.selectedDate === 'lastMonth'
                        ? Color.fontRed50
                        : Color.fontBlack80
                  },
                  Fonts.fontH10Bold
                ]}
              >
                Bulan Lalu
              </Text>
              <Text style={[Fonts.fontH12Medium, { color: Color.fontBlack60 }]}>
                {moment(this.state.lastMonthStartDate).format('D')} -{' '}
                {moment(this.state.lastMonthEndDate).format('DD MMMM')}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                position: 'absolute',
                right: 16
              }}
            >
              {this.state.selectedDate === 'lastMonth' ? (
                this.renderSelectedActive()
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  color={Color.fontBlack40}
                  size={24}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        {/* Custom Date Range */}
        <View
          style={{
            justifyContent: 'center',
            marginBottom: 16,
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1
            }}
          >
            <View>
              <Text
                style={[
                  {
                    color:
                      this.state.selectedDate === 'customDate'
                        ? Color.fontRed50
                        : Color.fontBlack80
                  },
                  Fonts.fontH10Bold
                ]}
              >
                Tanggal lainnya
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                right: 16
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ selectedDate: 'customDate' })}
              >
                {this.state.selectedDate === 'customDate' ? (
                  this.renderSelectedActive()
                ) : (
                  <MaterialCommunityIcons
                    name="checkbox-blank-circle-outline"
                    color={Color.fontBlack40}
                    size={24}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 32 }}>
          <View style={{ flex: 1, marginRight: 16 }}>
            <View style={{ marginBottom: 8 }}>
              <Text
                style={[
                  Fonts.fontH12Medium,
                  {
                    color:
                      this.state.selectedDate === 'customDate'
                        ? Color.fontBlack80
                        : Color.fontBlack60
                  }
                ]}
              >
                Mulai Dari
              </Text>
            </View>
            <TouchableOpacity
              disabled={this.state.selectedDate !== 'customDate'}
              onPress={() => {
                this.props.parentFunction({
                  type: 'customDate',
                  data: {
                    typeDate: 'startDate'
                  }
                });
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 4,
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderColor:
                    this.state.selectedDate === 'customDate'
                      ? Color.fontBlack80
                      : Color.fontBlack60
                }}
              >
                <Text
                  style={[
                    Fonts.fontH12Medium,
                    {
                      color:
                        this.state.selectedDate === 'customDate'
                          ? Color.fontBlack80
                          : Color.fontBlack60
                    }
                  ]}
                >
                  {this.props.startDate === ''
                    ? 'DD / MM / YYYY'
                    : moment(this.props.startDate).format('DD MMMM YYYY')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 8 }}>
              <Text
                style={[
                  Fonts.fontH12Medium,
                  {
                    color:
                      this.state.selectedDate === 'customDate'
                        ? Color.fontBlack80
                        : Color.fontBlack60
                  }
                ]}
              >
                Sampai Dengan
              </Text>
            </View>
            <TouchableOpacity
              disabled={this.state.selectedDate !== 'customDate'}
              onPress={() => {
                this.props.parentFunction({
                  type: 'customDate',
                  data: {
                    typeDate: 'endDate'
                  }
                });
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 4,
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                  borderColor:
                    this.state.selectedDate === 'customDate'
                      ? Color.fontBlack80
                      : Color.fontBlack60
                }}
              >
                <Text
                  style={[
                    Fonts.fontH12Medium,
                    {
                      color:
                        this.state.selectedDate === 'customDate'
                          ? Color.fontBlack80
                          : Color.fontBlack60
                    }
                  ]}
                >
                  {this.props.endDate === ''
                    ? 'DD / MM / YYYY'
                    : moment(this.props.endDate).format('DD MMMM YYYY')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderSelectedActive() {
    return (
      <View
        style={{
          height: 20,
          width: 20,
          backgroundColor: Color.fontRed10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            height: 12,
            width: 12,
            backgroundColor: Color.fontRed50,
            borderRadius: 6
          }}
        />
      </View>
    );
  }
  checkButton() {
    if (this.state.selectedDate === 'customDate') {
      if (this.props.startDate === '' || this.props.endDate === '') {
        return true;
      } else {
        if (
          moment(this.props.startDate).valueOf('milliseconds') >
          moment(this.props.endDate).valueOf('milliseconds')
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else if (this.state.selectedDate === '') {
      return true;
    } else {
      return false;
    }
  }
  renderButton() {
    return (
      <View style={[GlobalStyle.shadowForBox10, { flex: 1 }]}>
        <View>
          <ButtonSingle
            title={'Terapkan Filter'}
            borderRadius={8}
            onPress={() => this.submitFilter()}
            disabled={this.checkButton()}
          />
        </View>
        <View style={{ top: -16 }}>
          <ButtonSingle
            title={'Reset Filter'}
            borderRadius={8}
            white
            onPress={() => this.resetFilter()}
          />
        </View>
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
        // onSwipeMove={this.props.close}
        deviceHeight={height}
        style={styles.mainContainer}
        onBackButtonPress={this.props.close}
        onBackdropPress={this.props.close}
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
    flex: 1
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

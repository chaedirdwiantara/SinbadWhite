import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from '../../../library/reactPackage';
import {
  connect,
  bindActionCreators,
  MaterialIcon,
  moment
} from '../../../library/thirdPartyPackage';
import {
  DatePickerSpinner,
  ModalBottomType4,
  StatusBarBlack
} from '../../../library/component';
import * as ActionCreators from '../../../state/actions';
import { Color } from '../../../config';
import { Fonts, GlobalStyle } from '../../../helpers';
import ReturnOrderDataListView from './ReturnOrderDataListView';
import ModalReturnStatus from './ModalReturnStatus';
import ModalFilterDate from './ModalFilterDate';

class HistoryReturnOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReturnStatus: null,
      status: 'all',
      selectedDate: '',
      dateFilter: {
        startReturnDate: '',
        endReturnDate: ''
      },
      startDate: '',
      endDate: '',
      typeDate: '',
      openModalReturnStatus: false,
      openModalFilterDate: false,
      openDateSpinner: false
    };
  }

  /**
   *
   * FUNCTIONAL SECTION
   */

  parentFunction(data) {
    switch (data.type) {
      case 'SelectStatus':
        this.setState({
          selectedReturnStatus: data.data,
          status: data.data.status,
          openModalReturnStatus: false
        });

        break;
      case 'dateFilter':
        this.setState({
          openModalFilterDate: false,
          dateFilter: data.data.dateFilter,
          selectedDate: data.data.selectedDate,
          startDate: data.data.dateFilter.startReturnDate,
          endDate: data.data.dateFilter.endReturnDate
        });
        break;
      case 'customDate':
        this.setState({
          openDateSpinner: true,
          typeDate: data.data.typeDate
        });
        break;
      case 'datePicker':
        this.setState({ openDateSpinner: false });
        if (this.state.typeDate === 'startDate') {
          this.setState({ startDate: data.data, endDate: '' });
        } else {
          this.setState({ endDate: data.data });
        }
        break;

      default:
        break;
    }
  }

  /**
   *
   * VIEW SECTION
   */

  renderTopBar() {
    return (
      <View
        style={[
          GlobalStyle.shadowForBox10,
          { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12 }
        ]}
      >
        {this.renderFilterStatue()}
        {this.renderFilterDate()}
      </View>
    );
  }

  renderFilterStatue() {
    return (
      <View style={[styles.mainContainer]}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderColor: Color.fontBlack40,
            borderWidth: 1,
            borderRadius: 4,
            marginRight: 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor:
              this.state.selectedReturnStatus === null
                ? Color.fontBlack05
                : Color.fontBlack80
          }}
          onPress={() => this.setState({ openModalReturnStatus: true })}
        >
          <Text
            style={[
              Fonts.fontC2Medium,
              {
                color:
                  this.state.selectedReturnStatus === null
                    ? Color.fontBlack40
                    : Color.fontWhite
              }
            ]}
          >
            {this.state.selectedReturnStatus === null
              ? 'Cari Semua Status'
              : this.state.selectedReturnStatus.status === 'all'
              ? 'Semua Status'
              : `Status ${this.state.selectedReturnStatus.title}`}
          </Text>
          <MaterialIcon
            name="keyboard-arrow-down"
            size={18}
            color={
              this.state.selectedReturnStatus === null
                ? Color.fontBlack40
                : Color.fontWhite
            }
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderFilterDate() {
    return (
      <View style={[styles.mainContainer]}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderColor: Color.fontBlack40,
            borderWidth: 1,
            borderRadius: 4,
            marginLeft: 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor:
              this.state.selectedDate === ''
                ? Color.fontBlack05
                : Color.fontBlack80
          }}
          onPress={() => this.setState({ openModalFilterDate: true })}
        >
          <Text
            style={[
              Fonts.fontC2Medium,
              {
                color:
                  this.state.selectedDate === ''
                    ? Color.fontBlack40
                    : Color.fontWhite
              }
            ]}
          >
            {this.state.selectedDate === '' ||
            (this.state.startDate === '' && this.state.endDate === '')
              ? 'Cari Semua Tanggal'
              : `${moment(this.state.startDate).format('DD MMM YY')} - ${moment(
                  this.state.endDate
                ).format('DD MMM YY')}`}
          </Text>
          <MaterialIcon
            name="keyboard-arrow-down"
            size={18}
            color={
              this.state.selectedDate === ''
                ? Color.fontBlack40
                : Color.fontWhite
            }
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderData() {
    return (
      <View style={styles.mainContainer}>
        <ReturnOrderDataListView
          selectedStatus={this.state.selectedReturnStatus}
          status={this.state.status === null ? 'all' : this.state.status}
          dateFilter={this.state.dateFilter}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }

  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.renderTopBar()}
        {this.renderData()}
      </View>
    );
  }

  modalReturnStatus() {
    return this.state.openModalReturnStatus &&
      this.props.history.dataGetReturnStatus.length > 0 ? (
      <ModalReturnStatus
        title={'Status Retur'}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        returnStatus={this.props.history.dataGetReturnStatus}
        selectedStatus={this.state.selectedReturnStatus}
        open={this.state.openModalReturnStatus}
        close={() => this.setState({ openModalReturnStatus: false })}
      />
    ) : (
      <View />
    );
  }

  modalFilterDate() {
    return this.state.openModalFilterDate ? (
      <ModalFilterDate
        title={'Tanggal Retur'}
        open={this.state.openModalFilterDate}
        close={() => this.setState({ openModalFilterDate: false })}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        selectedDate={this.state.selectedDate}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
      />
    ) : (
      <View />
    );
  }

  renderModalDateSpinner() {
    return this.state.openDateSpinner ? (
      <ModalBottomType4
        open={this.state.openDateSpinner}
        title={
          this.state.typeDate === 'startDate'
            ? 'Tanggal Mulai Dari'
            : 'Tanggal Sampai Dengan'
        }
        typeClose={'cancel'}
        close={() => this.setState({ openDateSpinner: false })}
        content={
          <View>
            <StatusBarBlack />
            <DatePickerSpinner
              onRef={ref => (this.parentFunction = ref)}
              parentFunction={this.parentFunction.bind(this)}
            />
          </View>
        }
      />
    ) : (
      <View />
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderContent()}
        {/* MODAL */}
        {this.modalReturnStatus()}
        {this.modalFilterDate()}
        {this.renderModalDateSpinner()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ history }) => {
  return { history };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryReturnOrderView);

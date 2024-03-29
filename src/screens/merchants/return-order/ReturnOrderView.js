import {
  React,
  Component,
  View,
  StyleSheet
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  ButtonFloatType2,
  DatePickerSpinner,
  ModalBottomType4,
  StatusBarBlack
} from '../../../library/component';
import masterColor from '../../../config/masterColor.json';
import * as ActionCreators from '../../../state/actions';
import ReturnOrderListView from './ReturnOrderListView';
import { GlobalMethod } from '../../../services/methods';
import { Color } from '../../../config';
import ModalFilterDate from './ModalFilterDate';
import ReactiveSearchBar from './ReactiveSearchBar';

class ReturnOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFilter: {
        dateGte: '',
        dateLte: ''
      },
      openModalDateFilter: false,
      emptyDataType: 'default',
      selectedDate: '',
      openDateSpinner: false,
      typeDate: '',
      startDate: '',
      endDate: '',
      searchKeyword: ''
    };
  }

  componentDidMount() {
    this.initiateFetchProcess();
  }

  parentFunction(data) {
    switch (data.type) {
      case 'dateFilter':
        this.setState(
          {
            openModalDateFilter: false,
            dateFilter: data.data.dateFilter,
            emptyDataType: 'default',
            selectedDate: data.data.selectedDate,
            startDate: data.data.dateFilter.dateGte,
            endDate: data.data.dateFilter.dateLte
          },
          () => {
            this.props.historyGetReset();
            this.getHistory(true, 0, this.state.searchKeyword);
          }
        );
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

  getHistory(loading, page, searchKeyword) {
    this.props.historyGetProcess({
      loading,
      page,
      storeId: parseInt(GlobalMethod.merchantStoreId(), 10),
      userId: '',
      statusOrder: 'done',
      statusPayment: '',
      dateGte: this.state.dateFilter.dateGte,
      dateLte: this.state.dateFilter.dateLte,
      search: '',
      searchSkuName: searchKeyword ? searchKeyword : '',
      returnWindow: true
    });
  }

  initiateFetchProcess() {
    this.props.historyGetReset();
    this.getHistory(true, 0);
  }

  handleRefreshFetch = () => {
    this.props.historyGetRefresh();
    this.getHistory(true, 0);
  };

  handleLoadMoreFetch = () => {
    if (this.props.history.dataGetHistory) {
      if (
        this.props.history.pageGetReturnParcels + 10 <
        this.props.history.totalDataGetHistory
      ) {
        const page = this.props.history.pageGetReturnParcels + 10;
        this.props.historyGetLoadMore(page);
        this.getHistory(false, page);
      }
    }
  };

  checkButtonTitle() {
    if (
      this.state.dateFilter.dateGte === '' &&
      this.state.dateFilter.dateLte === ''
    ) {
      return 'Filter Tanggal';
    } else {
      return `${moment(this.state.dateFilter.dateGte).format(
        'DD MMM'
      )} - ${moment(this.state.dateFilter.dateLte).format('DD MMM YYYY')}`;
    }
  }

  renderDateFilterButton() {
    return (
      <View style={styles.containerFloatButton}>
        <ButtonFloatType2
          title={this.checkButtonTitle()}
          push={() => this.setState({ openModalDateFilter: true })}
          icon={
            <MaterialIcon
              color={Color.backgroundWhite}
              name={'filter-list'}
              size={24}
            />
          }
        />
      </View>
    );
  }

  renderSearchBar() {
    return (
      <View style={{ marginVertical: 8 }}>
        <ReactiveSearchBar
          placeholder="Cari Nama SKU"
          fetchFn={searchKeyword => {
            this.props.historyGetReset();
            this.getHistory(true, 0, searchKeyword);
            this.setState({ emptyDataType: 'search', searchKeyword });
          }}
        />
      </View>
    );
  }

  renderData() {
    return (
      <View style={styles.mainContainer}>
        <ReturnOrderListView
          emptyData={this.state.emptyDataType}
          onRefresh={this.handleRefreshFetch}
          onLoadMore={this.handleLoadMoreFetch}
        />
      </View>
    );
  }

  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.renderSearchBar()}
        {this.renderData()}
      </View>
    );
  }

  renderModalDateFilter() {
    return this.state.openModalDateFilter ? (
      <ModalFilterDate
        open={this.state.openModalDateFilter}
        close={() => this.setState({ openModalDateFilter: false })}
        title={'Tanggal Pesanan'}
        custom={true}
        icon={
          <MaterialIcon name={'close'} size={24} color={Color.fontBlack100} />
        }
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
        <StatusBarWhite />
        {this.renderContent()}
        {this.renderDateFilterButton()}
        {/* RENDER MODAL */}
        {this.renderModalDateFilter()}
        {this.renderModalDateSpinner()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  containerFloatButton: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  }
});

const mapStateToProps = ({ history, user, merchant }) => {
  return { history, user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReturnOrderView);

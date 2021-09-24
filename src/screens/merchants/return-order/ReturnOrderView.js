import {
  React,
  Component,
  View,
  Text,
  StyleSheet
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  SearchBarType5,
  ButtonFloatType2
} from '../../../library/component';
import masterColor from '../../../config/masterColor.json';
import * as ActionCreators from '../../../state/actions';
import ReturnOrderListView from './ReturnOrderListView';
import { GlobalMethod } from '../../../services/methods';
import { Color } from '../../../config';

class ReturnOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      dateFilter: {
        dateGte: '',
        dateLte: ''
      }
    };
  }

  componentDidMount() {
    /** Call Return Order */
  }

  parentFunction(data) {
    console.log(data);
    switch (data.type) {
      case 'search':
        this.setState({ searchText: data.data });
        break;

      default:
        break;
    }
  }

  renderDateFilterButton() {
    return (
      <View style={styles.containerFloatButton}>
        <ButtonFloatType2
          title={'Filter Tanggal'}
          push={() => console.log('Filter Tanggal')}
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
        <SearchBarType5
          placeholder={'Nama produk / ID faktur'}
          searchText={this.state.searchText}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }

  renderData() {
    return (
      <View style={styles.mainContainer}>
        <ReturnOrderListView
          storeId={GlobalMethod.merchantStoreId()}
          search={this.state.searchText}
          dateFilter={this.state.dateFilter}
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderContent()}
        {this.renderDateFilterButton()}
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

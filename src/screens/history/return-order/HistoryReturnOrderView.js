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
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import { StatusBarWhite } from '../../../library/component';
import * as ActionCreators from '../../../state/actions';
import { Color } from '../../../config';
import { Fonts, GlobalStyle } from '../../../helpers';
import ReturnOrderDataListView from './ReturnOrderDataListView';

class HistoryReturnOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnStatus: 'all',
      dateFilter: {
        dateGte: '',
        dateLte: ''
      }
    };
  }

  /**
   *
   * FUNCTIONAL SECTION
   */

  parentFunction(data) {
    console.log(data);
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
            backgroundColor: Color.fontBlack05
          }}
        >
          <Text style={[Fonts.fontC2Medium, { color: Color.fontBlack40 }]}>
            Cari Semua Status
          </Text>
          <MaterialIcon
            name="keyboard-arrow-down"
            size={18}
            color={Color.fontBlack40}
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
            backgroundColor: Color.fontBlack05
          }}
        >
          <Text style={[Fonts.fontC2Medium, { color: Color.fontBlack40 }]}>
            Cari Semua Tanggal
          </Text>
          <MaterialIcon
            name="keyboard-arrow-down"
            size={18}
            color={Color.fontBlack40}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderData() {
    return (
      <View style={styles.mainContainer}>
        <ReturnOrderDataListView
          status={this.state.returnStatus}
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

  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
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

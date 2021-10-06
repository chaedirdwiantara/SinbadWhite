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
import ModalReturnStatus from './ModalReturnStatus';

class HistoryReturnOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReturnStatus: null,
      dateFilter: {
        dateGte: '',
        dateLte: ''
      },
      openModalReturnStatus: false,
      mockReturnStatus: [
        {
          id: 0,
          status: 'all',
          title: 'Semua'
        },
        {
          id: 1,
          status: 'pending',
          title: 'Menunggu'
        },
        {
          id: 2,
          status: 'approved',
          title: 'Disetujui'
        },
        {
          id: 3,
          status: 'approved_returned',
          title: 'Dikembalikan'
        },
        {
          id: 4,
          status: 'closed',
          title: 'Selesai'
        },
        {
          id: 5,
          status: 'rejected',
          title: 'Ditolak'
        }
      ]
    };
  }

  /**
   *
   * FUNCTIONAL SECTION
   */

  parentFunction(data) {
    console.log(data);
    switch (data.type) {
      case 'SelectStatus':
        this.setState({
          selectedReturnStatus: data.data,
          openModalReturnStatus: false
        });

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
          selectedStatus={this.state.selectedReturnStatus}
          status={this.state.mockReturnStatus}
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
    return this.state.openModalReturnStatus ? (
      <ModalReturnStatus
        title={'Status Retur'}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        returnStatus={this.state.mockReturnStatus}
        selectedStatus={this.state.selectedReturnStatus}
        open={this.state.openModalReturnStatus}
        close={() => this.setState({ openModalReturnStatus: false })}
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

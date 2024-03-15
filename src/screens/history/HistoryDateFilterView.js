import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  bindActionCreators,
  MaterialIcon,
  connect
} from '../../library/thirdPartyPackage'
import {
  StatusBarBlackOP40,
  ButtonSingle
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';

class HistoryDateFilterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  parentFunction(data) {
    this.props.parentFunction(data);
  }

  clearFilter() {
    this.setState({
      startDate: '',
      endDate: ''
    });
    this.props.parentFunction({
      type: 'selectDate',
      data: {
        type: 'clearDate',
        startDate: '',
        endDate: ''
      }
    });
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER TANGGAL AWAL */
  renderStartDate() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.parentFunction({ type: 'dateType', data: 'startDate' })
        }
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <View>
            <Text style={[Fonts.type42, { marginBottom: 5 }]}>
              Tanggal Awal{' '}
            </Text>
            <Text style={Fonts.type23}>
              {this.state.startDate !== '' ? this.state.startDate : '(Semua)'}
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <MaterialIcon
              name="chevron-right"
              color={masterColor.fontBlack40}
              size={24}
            />
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
      </TouchableOpacity>
    );
  }
  /** RENDER TANGGAL AKHIR */
  renderEndDate() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.parentFunction({ type: 'dateType', data: 'endDate' })
        }
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <View>
            <Text style={[Fonts.type42, { marginBottom: 5 }]}>
              Tanggal Akhir{' '}
            </Text>
            <Text style={Fonts.type23}>
              {this.state.endDate !== '' ? this.state.endDate : '(Semua)'}
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <MaterialIcon
              name="chevron-right"
              color={masterColor.fontBlack40}
              size={24}
            />
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
      </TouchableOpacity>
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View>
        <View style={styles.boxSubTitle}>
          <Text style={Fonts.type61}>
            Silahkan input rentang tanggal ketika order dibuat
          </Text>
          <TouchableOpacity onPress={() => this.clearFilter()}>
            <Text style={Fonts.type62}>Hapus</Text>
          </TouchableOpacity>
        </View>
        {this.renderStartDate()}
        {this.renderEndDate()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        accessible={true}
        accessibilityLabel={'btnDateFilterTerapkan'}
        disabled={this.state.startDate === '' || this.state.endDate === ''}
        title={'Terapkan'}
        borderRadius={4}
        onPress={() =>
          this.parentFunction({
            type: 'selectDate',
            data: {
              type: 'selectedDate',
              startDate: this.state.startDate,
              endDate: this.state.endDate
            }
          })
        }
      />
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarBlackOP40 />
        {this.renderContent()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  boxSubTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 10
  }
});

const mapStateToProps = ({ merchant, user }) => {
  return { merchant, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDateFilterView);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 06072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/


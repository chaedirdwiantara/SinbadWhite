import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import { MaterialIcon, connect } from '../../library/thirdPartyPackage';
import { StatusBarBlackOP40, ButtonSingle } from '../../library/component';
import { GlobalStyle, Fonts } from '../../helpers';
import masterColor from '../../config/masterColor.json';

class HistoryFilterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: this.props.portfolio,
      dateGte: this.props.dateGte,
      dateLte: this.props.dateLte,
      order: this.props.order
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
      portfolio: [],
      dateGte: '',
      dateLte: ''
    });
    this.props.parentFunction({
      type: 'doFilter',
      data: {
        portfolio: [],
        startDate: '',
        endDate: '',
        dateFilter: {
          dateGte: '',
          dateLte: ''
        },
        order: {
          userId: '',
          name: ''
        }
      }
    });
  }

  modifyPorfolio() {
    let portfolio = '';
    this.state.portfolio.map((item, index) => {
      const name = this.props.merchant.dataGetPortfolioV2.find(
        itemPortfolio => itemPortfolio.id === item
      ).name;
      portfolio =
        portfolio +
        name +
        (index + 1 === this.state.portfolio.length ? '' : ', ');
    });
    return portfolio;
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER ORDER FILTER */
  renderOrder() {
    return (
      <TouchableOpacity onPress={() => this.parentFunction({ type: 'order' })}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <View>
            <Text style={[Fonts.type42, { marginBottom: 5 }]}>Dibuat Oleh</Text>
            <Text style={Fonts.type23}>
              {this.state.order.name !== '' ? this.state.order.name : 'Semua'}
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
  /** RENDER CONTENT PORTFOLIO */
  renderPortfolio() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={'btnFilterPortfolio'}
        onPress={() => this.parentFunction({ type: 'portfolio' })}
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
            <Text style={[Fonts.type42, { marginBottom: 5 }]}>Portfolio</Text>
            {this.state.portfolio.length > 0 ? (
              <Text style={Fonts.type23}>
                {this.modifyPorfolio().length >= 55
                  ? this.modifyPorfolio().substring(0, 55) + '...'
                  : this.modifyPorfolio()}
              </Text>
            ) : (
              <Text style={Fonts.type23}>Semua</Text>
            )}
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
  /** RENDER CONTENT PORTFOLIO */
  renderDate() {
    return (
      <TouchableOpacity onPress={() => this.parentFunction({ type: 'date' })}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <View>
            <Text
              accessible={true}
              accessibilityLabel={'txtModalFilter'}
              style={[Fonts.type42, { marginBottom: 5 }]}
            >
              Tanggal Order{' '}
            </Text>
            <Text style={Fonts.type23}>
              {this.state.dateGte !== '' && this.state.dateLte !== ''
                ? this.state.dateGte + ' - ' + this.state.dateLte
                : '(Semua)'}
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
          <Text style={Fonts.type61}>Pilih filter sesuai preferensi Anda</Text>
          <TouchableOpacity onPress={() => this.clearFilter()}>
            <Text style={Fonts.type62}>Hapus</Text>
          </TouchableOpacity>
        </View>
        {/* {this.renderPortfolio()} */}
        {this.renderOrder()}
        {this.renderDate()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        accessible={true}
        accessibilityLabel={'btnFilterTerapkan'}
        disabled={
          // this.state.portfolio.length === 0 &&
          this.state.order.name === '' &&
          (this.state.dateGte === '' || this.state.dateLte === '')
        }
        title={'Terapkan'}
        borderRadius={4}
        onPress={() =>
          this.parentFunction({
            type: 'doFilter',
            data: {
              portfolio: this.state.portfolio,
              startDate: this.state.dateGte,
              endDate: this.state.dateLte,
              dateFilter: {
                dateGte: this.state.dateGte,
                dateLte: this.state.dateLte
              },
              order: this.state.order
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
    paddingVertical: 5
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(HistoryFilterView);

/**
 * ============================
 * NOTES
 *  ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Refactoring Module Import
 * updatedBy: Dyah
 * updatedDate: 08042021
 * updatedFunction:
 * -> Change dataGetPortfolio to dataGetPortfolioV2.
 *
 **/

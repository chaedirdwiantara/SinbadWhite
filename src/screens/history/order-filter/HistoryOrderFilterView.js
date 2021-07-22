import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  MaterialIcon,
  connect
} from '../../../library/thirdPartyPackage';
import {
  StatusBarBlackOP40,
  ButtonSingle,
  SkeletonType6
} from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
import masterColor from '../../../config/masterColor.json';

class HistoryOrderFilterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderFilter: [
        {
          userId: '',
          name: 'Semua'
        }
      ],
      portfolio: this.props.portfolio,
      orderBySelected: null,
      selectedUserId: this.props.order
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.getSalesName();
  }

  getSalesName() {
    let orderFilter = this.state.orderFilter;
    const salesName = {
      userId: this.props.user.id,
      name: this.props.user.fullName
    };
    orderFilter.push(salesName);
    this.setState({ orderFilter, order: orderFilter });
  }

  parentFunction() {
    this.props.parentFunction({
      type: 'orderFilter',
      data: this.state.orderBySelected
    });
  }

  addOrderFilter(item) {
    this.setState({ selectedUserId: item.userId, orderBySelected: item });
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** SKELETON */
  renderSkeleton() {
    return <SkeletonType6 />;
  }
  /** RENDER CONTENT PORTFOLIO */
  renderOrder() {
    return this.state.orderFilter.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => this.addOrderFilter(item)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 16
              }}
            >
              <View>
                <Text style={Fonts.type42}>{item.name}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 16
                }}
              >
                <MaterialIcon
                  name="check-circle"
                  color={
                    this.state.selectedUserId === item.userId
                      ? masterColor.mainColor
                      : masterColor.fontBlack40
                  }
                  size={24}
                />
              </View>
            </View>
            <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
          </TouchableOpacity>
        </View>
      );
    });
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View>
        <View style={styles.boxSubTitle}>
          <Text style={Fonts.type61}>Dibuat Oleh</Text>
        </View>
        {!this.props.merchant.loadingGetPortfolio &&
        this.props.merchant.dataGetPortfolioV2 !== null
          ? this.renderOrder()
          : this.renderSkeleton()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={false}
        title={'Terapkan'}
        borderRadius={4}
        onPress={() => this.parentFunction()}
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

const mapStateToProps = ({ merchant, user }) => {
  return { merchant, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryOrderFilterView);

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
 * updatedBy: Dyah
 * updatedDate: 08042021
 * updatedFunction:
 * -> Change dataGetPortfolio to dataGetPortfolioV2.
 * -> Change portfolioGetProcess to portfolioGetProcessV2.
 */

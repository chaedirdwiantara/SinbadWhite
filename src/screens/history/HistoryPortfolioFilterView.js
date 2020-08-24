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
  ButtonSingle,
  SkeletonType6
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';

class HistoryPortfolioFilterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: this.props.portfolio
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.props.portfolioGetProcess(this.props.user.id);
  }

  parentFunction() {
    this.props.parentFunction({
      type: 'addPortfolio',
      data: this.state.portfolio
    });
  }

  addPortfolio(item) {
    const portfolio = this.state.portfolio;
    const index = this.state.portfolio.indexOf(item.id);
    if (index > -1) {
      portfolio.splice(index, 1);
    } else {
      portfolio.push(item.id);
    }
    this.setState({ portfolio });
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
  renderPortfolio() {
    return this.props.merchant.dataGetPortfolio.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => this.addPortfolio(item)}>
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
                    this.state.portfolio.indexOf(item.id) > -1
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
          <Text style={Fonts.type61}>Portfolio</Text>
        </View>
        {!this.props.merchant.loadingGetPortfolio &&
        this.props.merchant.dataGetPortfolio !== null
          ? this.renderPortfolio()
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
)(HistoryPortfolioFilterView);

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


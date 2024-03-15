import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../../library/reactPackage';
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage';
import { ProductListType7 } from '../../../library/component';
import * as ActionCreators from '../../../state/actions';
import { GlobalStyle, Fonts } from '../../../helpers';
import masterColor from '../../../config/masterColor.json';

class HistoryBonusProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultShowProduct: 2,
      showMore: false,
      totalSku: 0
    };
  }

  renderContent() {
    return (
      <View>
        <View style={GlobalStyle.boxPadding} />
        <View style={GlobalStyle.shadowForBox}>
          <View
            style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
          >
            <Text style={Fonts.type48}>Bonus</Text>
          </View>
          <View
            style={[
              GlobalStyle.lines,
              { marginHorizontal: 16, marginBottom: 8 }
            ]}
          />
          <ProductListType7
            clickable={false}
            data={this.props.data.bonusCatalogues}
            type="Bonus"
            detailHistory={this.props.data}
          />
        </View>
      </View>
    );
  }
  /** MAIN */
  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  boxListProduct: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  boxSeeMore: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxListProductItem: {
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 4
  },
  boxButtonAndPriceTotal: {
    paddingHorizontal: 10,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonWhite: {
    backgroundColor: masterColor.backgroundWhite,
    borderWidth: 1,
    borderColor: masterColor.mainColor,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 4
  },
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  backgroundRed: {
    width: '100%',
    backgroundColor: masterColor.mainColor,
    position: 'absolute',
    zIndex: 0,
    height: 50
  },
  boxBottomAction: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    borderTopColor: masterColor.fontBlack10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64
  },
  boxPaymentNotification: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  /** BUTTON */
  buttonRed: {
    backgroundColor: masterColor.mainColor,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8
  }
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};
const mapStateToProps = ({ oms, history, user, merchant }) => {
  return { oms, history, user, merchant };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryBonusProductList);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 24062020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */

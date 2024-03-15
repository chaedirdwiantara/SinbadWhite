import {
  React,
  Component,
  View,
  ScrollView,
  StyleSheet,
  Text
} from '../../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage'
import {
  EmptyData
} from '../../../library/component'
import { GlobalStyle, Fonts, MoneyFormat } from '../../../helpers'
import { Color } from '../../../config'
import * as ActionCreators from '../../../state/actions';

class MerchantDetailProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER TTILE SECTION === */
  renderTitleSection(title) {
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 6 }}>
        <Text style={Fonts.type30}>{title}</Text>
      </View>
    );
  }
  /** === RENDER CONTENT SECTION === */
  renderContentSection(key, value, change, call) {
    return (
      <View style={styles.boxContent}>
        <View>
          <Text style={[Fonts.type31, { marginBottom: 6 }]}>{key}</Text>
          <Text style={Fonts.type8}>{value ? value : '-'}</Text>
        </View>
      </View>
    );
  }
  /** === RENDER PAYMENT LIST === */
  renderPaymentList() {
    return this.props.merchant.dataGetMerchantDetailV2.store.creditLimitStores.map(
      (item, index) => {
        return (
          <View
            style={[styles.contentContainer, GlobalStyle.shadowForBox]}
            key={index}
          >
            {this.renderTitleSection(item.invoiceGroup.name)}
            <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
            {this.renderContentSection(
              'Kredit',
              item.allowCreditLimit ? 'Ya' : 'Tidak'
            )}
            {this.renderContentSection(
              'Kredit Limit',
              MoneyFormat(parseInt(item.creditLimit, 10))
            )}
            {this.renderContentSection(
              'Balance',
              MoneyFormat(parseInt(item.balanceAmount, 10))
            )}
            {this.renderContentSection(
              'Account Receiveable',
              MoneyFormat(parseInt(item.accountReceivable, 10))
            )}
          </View>
        );
      }
    );
  }
  /** === RENDER EMPTY === */
  renderEmpty() {
    return <EmptyData title={'Tidak ada list faktur'} description={''} />;
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <ScrollView>
        {this.renderPaymentList()}
        <View style={{ paddingBottom: 50 }} />
      </ScrollView>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.merchant.dataGetMerchantDetailV2.store.creditLimitStores
          .length > 0
          ? this.renderContent()
          : this.renderEmpty()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    backgroundColor: Color.backgroundWhite,
    marginBottom: 16,
    paddingVertical: 6
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetailProfileView);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 07072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/


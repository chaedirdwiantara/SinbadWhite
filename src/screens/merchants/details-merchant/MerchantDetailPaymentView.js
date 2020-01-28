import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import GlobalStyle from '../../../helpers/GlobalStyle';
import masterColor from '../../../config/masterColor.json';
import { MoneyFormat } from '../../../helpers/NumberFormater';
import Fonts from '../../../helpers/GlobalFont';

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
  /** === RENDER CONTENT === */
  renderContent() {
    return this.props.merchant.dataGetMerchantDetail.creditLimitStores.map(
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
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {this.renderContent()}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    backgroundColor: masterColor.backgroundWhite,
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
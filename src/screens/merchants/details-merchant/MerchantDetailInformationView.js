import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import masterColor from '../../../config/masterColor.json';
import ButtonMenuType1 from '../../../components/button/ButtonMenuType1';

class MerchantDetailInformationView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  goTo(page) {
    switch (page) {
      case 'merchantAccount':
        NavigationService.navigate('MerchantEditView', {
          title: 'Akun Toko',
          type: 'merchantAccount'
        });
        break;
      case 'merchantPhysical':
        NavigationService.navigate('MerchantEditView', {
          title: 'Informasi Fisik Toko',
          type: 'merchantPhysical'
        });
        break;
      case 'merchantClassification':
        NavigationService.navigate('MerchantEditView', {
          title: 'Klasifikasi Toko',
          type: 'merchantClassification'
        });
        break;
      default:
        break;
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        <ButtonMenuType1
          title={'Akun Toko'}
          onPress={() => this.goTo('merchantAccount')}
        />
        <ButtonMenuType1
          title={'Informasi Fisik Toko'}
          onPress={() => this.goTo('merchantPhysical')}
        />
        <ButtonMenuType1
          title={'Klasifikasi Toko'}
          onPress={() => this.goTo('merchantClassification')}
        />
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
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
)(MerchantDetailInformationView);

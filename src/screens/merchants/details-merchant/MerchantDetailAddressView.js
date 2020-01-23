import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import masterColor from '../../../config/masterColor.json';
import InputType1 from '../../../components/input/InputType1';
import InputType2 from '../../../components/input/InputType2';
import InputMapsType1 from '../../../components/input/InputMapsType1';
import Fonts from '../../../helpers/GlobalFont';

class MerchantDetailAddressView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshLocation: false
    };
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() =>
            NavigationService.navigate('MerchantEditView', {
              title: 'Alamat Toko',
              type: 'merchantAddress'
            })
          }
        >
          <Text style={Fonts.type29}>Ubah</Text>
        </TouchableOpacity>
      )
    };
  };
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.props.saveLongLatForEdit({
      latitude: this.props.merchant.dataGetMerchantDetail.latitude,
      longitude: this.props.merchant.dataGetMerchantDetail.longitude
    });
    this.setState({ refreshLocation: true });
    setTimeout(() => {
      this.setState({ refreshLocation: false });
    }, 100);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.global.latitude !== this.props.global.latitude ||
      prevProps.global.longitude !== this.props.global.longitude
    ) {
      this.setState({ refreshLocation: true });
      setTimeout(() => {
        this.setState({ refreshLocation: false });
      }, 100);
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
      <ScrollView>
        <View style={{ paddingTop: 16, paddingBottom: 50 }}>
          <InputMapsType1
            title={'Koordinat Lokasi'}
            selectedMapLong={
              this.props.merchant.dataGetMerchantDetail.longitude
            }
            selectedMapLat={this.props.merchant.dataGetMerchantDetail.latitude}
            refresh={this.state.refreshLocation}
          />
          <InputType1
            title={'Provinsi'}
            editable={false}
            placeholder={
              this.props.merchant.dataGetMerchantDetail.urban
                ? this.props.merchant.dataGetMerchantDetail.urban.province.name
                : 'Provinsi'
            }
            keyboardType={'default'}
            text={text => {}}
            error={false}
            errorText={''}
          />
          <InputType1
            title={'Kota'}
            editable={false}
            placeholder={
              this.props.merchant.dataGetMerchantDetail.urban
                ? this.props.merchant.dataGetMerchantDetail.urban.city
                : 'Kota'
            }
            keyboardType={'default'}
            text={text => {}}
            error={false}
            errorText={''}
          />
          <InputType1
            title={'Kecamatan'}
            editable={false}
            placeholder={
              this.props.merchant.dataGetMerchantDetail.urban
                ? this.props.merchant.dataGetMerchantDetail.urban.district
                : 'Kecamatan'
            }
            keyboardType={'default'}
            text={text => {}}
            error={false}
            errorText={''}
          />
          <InputType1
            title={'Kelurahan'}
            editable={false}
            placeholder={
              this.props.merchant.dataGetMerchantDetail.urban
                ? this.props.merchant.dataGetMerchantDetail.urban.urban
                : 'Kelurahan'
            }
            keyboardType={'default'}
            text={text => {}}
            error={false}
            errorText={''}
          />
          <InputType1
            title={'Kodepos'}
            editable={false}
            placeholder={
              this.props.merchant.dataGetMerchantDetail.urban
                ? this.props.merchant.dataGetMerchantDetail.urban.zipCode
                : 'Kodepos'
            }
            keyboardType={'default'}
            text={text => {}}
            error={false}
            errorText={''}
          />
          <InputType2
            title={'Alamat'}
            editable={false}
            placeholder={
              this.props.merchant.dataGetMerchantDetail.address
                ? this.props.merchant.dataGetMerchantDetail.address
                : 'Alamat Lengkap'
            }
            keyboardType={'default'}
            text={text => {}}
            error={false}
            errorText={''}
          />
        </View>
      </ScrollView>
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

const mapStateToProps = ({ merchant, global }) => {
  return { merchant, global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetailAddressView);

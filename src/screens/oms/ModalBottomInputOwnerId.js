import React, { Component } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StatusBarRedOP50 } from '../../components/StatusBarGlobal';
import Fonts from '../../helpers/GlobalFont';
import * as ActionCreators from '../../state/actions';
import ButtonSingle from '../../components/button/ButtonSingle';
import ModalBottomType3 from '../../components/modal_bottom/ModalBottomType3';
import InputType1 from '../../components/input/InputType1';

class ModalBottomInputOwnerId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idNo: '',
      storeId: this.props.merchant.selectedMerchant.store.id,
      ownerId: this.props.merchant.selectedMerchant.store.owner.id
    };
  }
  /**
   * =================
   * FUNCTIONAL
   * ==================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    console.log('lalala');
  }
  /** === SAVE ID NO === */
  saveIdno() {
    Keyboard.dismiss();
    const data = {
      storeId: this.state.storeId,
      params: {
        user: {
          id: this.state.ownerId,
          idNo: this.state.idNo
        }
      }
    };
    this.props.merchantEditProcess(data);
  }
  /**
   * =======================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER BUTTON === */
  renderButton() {
    return !this.props.merchant.loadingGetMerchant ? (
      <ButtonSingle
        disabled={
          this.state.idNo.length < 16 || this.props.merchant.loadingEditMerchant
        }
        loading={this.props.merchant.loadingEditMerchant}
        title={'Tambah KTP ID'}
        borderRadius={4}
        onPress={() => this.saveIdno()}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER INPUT OWNER ID === */
  renderIdNo() {
    return (
      <InputType1
        title={'Nomor Kartu Tanda Penduduk (KTP)'}
        value={this.state.idNo}
        maxLength={16}
        placeholder={'Masukan ID KTP'}
        keyboardType={'numeric'}
        text={text => this.setState({ idNo: text })}
        error={false}
        errorText={''}
      />
    );
  }
  /** === RENDER DESCRIPTION === */
  renderDescription() {
    return (
      <View style={{ paddingHorizontal: 16, paddingBottom: 28 }}>
        <Text style={[Fonts.type59, { textAlign: 'center' }]}>
          Agar dapat melanjutkan pesanan, mohon isi nomor KTP penanggung jawab
          Toko
        </Text>
      </View>
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>
        {this.renderDescription()}
        {this.renderIdNo()}
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        {this.renderContentBody()}
        {this.renderButton()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType3
        open={this.props.open}
        typeClose={'cancel'}
        onPress={this.props.close}
        close={this.props.close}
        title={'Tambah KTP ID'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  boxContentBody: {
    flex: 1,
    paddingBottom: 20
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
)(ModalBottomInputOwnerId);

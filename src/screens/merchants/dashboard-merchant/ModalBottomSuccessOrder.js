import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import GlobalStyle from '../../../helpers/GlobalStyle';
import Fonts from '../../../helpers/GlobalFont';
import ModalBottomType1 from '../../../components/modal_bottom/ModalBottomType1';
import { StatusBarRedOP50 } from '../../../components/StatusBarGlobal';

class ModalBottomSuccessOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  clearOmsData() {
    this.props.omsResetData();
  }

  /** MAIN */
  render() {
    return (
      <ModalBottomType1
        open={this.props.oms.dataOmsConfirmOrder !== null}
        title={''}
        buttonTitle={'Selesai'}
        onPress={() => this.clearOmsData()}
        content={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 60
            }}
          >
            <StatusBarRedOP50 />
            <Image
              source={require('../../../assets/images/sinbad_image/check_sinbad.png')}
              style={GlobalStyle.image77}
            />
            <Text style={Fonts.type55}>Terimakasih</Text>
          </View>
        }
      />
    );
  }
}

const mapStateToProps = ({ oms }) => {
  return { oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomSuccessOrder);
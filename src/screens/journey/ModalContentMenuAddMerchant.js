import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

class ModalContentMenuAddMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * RENDER VIEW
   * =======================
   */
  /** === CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.boxMenu}
          onPress={() => this.props.parentFunction('new_merchant')}
        >
          <Image
            source={require('../../assets/images/menu/store.png')}
            style={styles.menuCircleImage}
          />
          <Text style={Fonts.type8}>Toko</Text>
          <Text style={Fonts.type8}>Baru</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxMenu}
          onPress={() => this.props.parentFunction('existing_merchant')}
        >
          <Image
            source={require('../../assets/images/menu/list_toko.png')}
            style={styles.menuCircleImage}
          />
          <Text style={Fonts.type8}>Toko</Text>
          <Text style={Fonts.type8}>Existing</Text>
        </TouchableOpacity>
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
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 40
  },
  menuCircleImage: {
    marginBottom: 6,
    marginHorizontal: 25,
    height: 50,
    width: 50,
    borderRadius: 50
  },
  boxMenu: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContentMenuAddMerchant);

import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import SearchBarType3 from '../../components/search_bar/SearchBarType3';
import CartGlobal from '../../components/CartGlobal';
import PdpGridDataView from './PdpGridDataView';
import PdpListDataView from './PdpListDataView';
import PdpLineDataView from './PdpLineDataView';

class PdpSearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  componentDidMount() {
    this.props.pdpGetReset();
  }

  componentDidUpdate(prevState) {
    if (
      prevState.global.search !== this.props.global.search &&
      this.props.global.search !== ''
    ) {
      this.props.pdpGetReset();
      this.props.pdpGetProcess({
        page: 0,
        loading: true,
        searchText: this.props.global.search,
        supplierId: this.props.user.userSuppliers[0].supplierId
      });
    }
  }

  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  renderPdpData() {
    if (this.props.pdp.pdpDisplay === 'grid') {
      return <PdpGridDataView />;
    } else if (this.props.pdp.pdpDisplay === 'list') {
      return <PdpListDataView />;
    } else if (this.props.pdp.pdpDisplay === 'line') {
      return <PdpLineDataView />;
    }
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <View style={{ width: '100%' }}>
          <SearchBarType3 placeholder={'Cari sku, nomor sku'} />
        </View>
      ),
      headerRight: () => (
        <View style={{ marginRight: 16 }}>
          <CartGlobal />
        </View>
      )
    };
  };
  /** MAIN */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderPdpData()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ auth, pdp, global, user }) => {
  return { auth, pdp, global, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(PdpSearchView);

import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import NavigationService from '../../navigation/NavigationService';
import PdpGridDataView from './PdpGridDataView';
import PdpListDataView from './PdpListDataView';
import PdpLineDataView from './PdpLineDataView';
import PdpFilterView from './PdpFilterView';
import PdpOrderView from './PdpOrderView';
import CartGlobal from '../../components/CartGlobal';

class PdpView extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.pdpGetReset();
    this.props.pdpGetProcess({
      page: 0,
      loading: true,
      supplierId: this.props.user.userSuppliers[0].supplierId
    });
  }

  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === EMPTY PDP === */
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
        <View>
          <Text style={Fonts.type35}>Cari Produk</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('PdpSearchView')}
          >
            <MaterialIcon
              color={masterColor.fontWhite}
              name={'search'}
              size={24}
            />
          </TouchableOpacity>
          <View style={{ marginRight: 16, marginLeft: 12 }}>
            <CartGlobal />
          </View>
        </View>
      )
    };
  };

  renderOrderBottom() {
    return <PdpOrderView />;
  }

  /** MAIN */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderPdpData()}
        {this.renderOrderBottom()}
        <PdpFilterView />
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

const mapStateToProps = ({ pdp, user }) => {
  return { pdp, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(PdpView);

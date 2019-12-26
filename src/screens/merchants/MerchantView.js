import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import MerchantTabView from './MerchantTabView';
import MerchantListView from './MerchantListView';
import MerchantMapView from './MerchantMapView';

class MerchantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'list',
      search: '',
      portfolio: 0
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.merchantGetProcess();
  }
  /** === FROM CHILD FUNCTION === */
  parentFunction(data) {
    if (data.type === 'section') {
      this.setState({ activeTab: data.data });
    } else if (data.type === 'search') {
      this.setState({ search: data.data });
    } else if (data.type === 'portfolio') {
      this.setState({ portfolio: data.data });
    }
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
          onPress={() => NavigationService.navigate('NotificationView')}
        >
          <AntDesignIcon
            color={masterColor.mainColor}
            name={'pluscircle'}
            size={24}
          />
        </TouchableOpacity>
      )
    };
  };
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === CONTENT === */
  renderContent() {
    return (
      <View style={styles.containerContent}>
        {this.state.activeTab === 'list' ? (
          <MerchantListView
            searchText={this.state.search}
            portfolio={this.state.portfolio}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        ) : (
          <MerchantMapView
            searchText={this.state.search}
            portfolio={this.state.portfolio}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        )}
      </View>
    );
  }
  /** === HEADER TABS === */
  renderHeaderTabs() {
    return (
      <View style={styles.containerTabs}>
        <MerchantTabView
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHeaderTabs()}
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  containerTabs: {
    height: 44
  },
  containerContent: {
    flex: 1
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantView);

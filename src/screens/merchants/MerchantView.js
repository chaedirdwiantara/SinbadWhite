import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import Fonts from '../../helpers/GlobalFont';
import TagList from '../../components/TagList';
import MerchantTabView from './MerchantTabView';

class MerchantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'list'
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
  /** === HEADER TABS === */
  renderHeaderTabs() {
    return (
      <View style={styles.boxTabs}>
        <MerchantTabView />
      </View>
    );
  }
  /** === TAGS SECTION === */
  renderTags() {
    return (
      <TagList
        shadow
        data={[
          'Portfolio 1',
          'Portfolio 2',
          'Portfolio 3',
          'Portfolio 4',
          'Portfolio 5',
          'Portfolio 6',
          'Portfolio 7'
        ]}
      />
    );
  }

  render() {
    return (
      <View>
        {this.renderHeaderTabs()}
        {this.renderTags()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxTabs: {
    height: 44
  },
  boxTabItem: {
    flex: 1,
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

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantView);

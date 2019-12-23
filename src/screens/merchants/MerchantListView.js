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
import SearchBarType1 from '../../components/search_bar/SearchBarType1';

class MerchantListView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.portfolio);
  }
  parentFunction(data) {
    if (data.type === 'portfolio') {
      this.props.parentFunction(data);
    } else if (data.type === 'search') {
      this.props.parentFunction(data);
    }
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === RENDER SEARCH BAR === */
  renderSearchBar() {
    return (
      <View>
        <SearchBarType1
          searchText={this.props.searchText}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }
  /** === TAGS SECTION === */
  renderTags() {
    return (
      <TagList
        selected={this.props.portfolio}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
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
        {this.renderSearchBar()}
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
export default connect(mapStateToProps, mapDispatchToProps)(MerchantListView);

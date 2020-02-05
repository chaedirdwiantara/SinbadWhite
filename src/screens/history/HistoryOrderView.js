import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import TagListType2 from '../../components/tag/TagListType2';
import SkeletonType2 from '../../components/skeleton/SkeletonType2';
import HistoryDataListView from './HistoryDataListView';

class HistoryOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrderStatus: 0
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  parentFunction(data) {
    if (data.type === 'status') {
      this.setState({ selectedOrderStatus: data.data });
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
      <HistoryDataListView
        section={this.props.section}
        portfolio={this.props.portfolio}
        dateFilter={this.props.dateFilter}
        search={this.props.search}
        status={
          this.props.history.dataGetOrderStatus !== null
            ? this.props.history.dataGetOrderStatus[
                this.state.selectedOrderStatus
              ].status
            : ''
        }
      />
    );
  }
  /** === TAGS SECTION === */
  renderTagsContent() {
    return (
      <View>
        <TagListType2
          selected={this.state.selectedOrderStatus}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
          data={this.props.history.dataGetOrderStatus}
        />
        <View style={GlobalStyle.lines} />
      </View>
    );
  }
  /** === RENDER SKELETON TAGS === */
  renderSkeletonTags() {
    return (
      <View>
        <SkeletonType2 />
        <View style={GlobalStyle.lines} />
      </View>
    );
  }
  /** === TAG LIST === */
  renderTagList() {
    return !this.props.history.loadingGetOrderStatus &&
      this.props.history.dataGetOrderStatus !== null
      ? this.renderTagsContent()
      : this.renderSkeletonTags();
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderTagList()}
        {this.renderContent()}
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

const mapStateToProps = ({ history }) => {
  return { history };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrderView);

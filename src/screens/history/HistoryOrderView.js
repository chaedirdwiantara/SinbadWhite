import { React, Component, View, StyleSheet } from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import { TagListType4, SkeletonType2 } from '../../library/component';
import { GlobalStyle } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
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
        storeId={this.props.storeId}
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
        order={this.props.order}
      />
    );
  }
  /** === TAGS SECTION === */
  renderTagsContent() {
    return (
      <View>
        <TagListType4
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryOrderView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */

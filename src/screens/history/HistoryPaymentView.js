import { React, Component, View, StyleSheet } from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import { TagListType2, SkeletonType2 } from '../../library/component';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import HistoryDataListView from './HistoryDataListView';

class HistoryPaymentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPaymentStatus: 0
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  parentFunction(data) {
    if (data.type === 'status') {
      this.setState({ selectedPaymentStatus: data.data });
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
          this.props.history.dataGetPaymentStatus !== null
            ? this.props.history.dataGetPaymentStatus[
                this.state.selectedPaymentStatus
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
        <TagListType2
          selected={this.state.selectedPaymentStatus}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
          data={this.props.history.dataGetPaymentStatus}
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
    return !this.props.history.loadingGetPaymentStatus &&
      this.props.history.dataGetPaymentStatus !== null
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
)(HistoryPaymentView);

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

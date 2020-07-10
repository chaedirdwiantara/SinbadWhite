import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage'
import {
  TagListType1,
  SearchBarType1,
  SkeletonType2
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
import { Color } from '../../config'
import * as ActionCreators from '../../state/actions';
import MerchantListDataView from './MerchantListDataView';

class MerchantListView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  /**
   * ==========================
   * SEARCH BAR
   * =========================
   */
  /** === RENDER FOR SEARCH BAR === */
  renderSearchBar() {
    return this.props.merchant.dataGetPortfolio !== null
      ? this.renderCheckSearchBar()
      : this.renderSearchBarContent();
  }
  /** RENDER CHECK SEARCH BAR === */
  renderCheckSearchBar() {
    return this.props.merchant.dataGetPortfolio.length > 0 ? (
      this.renderSearchBarContent()
    ) : (
      <View />
    );
  }
  /** === RENDER SEARCH BAR === */
  renderSearchBarContent() {
    return (
      <View>
        <SearchBarType1
          searchText={this.props.searchText}
          placeholder={'Cari nama / id toko disini'}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }
  /** === TAGS SECTION === */
  renderTagsContent() {
    return this.props.merchant.dataGetPortfolio.length > 0 ? (
      <TagListType1
        selected={this.props.portfolio}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        data={this.props.merchant.dataGetPortfolio}
      />
    ) : (
      <View />
    );
  }
  /** === CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        {!this.props.merchant.loadingGetMerchant ? (
          <View>
            <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
              <Text style={Fonts.type8}>
                {this.props.merchant.totalDataGetMerchant} List Store
              </Text>
            </View>
            <View style={GlobalStyle.lines} />
          </View>
        ) : (
          <View />
        )}

        <MerchantListDataView
          portfolioIndex={this.props.portfolio}
          type={this.props.type}
          search={this.props.searchText}
        />
      </View>
    );
  }
  /** === RENDER SKELETON TAGS === */
  renderSkeletonTags() {
    return <SkeletonType2 />;
  }
  /** === RENDER TAGS === */
  renderTags() {
    return !this.props.merchant.loadingGetPortfolio &&
      this.props.merchant.dataGetPortfolio !== null
      ? this.renderTagsContent()
      : this.renderSkeletonTags();
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderSearchBar()}
        {this.renderTags()}
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  boxTabs: {
    height: 44
  },
  boxTabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantListView);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 07072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/


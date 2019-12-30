import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import masterColor from '../../config/masterColor.json';
import { StatusBarBlackOP40 } from '../../components/StatusBarGlobal';
import Fonts from '../../helpers/GlobalFont';
import ModalBottomMerchantListDataView from './ModalMerchantListDataView';
import SearchBarType1 from '../../components/search_bar/SearchBarType1';
import * as ActionCreators from '../../state/actions';
import TagList from '../../components/TagList';
import SkeletonType2 from '../../components/skeleton/SkeletonType2';
import ButtonSingle from '../../components/button/ButtonSingle';

const { height } = Dimensions.get('window');

class ModalBottomMerchantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      portfolio: 0,
      selectedMerchant: [],
      dataForAddJourney: []
    };
  }
  /**
   * =================
   * FUNCTIONAL
   * ==================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.portfolioGetProcess(this.props.user.id);
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.merchant.dataGetPortfolio !==
      this.props.merchant.dataGetPortfolio
    ) {
      if (
        this.props.merchant.dataGetPortfolio !== null &&
        this.props.merchant.dataGetPortfolio.length > 0
      ) {
        this.getMerchant(0, '');
      }
    }
  }
  /** === CALL GET FUNCTION === */
  getMerchant(portfolioIndex, search) {
    this.props.merchantGetReset();
    this.props.merchantGetProcess({
      page: 0,
      loading: true,
      portfolioId: this.props.merchant.dataGetPortfolio[portfolioIndex].id,
      search
    });
  }
  /** === PARENT FUNCTION FROM CHILD === */
  parentFunction(data) {
    if (data.type === 'portfolio') {
      this.getMerchant(data.data, this.state.search);
      this.setState({ portfolio: data.data });
    } else if (data.type === 'search') {
      this.getMerchant(this.state.portfolio, data.data);
      this.setState({ search: data.data });
    } else if (data.type === 'merchant') {
      const selectedMerchant = this.state.selectedMerchant;
      const dataForAddJourney = this.state.dataForAddJourney;
      const indexSelectedMerchant = selectedMerchant.indexOf(data.data);
      const dataObject = {
        portfolioId: parseInt(
          this.props.merchant.dataGetPortfolio[this.state.portfolio].id,
          10
        ),
        storeId: parseInt(data.data, 10),
        journeyPlanId: parseInt(
          this.props.journey.dataGetJourneyPlan[0].journeyPlanId,
          10
        )
      };
      if (indexSelectedMerchant > -1) {
        selectedMerchant.splice(indexSelectedMerchant, 1);
        dataForAddJourney.splice(indexSelectedMerchant, 1);
      } else {
        selectedMerchant.push(data.data);
        dataForAddJourney.push(dataObject);
      }
      this.setState({ selectedMerchant, dataForAddJourney });
    }
  }
  /** === ADD JOURNEY PLAN === */
  addJourneyPlan() {
    console.log(this.state.dataForAddJourney);
    this.props.saveMerchatToJourneyPlanProcess({
      storeType: 'exist_store',
      body: this.state.dataForAddJourney
    });
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <View>
        <View style={styles.boxContentTitle}>
          <TouchableOpacity style={styles.boxClose} onPress={this.props.close}>
            <MaterialIcon
              name="close"
              color={masterColor.fontBlack50}
              size={24}
            />
          </TouchableOpacity>

          <View>
            <Text style={Fonts.type7}>Toko Existing</Text>
          </View>
        </View>
      </View>
    );
  }
  /** === TAGS SECTION === */
  renderTagsContent() {
    return this.props.merchant.dataGetPortfolio.length > 0 ? (
      <TagList
        selected={this.state.portfolio}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        data={this.props.merchant.dataGetPortfolio}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER SEARCH BAR === */
  renderSearchBarContent() {
    return (
      <View>
        <SearchBarType1
          searchText={this.state.search}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
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
  /** RENDER CONTENT LIST */
  renderContentList() {
    return (
      <View style={{ flex: 1 }}>
        <ModalBottomMerchantListDataView
          portfolioIndex={this.state.portfolio}
          search={this.state.search}
          selectedMerchant={this.state.selectedMerchant}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return !this.props.merchant.loadingGetMerchant ? (
      <ButtonSingle
        disabled={
          this.state.selectedMerchant.length === 0 ||
          this.props.journey.loadingSaveMerchantToJourneyPlan
        }
        loading={this.props.journey.loadingSaveMerchantToJourneyPlan}
        title={'Tambah ke Journey Plan'}
        borderRadius={4}
        onPress={() => this.addJourneyPlan()}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>
        {this.renderSearchBarContent()}
        {this.renderTags()}
        {this.renderContentList()}
        {this.renderButton()}
      </View>
    );
  }
  /** === RENDER STATUS BAR === */
  renderContent() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        backdropColor={masterColor.fontBlack100}
        backdropOpacity={0.4}
        deviceHeight={height}
        style={styles.mainContainer}
      >
        <View style={styles.contentContainer}>
          {this.renderContentTitle()}
          {this.renderContentBody()}
        </View>
      </Modal>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View>
        <StatusBarBlackOP40 />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 0.93 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1,
    paddingTop: 10
  },
  boxContentTitle: {
    marginTop: 18,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  }
});

const mapStateToProps = ({ user, merchant, journey }) => {
  return { user, merchant, journey };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomMerchantList);

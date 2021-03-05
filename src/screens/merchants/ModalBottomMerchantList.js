import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Text
} from '../../library/reactPackage'
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment,
  Modal
} from '../../library/thirdPartyPackage'
import {
  StatusBarBlackOP40,
  SearchBarType1,
  TagListType1,
  SkeletonType2,
  ButtonSingle
} from '../../library/component'
import { Color } from '../../config'
import { Fonts } from '../../helpers'
import ModalBottomMerchantListDataView from './ModalMerchantListDataView';
import * as ActionCreators from '../../state/actions';
const { height } = Dimensions.get('window');
const today = moment().format('YYYY-MM-DD') + 'T00:00:00+00:00';

class ModalBottomMerchantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      portfolio: 0,
      heightList: 0.93 * height,
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
    this.keyboardListener();
    this.props.portfolioGetProcessV2();
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.merchant.dataGetPortfolioV2 !==
      this.props.merchant.dataGetPortfolioV2
    ) {
      if (
        this.props.merchant.dataGetPortfolioV2 !== null &&
        this.props.merchant.dataGetPortfolioV2.length > 0
      ) {
        this.getMerchant('direct', 0, '');
      }
    }
  }

  componentWillUnmount() {
    this.keyboardRemove();
  }
  /**
   * ========================
   * FOR KEYBOARD
   * ========================
   */
  /** KEYBOARD LISTENER */
  keyboardListener() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }
  /** KEYBOARD SHOW */
  keyboardDidShow = () => {
    this.setState({ heightList: 0.2 * height });
  };
  /** KEYBOARD HIDE */
  keyboardDidHide = () => {
    this.setState({ heightList: 0.93 * height });
  };
  /** KEYBOARD REMOVE */
  keyboardRemove() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  /** === CALL GET FUNCTION === */
  getMerchant(type, portfolioIndex, search) {
    this.props.merchantGetResetV2();
    this.props.merchantGetProcessV2({
      loading: true,
      page: 1,
      portfolioId: this.props.merchant.dataGetPortfolioV2[0].id,
      search
    });
  }
  /** === PARENT FUNCTION FROM CHILD === */
  parentFunction(data) {
    if (data.type === 'portfolio') {
      this.getMerchant(
        data.data === 0 ? 'direct' : 'group',
        data.data,
        this.state.search
      );
      this.setState({ portfolio: data.data });
    } else if (data.type === 'search') {
      this.getMerchant(
        this.state.portfolio === 0 ? 'direct' : 'group',
        this.state.portfolio,
        data.data
      );
      this.setState({ search: data.data });
    } else if (data.type === 'merchant') {
      const selectedMerchant = this.state.selectedMerchant;
      const dataForAddJourney = this.state.dataForAddJourney;
      const indexSelectedMerchant = selectedMerchant.indexOf(data.data);
      const dataObject = {
        typeOfStore: 'exist_store',
        portfolioId: parseInt(
          this.props.merchant.dataGetPortfolioV2[this.state.portfolio].id,
          10
        ),
        storeId: parseInt(data.data, 10)
        // journeyPlanId: parseInt(
        //   this.props.journey.dataGetJourneyPlan[0].journeyPlanId,
        //   10
        // )
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
    this.props.saveMerchantToJourneyPlanProcessV2({
      date: today,
      journeyBookStores: this.state.dataForAddJourney
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
              color={Color.fontBlack50}
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
    return this.props.merchant.dataGetPortfolioV2.length > 0 ? (
      <TagListType1
        selected={this.state.portfolio}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        data={this.props.merchant.dataGetPortfolioV2}
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
          placeholder={'Cari nama / id toko disini'}
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
      this.props.merchant.dataGetPortfolioV2 !== null
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
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        deviceHeight={height}
        style={styles.mainContainer}
      >
        <View
          style={[styles.contentContainer, { height: this.state.heightList }]}
        >
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
    backgroundColor: Color.backgroundWhite,
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
 * updatedBy: dyah
 * updatedDate: 24022021
 * updatedFunction:
 * -> update the props of portfolio.
 * -> Update function addJourneyPlan and the props when saving merchant to journey plan.
 * updatedBy: dyah
 * updatedDate: 25022021
 * updatedFunction:
 * -> update the props of merchant list.
 */

import { React, Component, View, StyleSheet } from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  moment
} from '../../library/thirdPartyPackage';
import {
  SearchBarType2,
  ModalBottomErrorRespons
} from '../../library/component';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';
import JourneyListSearchView from './JourneyListSearchView';
import NavigationService from '../../navigation/NavigationService';

class JourneyMapSearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalErrorGlobal: false,
      merchant: null,
      search: ''
    };
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const getJourneyPlan = navigation.getParam('getJourneyPlan');
    const updateSearchText = navigation.getParam('updateSearchText');

    /** === FROM CHILD FUNCTION === */
    const parentFunction = data => {
      if (data.type === 'search') {
        if (getJourneyPlan && updateSearchText) {
          getJourneyPlan(data.data, navigation);
          updateSearchText(data.data);
        }
      }
    };

    let search = '';

    return {
      headerTitle: () => (
        <View style={{ width: '100%', marginTop: -16, marginLeft: -16 }}>
          <SearchBarType2
            blackSearchIcon
            maxLength={30}
            searchText={search}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={
              parentFunction ? parentFunction.bind(this.parentFunction) : null
            }
          />
        </View>
      )
    };
  };
  /**
   * =====================
   * FUNCTIONAL
   * ======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.journeyPlanGetMapSearchReset();
    /**SET NAVIGATION FUNCTION */
    this.props.navigation.setParams({
      getJourneyPlan: this.getJourneyPlan,
      updateSearchText: this.updateSearchText,
      journeyPlanGetMapSearchReset: this.props.journeyPlanGetMapSearchReset,
      journeyPlanGetMapSearchProcess: this.props.journeyPlanGetMapSearchProcess
    });
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    /** error get journey plan map search */
    if (
      prevProps.journey.errorGetJourneyPlanMapSearch !==
      this.props.journey.errorGetJourneyPlanMapSearch
    ) {
      if (this.props.journey.errorGetJourneyPlanMapSearch !== null) {
        this.setState({
          openModalErrorGlobal: true
        });
      }
    }
  }
  /** === GET JOURNEY PLAN === */
  getJourneyPlan(search, navigation) {
    const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';
    const journeyPlanGetMapSearchReset = navigation.getParam(
      'journeyPlanGetMapSearchReset'
    );
    const journeyPlanGetMapSearchProcess = navigation.getParam(
      'journeyPlanGetMapSearchProcess'
    );
    if (search.length === 0) {
      return journeyPlanGetMapSearchReset();
    }
    journeyPlanGetMapSearchReset();
    journeyPlanGetMapSearchProcess({
      page: 1,
      date: today,
      search,
      storetype: 'all',
      loading: true
    });
  }
  /** === UPDATE THE SEARCH TEXT WITH FUNCTION === */
  updateSearchText = search => {
    this.setState({ search });
  };
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === RENDER MAPS WITH JOURNEY PLAN === */
  renderJourneyListSearch() {
    return <JourneyListSearchView searchText={this.state.search} />;
  }
  /** === RENDER MODAL ERROR RESPONSE === */
  renderModalErrorResponse() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        statusBarType={'transparent'}
        open={this.state.openModalErrorGlobal}
        onPress={() =>
          this.setState({ openModalErrorGlobal: false }, () =>
            NavigationService.goBack()
          )
        }
      />
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderJourneyListSearch()}
        {/* Modal */}
        {this.renderModalErrorResponse()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ user, merchant, journey }) => {
  return { user, merchant, journey };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyMapSearchView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 06082021
 * updatedBy: dyah
 * updatedDate: 24082021
 * updatedFunction:
 * -> maximise the character of search (30 characters)
 */

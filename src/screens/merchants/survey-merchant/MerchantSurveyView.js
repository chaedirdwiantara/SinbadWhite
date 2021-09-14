import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import { LoadingPage, StatusBarWhite } from '../../../library/component';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import SurveyListDataView from './SurveyListDataView';

class MerchantSurveyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successSurveyList: false
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** FOR GET LOG ALL ACTIVITY */
  refreshMerchantGetLogAllActivityProcess() {
    this.props.merchantGetLogAllActivityProcessV2(
      this.props.merchant.selectedMerchant.journeyBookStores.id
    );
  }
  /** FOR GET SURVEY LIST */
  getSurveyList() {
    const params = {
      storeId: this.props.merchant.selectedMerchant.storeId,
      page: 1,
      length: 10
    };
    this.props.merchantGetSurveyListProcess(params);
  }
  /** === DID MOUNT === */
  componentDidMount() {
    this.refreshMerchantGetLogAllActivityProcess();
    const totalSurvey = this.props.merchant.surveyList.payload.data.length;
    const totalCompletedSurvey = this.props.merchant.surveyList.payload.data.filter(
      item => item.responseStatus === 'completed'
    ).length;
    const { readOnly } = this.props.navigation.state.params;
    this.props.navigation.setParams({
      totalSurvey,
      totalCompletedSurvey,
      readOnly
    });
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { totalSurvey, totalCompletedSurvey } = navigation.state.params;

    return {
      headerTitle: () => (
        <View>
          <Text style={Fonts.textHeaderPage}>
            Survei ({totalCompletedSurvey}/{totalSurvey})
          </Text>
        </View>
      )
    };
  };
  /**
   * ========================
   * RENDER
   * ========================
   */
  /** === RENDER SURVEY LIST === */
  renderSurveyList() {
    return <SurveyListDataView navigation={this.props.navigation} />;
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <SafeAreaView>
        <StatusBarWhite />
        {this.props.merchant.loadingGetSurveyList ? (
          <View style={{ height: '100%' }}>
            <LoadingPage />
          </View>
        ) : (
          <View style={styles.container}>{this.renderSurveyList()}</View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Color.fontBlack05
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantSurveyView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 19112020
 * updatedBy: dyah
 * updatedDate: 13092021
 * updatedFunction:
 * -> update code in merchant survey view (separate the survey list view).
 */

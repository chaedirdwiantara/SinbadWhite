import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import masterColor from '../../../config/masterColor.json';

class SurveyListDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** FOR REFRESH */
  onHandleRefresh = () => {
    this.props.merchantGetSurveyListRefresh();
    this.getSurveyList(1);
    this.props.merchantGetTotalSurveyProcess(
      this.props.merchant.selectedMerchant?.storeId
    );
  };
  /** FOR LOAD MORE */
  onHandleLoadMore = () => {
    if (
      !this.props.merchant.errorGetSurveyList &&
      !this.props.merchant.loadingLoadMoreSurveyList
    ) {
      if (this.props.merchant.surveyList.payload.data) {
        if (
          this.props.merchant.surveyList.payload.data.length <
          this.props.merchant.totalDataGetSurveyList
        ) {
          const page = this.props.merchant.pageGetSurveyList + 1;
          this.props.MerchantGetSurveyListLoadMore();
          this.getSurveyList(page);
        }
      }
    }
  };
  /** FOR GET SURVEY LIST */
  getSurveyList(page) {
    const params = {
      storeId: this.props.merchant.selectedMerchant.storeId,
      page,
      length: 10
    };
    this.props.merchantGetSurveyListProcess(params);
  }
  /** FOR WHEN CLICKING THE SURVEY */
  goToSurvey = item => {
    const { readOnly } = this.props.navigation.state.params;
    if (item.surveyType === 'photo') {
      return NavigationService.navigate('MerchantSurveyDisplayPhotoView', {
        readOnly,
        surveyId: item.id,
        surveyName: item.surveyName,
        typeId: item.typeId,
        surveyResponseId: item.surveyResponseId,
        surveySerialId: item.surveySerialId,
        surveyQuestions: item.surveyQuestions
      });
    }
    // surveyType questionnaire
    if (item.responseStatus === 'completed') {
      // navigate to result
      return NavigationService.navigate('MerchantSurveyResultView', {
        surveyResponseId: item.surveyResponseId,
        surveyId: item.id,
        surveyName: item.surveyName,
      });
    } else {
      return NavigationService.navigate('MerchantQuestionnaireView', {
        surveyId: item.id,
        surveyName: item.surveyName,
        typeId: item.typeId,
        surveyResponseId: item.surveyResponseId
      });
    }
  };
  /**
   * ========================
   * RENDER
   * ========================
   */
  /** === RENDER STATUS SURVEY === */
  renderStatusSurvey = status => {
    let icon, iconColor, color, font, text;
    if (status) {
      if (status === 'inProgress') {
        icon = 'watch-later';
        iconColor = Color.fontYellow50;
        color = Color.fontYellow10;
        font = Fonts.type109p;
        text = 'Diisi Sebagian';
      } else {
        icon = 'check';
        iconColor = Color.fontGreen50;
        color = Color.fontGreen50OP10;
        font = Fonts.type110p;
        text = 'Selesai';
      }
    } else {
      color = Color.fontBlack05;
      font = Fonts.type60;
      text = 'Belum diisi';
    }

    return (
      <View style={[styles.statusSurveyContainer, { backgroundColor: color }]}>
        {icon && (
          <MaterialIcon
            name={icon}
            color={iconColor}
            size={13}
            style={{ marginRight: 5 }}
          />
        )}
        <Text style={font}>{text}</Text>
      </View>
    );
  };
  /** === RENDER SURVEY === */
  renderItem({ item }) {
    return (
      <View style={[styles.menuContainer]}>
        <View style={[styles.card, GlobalStyle.shadowForBox]}>
          <TouchableOpacity
            style={styles.cardInside}
            onPress={() => this.goToSurvey(item)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcon
                name={
                  item.surveyType === 'photo' ? 'photo-camera' : 'assignment'
                }
                color={masterColor.fontBlack40}
                size={25}
                style={{ marginRight: 19 }}
              />
              <View>
                <Text style={[Fonts.type16]}>{item.surveyName}</Text>
                <View style={{ height: 12 }} />
                {this.renderStatusSurvey(item.responseStatus)}
              </View>
            </View>
            <MaterialIcon
              name="chevron-right"
              color={masterColor.fontBlack40}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        <FlatList
          data={this.props.merchant.surveyList.payload.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.merchant.refreshGetSurveyList}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={this.onHandleLoadMore.bind(this)}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Color.fontBlack05
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 5
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Color.backgroundWhite
  },
  cardInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statusSurveyContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.fontBlack10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(SurveyListDataView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 13092021
 * updatedBy: dyah
 * updatedDate: 16092021
 * updatedFunction:
 * -> create new function when going to survey.
 * -> update stylesheet for survey response status.
 * -> add new props when refresh (getTotalSurvey).
 */

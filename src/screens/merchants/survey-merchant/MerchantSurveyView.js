import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import { LoadingPage, StatusBarWhite } from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import masterColor from '../../../config/masterColor.json';

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
  renderSurvey(item) {
    const { readOnly } = this.props.navigation.state.params;
    return (
      <View style={[styles.menuContainer]}>
        <View style={[styles.card, GlobalStyle.shadowForBox]}>
          <TouchableOpacity
            style={styles.cardInside}
            onPress={() => {
              if (item.template?.code === 'photo') {
                return NavigationService.navigate(
                  'MerchantSurveyDisplayPhotoView',
                  {
                    readOnly,
                    surveyId: item.id,
                    surveyName: item.surveyName,
                    surveyResponseId: item.surveyResponseId,
                    surveySerialId: item.surveySerialId,
                    surveyQuestions: item.surveyQuestions
                  }
                );
              }
              NavigationService.navigate('MerchantQuestionnaireView', {
                surveyId: item.id,
                surveyName: item.surveyName
              });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcon
                name={item.type === 'photo' ? 'photo-camera' : 'assignment'}
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
  /** === RENDER CONTENT ITEM === */
  renderContentItem() {
    return (
      <View>
        <FlatList
          data={this.props.merchant.surveyList.payload.data}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({ item }) => this.renderSurvey(item)}
        />
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator
          data={[1]}
          renderItem={this.renderContentItem.bind(this)}
          keyExtractor={(data, index) => index.toString()}
        />
      </View>
    );
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
          <View style={styles.container}>{this.renderContent()}</View>
        )}
      </SafeAreaView>
    );
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
    alignItems: 'center'
  }
});

const mapStateToProps = ({ auth, merchant, user, permanent }) => {
  return { auth, merchant, user, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantSurveyView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 19112020
 * updatedBy: dyah
 * updatedDate: 09092021
 * updatedFunction:
 * -> update the navigation.
 */

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
  MaterialIcon,
  AntDesignIcon
} from '../../../library/thirdPartyPackage';
import { LoadingPage, StatusBarRed } from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import masterColor from '../../../config/masterColor.json';
import _ from 'lodash';

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
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = () => {
    let storeName = 'Toko Survey';

    return {
      headerTitle: () => (
        <View>
          <Text style={Fonts.type35}>{storeName}</Text>
        </View>
      )
    };
  };
  /** === RENDER DISPLAY PHOTO MENU === */
  renderDisplayPhotoMenu(item) {
    const { readOnly } = this.props.navigation.state.params;
    return (
      <View style={[styles.menuContainer]}>
        <View style={[styles.card, GlobalStyle.shadowForBox5]}>
          <TouchableOpacity
            style={styles.cardInside}
            onPress={() =>
              NavigationService.navigate('MerchantSurveyDisplayPhotoView', {
                readOnly,
                surveyId: item.id,
                surveyName: item.surveyName,
                surveyResponseId: item.surveyResponseId,
                surveySerialId: item.surveySerialId,
                surveySteps: item.surveySteps
              })
            }
          >
            <View style={styles.cameraBackground}>
              <AntDesignIcon
                name="camerao"
                color={masterColor.fontWhite}
                size={20}
              />
              {item.responseStatus ? (
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor:
                        item.responseStatus === 'inProgress'
                          ? masterColor.fontYellow50
                          : masterColor.fontGreen50
                    }
                  ]}
                >
                  <MaterialIcon
                    name={
                      item.responseStatus === 'inProgress'
                        ? 'timelapse'
                        : 'check'
                    }
                    color={masterColor.fontWhite}
                    size={11}
                  />
                </View>
              ) : null}
            </View>
            <View>
              <Text style={[Fonts.type12, { color: masterColor.fontBlack100 }]}>
                {item.surveyName}
              </Text>
              <Text style={[Fonts.type12, { color: masterColor.fontBlack80 }]}>
                {item.SurveyDesc ? item.SurveyDesc : ''}
              </Text>
            </View>
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
          renderItem={({ item }) => this.renderDisplayPhotoMenu(item)}
        />
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator
          data={[1]}
          renderItem={this.renderContentItem.bind(this)}
          keyExtractor={(data, index) => index.toString()}
        />
      </View>
    );
  }
  /** BACKGROUND */
  renderBackground() {
    return <View style={styles.backgroundRed} />;
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <SafeAreaView>
        <StatusBarRed />
        {this.props.merchant.loadingGetSurveyList ? (
          <View style={{ height: '100%' }}>
            <LoadingPage />
          </View>
        ) : (
          <View style={{ height: '100%' }}>
            {this.renderBackground()}
            {this.renderContent()}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000
  },
  backgroundRed: {
    backgroundColor: Color.mainColor,
    height: 85
  },
  /** for content */
  menuContainer: {
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 5
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Color.backgroundWhite
  },
  cardInside: {
    borderWidth: 1,
    borderColor: masterColor.fontBlack10,
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cameraBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: masterColor.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
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
 * updatedDate: 16122020
 * updatedFunction:
 * -> add surveySerialId to param navigation.
 * updatedBy: dyah
 * updatedDate: 24022021
 * updatedFunction:
 *  -> Update the props of log activity.
 * updatedBy: dyah
 * updatedDate: 26022021
 * updatedFunction:
 * -> Update the props of post activity.
 * updatedBy: dyah
 * updatedDate: 08032021
 * updatedFunction:
 * -> Update validation for survey (componentDidUpdate).
 * updatedBy: dyah
 * updatedDate: 21042021
 * updatedFunction:
 * -> Delete componentDidUpdate in the screenn & delete function surveyDone().
 */

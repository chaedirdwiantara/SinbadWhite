import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  ScrollView
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import {
  LoadingPage,
  StatusBarWhite,
  ButtonSingle
} from '../../../library/component';
import { Fonts } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
import { Color } from '../../../config';
import _ from 'lodash';
import NavigationService from '../../../navigation/NavigationService';

class MerchantSurveyResultView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCollapse: false,
      activeIndexCollapse: 0,
      surveyResponse: {},
      surveyTotalScore: 0
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    let surveyResponseId = 109;
    this.props.merchantGetSurveyResponseProcess(surveyResponseId);
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.merchant.dataSurveyResponse !==
        this.props.merchant.dataSurveyResponse &&
      this.props.merchant.dataSurveyResponse.success
    ) {
      this.setState({
        surveyResponse:
          this?.props?.merchant?.dataSurveyResponse?.payload ?? null
      });
      this.setState({
        surveyTotalScore: this?.props?.merchant?.dataTotalScoreSurvey ?? null
      });
    }
  }

  /**
   * =======================
   * RENDER
   * =======================
   */

  /**
   * === RENDER HEADER OF DETAIL SCORE ===
   * @returns {ReactElement} render header of DETAIL SCORE.
   */
  renderDetailScoreHeader() {
    return (
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'center',
          paddingVertical: 20
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={Fonts.type23}>Responden</Text>
          <Text style={[Fonts.type4, { paddingTop: 4 }]}>
            {this.props.merchant.dataSurveyResult.storeName ?? '-'}
          </Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={Fonts.type23}>Total Skor</Text>
          <Text style={[Fonts.type4, { paddingTop: 4 }]}>
            {this.state.surveyTotalScore ?? '0'}
          </Text>
        </View>
      </View>
    );
  }
  /**
   * === RENDER DIVIDER ===
   * @returns {ReactElement} render line as divider.
   */
  renderDivider() {
    return (
      <View
        style={{
          borderBottomColor: Color.fontBlack10,
          borderBottomWidth: 1
        }}
      />
    );
  }
  /**
   * === RENDER  OF DETAIL SCORE CONTENT===
   * @returns {ReactElement} render header of detail score content.
   */
  renderDetailScoreContent() {
    return (
      <React.Fragment>
        <View
          style={{
            lineHeight: 16,
            paddingVertical: 16,
            paddingHorizontal: 16
          }}
        >
          <Text style={Fonts.textSurveyResult}>Detail Skor</Text>
        </View>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 16,
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            {this.renderCollapse()}
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
  /**
   * === RENDER COLLAPSE OF DETAIL SCORE ===
   * @returns {ReactElement} render collapse of detail score.
   * @memberof renderDetailScoreContent
   */
  renderCollapse() {
    return (
      <FlatList
        data={this.state.surveyResponse?.survey?.questions ?? []}
        keyExtractor={(data, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2 }}>
              <TouchableOpacity
                style={styles.boxCollapse}
                onPress={() =>
                  this.setState({
                    openCollapse: !this.state.openCollapse,
                    activeIndexCollapse: index
                  })
                }
              >
                <View>
                  {this.state.openCollapse &&
                  this.state.activeIndexCollapse === index ? (
                    <MaterialIcon
                      name="keyboard-arrow-up"
                      color={'#CACCCF'}
                      size={30}
                    />
                  ) : (
                    <MaterialIcon
                      name="keyboard-arrow-down"
                      color={'#CACCCF'}
                      size={30}
                    />
                  )}
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={[Fonts.type8, { marginBottom: 4.5 }]}>
                    Pertanyaan {index + 1}
                  </Text>
                  <View style={{ width: '80%' }}>
                    {this.state.openCollapse &&
                      this.state.activeIndexCollapse === index && (
                        <Text style={[Fonts.type8, { color: '#A0A4A8' }]}>
                          {item?.title ?? '-'}
                        </Text>
                      )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.boxScore}>
                <Text>{item?.questionResponseScore?.result ?? '-'}</Text>
              </View>
            </View>
          </View>
        )}
      />
    );
  }

  /**
   * === RENDER HEADER ===
   * @returns {ReactElement} render header.
   */
  renderHeader() {
    return (
      <View
        style={[
          styles.headerContainer,
          {
            paddingHorizontal: 16,
            borderTopColor: Color.fontGreen50,
            marginBottom: 16,
            flex: 0.5
          }
        ]}
      >
        <Text style={[Fonts.type4, { paddingLeft: 0 }]}>
          {this.state.surveyResponse?.survey?.name ?? '-'}
        </Text>
        <Text style={[Fonts.type23, { paddingTop: 4 }]}>
          {this.state.surveyResponse?.survey?.description ?? '-'}
        </Text>
        <View style={{ flexDirection: 'row', paddingVertical: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 17
            }}
          >
            <MaterialIcon
              name="bookmark"
              color={Color.fontBlack40}
              size={14}
              style={{ marginRight: 6 }}
            />
            <Text style={Fonts.type23}>
              {this.state.surveyResponse?.survey?.invoiceGroups.length > 0
                ? this.state.surveyResponse?.survey?.invoiceGroups.join(',')
                : ' - Tidak ada Invoice'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <MaterialIcon
              name="local-offer"
              color={Color.fontBlack40}
              size={14}
              style={{ marginRight: 6 }}
            />
            <Text style={Fonts.type23}>
              {this.state.surveyResponse?.survey?.brands.length > 0
                ? `${this.state.surveyResponse?.survey?.brands[0] ??
                    '-'}(+${this.state.surveyResponse?.survey?.brands.length -
                    1})`
                : '- Tidak ada Brand'}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  /**
   * === RENDER SECTION DETAIL SCORE ===
   * @returns {ReactElement} render section detail score.
   */
  renderDetailScore() {
    return (
      <View
        style={[styles.headerContainer, { flex: 2, flexDirection: 'column' }]}
      >
        {this.renderDetailScoreHeader()}
        {this.renderDivider()}
        {this.renderDetailScoreContent()}
      </View>
    );
  }
  /**
   * === RENDER BOTTOM BUTTON ===
   * @returns {ReactElement} render bottom button.
   */
  renderButton() {
    return (
      <View
        style={[
          styles.bottomButtonContainer,
          styles.headerContainer,
          {
            borderTopColor: 'none',
            marginTop: 16,
            flex: 0.5
          }
        ]}
      >
        <ButtonSingle
          disabled={false}
          title={'Kembali ke Daftar Tugas'}
          borderRadius={4}
          onPress={() =>
            NavigationService.navigate('MerchantHomeView', {
              readOnly: false
            })
          }
        />
      </View>
    );
  }

  /**
   * === RENDER CONTENT ===
   * @returns {ReactElement} render content.
   */
  renderContent() {
    return (
      <View style={{ height: '100%', flexDirection: 'column', padding: 16 }}>
        {this.renderHeader()}
        {this.renderDetailScore()}
        {this.renderButton()}
      </View>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <SafeAreaView>
        <StatusBarWhite />
        {Object.keys(this.state.surveyResponse).length === 0 ? (
          <View style={{ height: '100%' }}>
            <LoadingPage />
          </View>
        ) : (
          <View>{this.renderContent()}</View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 12,
    borderWidth: 1,
    borderTopWidth: 4,
    borderRadius: 4,
    borderColor: Color.fontBlack10
  },
  unAnsweredQuestionContainer: {
    backgroundColor: Color.fontYellow10,
    borderRadius: 4,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  /** for content */
  menuContainer: {
    paddingTop: 11,
    paddingBottom: 5
  },
  card: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Color.backgroundWhite
  },
  boxContentItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
    paddingTop: 12
  },
  notBaseContainer: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: Color.fontBlack10,
    borderRadius: 4,
    padding: 12
  },
  finishButton: {
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.mainColor,
    borderWidth: 1,
    borderRadius: 24,
    padding: 8,
    paddingHorizontal: 12
  },
  boxCollapse: {
    paddingRight: 15,
    paddingVertical: 10,
    flexDirection: 'row'
  },
  boxScore: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#CACCCF',
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: '15%'
  }
});

const mapStateToProps = ({ auth, merchant, user, permanent }) => {
  return { auth, merchant, user, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantSurveyResultView);

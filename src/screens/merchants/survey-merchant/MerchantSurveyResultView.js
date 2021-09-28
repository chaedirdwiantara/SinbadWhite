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
  ButtonSingle,
  ModalBottomErrorRespons
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
      openModalErrorGlobal: false
    };
  }

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    const { surveyResponseId, surveyId } = this.props.navigation.state.params;

    this.props.merchantGetSurveyBrandProcess(surveyId);
    this.props.merchantGetSurveyResponseProcess(surveyResponseId);
  }

  componentDidUpdate() {
    // if failed show modal error
    if (this.props.merchant.errorGetSurveyResponse) {
      if (
        prevProps.merchant.errorGetSurveyResponse !==
          this.props.merchant.errorGetSurveyResponse ||
        prevProps.merchant.errorGetSurveyBrand !==
          this.props.merchant.errorGetSurveyBrand
      ) {
        this.setState({ openModalErrorGlobal: true });
      }
    }
  }

  /**
   *  === CONVERT BRAND AND INVOICE  ===
   * @param {array} value data of brand/invoice
   * @param {string} type type "brand" or "invoce" to specify the attribute.
   * @returns {callback} return string to show brand or invoice.
   */
  convertBrandAndInvoice = (value, type) => {
    if (value?.length >= 1) {
      if (value.length === 1) {
        if (type === 'invoice') {
          return `${value[0].invoiceGroupName}`;
        }
        return `${value[0].brandName}`;
      } else {
        if (type === 'invoice') {
          return `${value[0].invoiceGroupName} (+${value.length - 1} Other)`;
        }
        return `${value[0].brandName} (+${value.length - 1} Other)`;
      }
    }
    return '-';
  };

  /**
   * =======================
   * RENDER
   * =======================
   */
  /**
   *  === RENDER MODAL ERROR RESPONSE  ===
   * @returns {ReactElement} render modal if error from be
   * @memberof renderModalError
   */
  renderModalErrorResponse() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        statusBarType={'transparent'}
        open={this.state.openModalErrorGlobal}
        onPress={this.setState({ openModalErrorGlobal: false })}
      />
    ) : (
      <View />
    );
  }
  /**
   * === RENDER STORE NAME ===
   * @returns {ReactElement} render store name
   */
  renderStoreName() {
    const { dataSurveyResult } = this.props.merchant;
    if (dataSurveyResult.storeName.length >= 30) {
      return dataSurveyResult.storeName.substring(0, 30) + '...';
    } else {
      return dataSurveyResult.storeName;
    }
  }
  /**
   * === RENDER HEADER OF DETAIL SCORE ===
   * @returns {ReactElement} render header of DETAIL SCORE.
   */
  renderDetailScoreHeader() {
    const { dataTotalScoreSurvey } = this.props.merchant;
    return (
      <View
        style={{
          flex: 0.9,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'center',
          paddingHorizontal: 10
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={Fonts.textHeaderPageSurveyResult}>Responden</Text>
          <Text
            style={[Fonts.textSubHeaderPageSurveyResult, { paddingTop: 4 }]}
          >
            {this.renderStoreName()}
          </Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={Fonts.textHeaderPageSurveyResult}>Total Skor</Text>
          <Text
            style={[Fonts.textSubHeaderPageSurveyResult, { paddingTop: 4 }]}
          >
            {dataTotalScoreSurvey ?? '0'}
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
              flex: 1,
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
    const dataSurveyResponse = this.props.merchant.dataSurveyResponse.payload;
    return (
      <View style={{ paddingBottom: 5, flex: 1 }}>
        <FlatList
          data={dataSurveyResponse?.survey?.questions ?? []}
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
                  <Text>{item.questionResponseScore?.result ?? '0'}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  /**
   * === RENDER HEADER ===
   * @returns {ReactElement} render header.
   */
  renderHeader() {
    const dataSurveyResponse = this.props.merchant.dataSurveyResponse.payload;
    const dataGetSurveyBrand = this.props.merchant.dataGetSurveyBrand;

    return (
      <View
        style={[
          styles.headerContainer,
          {
            paddingHorizontal: 16,
            borderTopColor: Color.fontGreen50,
            marginBottom: 16,
            paddingBottom: '5%',
            flex: 0.5
          }
        ]}
      >
        <Text style={[Fonts.type4, { paddingLeft: 0, width: '90%' }]}>
          {dataSurveyResponse?.survey?.name || '-'}
        </Text>
        <Text style={[Fonts.type23, { paddingTop: 4 }]}>
          {dataSurveyResponse?.survey?.description || '-'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            paddingVertical: 12
          }}
        >
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
              {this.convertBrandAndInvoice(
                dataSurveyResponse?.survey?.invoiceGroups,
                'invoice'
              )}
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
              {this.convertBrandAndInvoice(dataGetSurveyBrand, 'brand')}
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
        style={[styles.headerContainer, { flex: 1.9, flexDirection: 'column' }]}
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
    const { dataSurveyResult } = this.props.merchant;
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
              storeName: dataSurveyResult.storeName ?? '-'
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
        {this.props.merchant.loadingGetSurveyResponse ||
        this.props.merchant.loadingGetSurveyBrand ? (
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

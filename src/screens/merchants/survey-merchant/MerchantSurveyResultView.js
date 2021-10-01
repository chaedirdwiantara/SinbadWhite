import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  ScrollView,
  BackHandler
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
      activeIndexCollapse: -1,
      openModalErrorGlobal: false
    };
  }

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /**
   * === BACK ACTION ===
   * @returns {boolean} true & navigate to survey list.
   */
  backAction = () => {
    NavigationService.navigate('MerchantSurveyView');
    return true;
  };
  /** === DID MOUNT === */
  componentDidMount() {
    const { surveyResponseId, surveyId } = this.props.navigation.state.params;

    this.props.merchantGetSurveyBrandProcess(surveyId);
    this.props.merchantGetSurveyResponseProcess(surveyResponseId);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction
    );
  }
  /** === WILL UNMOUNT === */
  componentWillUnmount() {
    this.backHandler.remove();
  }
  /** === DID UPDATE === */
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
          flex: 1.5,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'center',
          paddingTop: 40,
          paddingBottom: 40,
          paddingHorizontal: 10,
          borderBottomColor: Color.fontBlack10,
          borderBottomWidth: 1
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
   * === RENDER  OF DETAIL SCORE CONTENT===
   * @returns {ReactElement} render header of detail score content.
   */
  renderDetailScoreContent() {
    return (
      <React.Fragment>
        <View
          style={{
            paddingVertical: 14,
            paddingHorizontal: 14
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
          data={_.orderBy(dataSurveyResponse?.survey?.questions ?? [], [
            'order'
          ])}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 2 }}>
                <TouchableOpacity
                  style={styles.boxCollapse}
                  onPress={() =>
                    this.setState({
                      activeIndexCollapse: index
                    })
                  }
                >
                  <View>
                    {this.state.activeIndexCollapse === index ? (
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
                      {this.state.activeIndexCollapse === index && (
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
                  <Text>{item.questionResponseScore?.score ?? '0'}</Text>
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
            paddingTop: 12,
            marginHorizontal: 16,
            marginTop: 16,
            paddingHorizontal: 16,
            borderTopColor: Color.fontGreen50,
            marginBottom: 10,
            paddingBottom: '5%',
            flex: 0.7,
            borderTopWidth: 4,
            borderWidth: 1
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
        style={[
          styles.headerContainer,
          {
            flex: 2,
            flexDirection: 'column',
            marginHorizontal: 16,
            borderWidth: 1
          }
        ]}
      >
        {this.renderDetailScoreHeader()}
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
          styles.headerContainer,
          {
            borderTopColor: 'none',
            marginTop: 10,
            marginBottom: 10,
            flex: 0.5,
            justifyContent: 'center',
            shadowColor: 'none',
            borderTopWidth: 1
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
      <View style={{ height: '100%', flexDirection: 'column' }}>
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
    paddingBottom: 12,
    borderRadius: 4,
    borderColor: Color.fontBlack10
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

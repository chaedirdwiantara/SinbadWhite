import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  Modal,
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import {
  LoadingPage,
  StatusBarWhite,
  ModalConfirmationType5,
  ModalBottomErrorRespons
} from '../../../library/component';
import { Fonts } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import QuestionListDataView from './QuestionListDataView';
import _ from 'lodash';

class MerchantQuestionnaireView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalConfirmationFinish: false,
      modalConfirmationSave: false,
      review: false,
      questions: [],
      unAnswered: [],
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
    const { surveyId, surveyResponseId } = this.props.navigation.state.params;
    let responseId = '';
    if (surveyResponseId) responseId = `?responseId=${surveyResponseId}`;
    this.props.merchantGetSurveyProcess({
      id: surveyId,
      responseId
    });
    this.props.merchantGetSurveyBrandProcess(surveyId);

    /**SET NAVIGATION FUNCTION */
    this.setNavigationParams();
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    // check success or not (get survey)
    if (this.props.merchant.dataGetSurvey) {
      if (
        prevProps.merchant.dataGetSurvey !== this.props.merchant.dataGetSurvey
      ) {
        let newQuestions = [];
        const orderedQuestions = _.orderBy(
          this.props.merchant.dataGetSurvey.questions,
          ['order']
        );
        orderedQuestions.map(item => {
          // calculate the total of candidate answer
          let totalCandidateAnswerMax;
          let value = [];
          if (
            item.scoreType.code === 'single_score' ||
            item.scoreType.code === 'cumulative_score'
          ) {
            totalCandidateAnswerMax = 1;
          } else {
            totalCandidateAnswerMax = item.candidateAnswer.length;
          }
          item.candidateAnswer.map(candidate => {
            // check if answersResponse already inputed
            if (candidate.answersResponse) {
              const isBaseValue = candidate.isBaseValue ? true : false;
              value.push({
                candidateAnswerId: candidate.id,
                inputValue: candidate.answersResponse.inputValue,
                isBaseValue
              });
            }
          });
          // add questions to local state
          newQuestions.push({
            questionId: item.id,
            scoreTypeId: item.scoreType.id,
            required: item.required,
            totalCandidateAnswerMax,
            value
          });
        });
        this.setState({ questions: newQuestions });
      }
    }
    const dataSubmitSurveyResponse = this.props.merchant
      .dataSubmitSurveyResponse.payload;
    // check the data submit (if success)
    if (dataSubmitSurveyResponse) {
      if (
        prevProps.merchant.dataSubmitSurveyResponse.payload !==
        dataSubmitSurveyResponse
      ) {
        this.props.merchantGetSurveyListReset();
        this.props.merchantGetSurveyListProcess({
          storeId: this.props.merchant.selectedMerchant.storeId,
          loading: true,
          page: 1,
          length: 10
        });
        if (dataSubmitSurveyResponse.status === 'completed') {
          /** FOR GET TOTAL SURVEY */
          this.props.merchantGetTotalSurveyProcess(
            this.props.merchant.selectedMerchant?.storeId
          );
          // if success with status 'completed' navigate to success screen
          return NavigationService.navigate('SuccessSubmit', {
            surveyResponseId: dataSubmitSurveyResponse.id,
            surveyId: dataSubmitSurveyResponse.survey?.id,
            surveyName: dataSubmitSurveyResponse.survey?.name,
            caption: `Terima kasih sudah menyelesaikan "${dataSubmitSurveyResponse
              .survey.name ?? '-'}".`
          });
        } else {
          // if success with status 'inProgress' back to survey list
          return NavigationService.goBack();
        }
      }
    }
    // show modal error when failed get survey
    if (this.props.merchant.errorGetSurvey) {
      if (
        prevProps.merchant.errorGetSurvey !== this.props.merchant.errorGetSurvey
      ) {
        this.setState({ openModalErrorGlobal: true });
      }
    }
    // show modal error when failed get survey brands
    if (this.props.merchant.errorGetSurveyBrand) {
      if (
        prevProps.merchant.errorGetSurveyBrand !==
        this.props.merchant.errorGetSurveyBrand
      ) {
        this.setState({ openModalErrorGlobal: true });
      }
    }
    // show modal error when failed submit survey
    if (this.props.merchant.errorSubmitSurveyResponse) {
      if (
        prevProps.merchant.errorSubmitSurveyResponse !==
        this.props.merchant.errorSubmitSurveyResponse
      ) {
        this.setState({ openModalErrorGlobal: true });
      }
    }
  }

  /**
   *  === SET NAVIGATION PARAMS ===
   * @returns {callback} set param (function & state) to navigation.
   */
  setNavigationParams = () => {
    this.props.navigation.setParams({
      checkRequiredAnswers: this.checkRequiredAnswers,
      submitQuestionnaire: this.submitQuestionnaire,
      setModalConfirmationSave: this.setModalConfirmationSave,
      review: this.state.review
    });
  };

  /**
   *  === CHECK UNANSWERED QUESTION  ===
   * @param {number} id survey id
   * @returns {callback} object/undefined unanswered "required" question.
   */
  checkUnAnsweredRequiredQuestion = id => {
    return this.state.unAnswered.find(item => item.questionId === id);
  };

  /**
   *  === CHECK REQUIRED ANSWER  ===
   * @returns {callback} array of unanswered "required" question or show modal confirmation finish taking survey.
   */
  checkRequiredAnswers = () => {
    // check there's a value or not in the question.
    const emptyValue = _.isEmpty(
      this.state.questions.filter(item => item.value.length > 0)
    );
    const checkUnRequiredQuestion = this.state.questions.filter(
      item => !item.required
    ).length;
    const allUnRequiredQuestion =
      this.state.questions.length === checkUnRequiredQuestion;
    if (emptyValue && allUnRequiredQuestion) {
      return null;
    }

    // filter the required answer
    const requiredAnswer = this.state.questions.filter(item => item.required);
    let unAnswered = [];
    // check total of value(answer) that less than totalCandidateAnswerMax (required question)
    if (
      requiredAnswer.find(
        item => item.value.length < item.totalCandidateAnswerMax
      )
    ) {
      // get the unanswered question (required)
      unAnswered = requiredAnswer.filter(
        item => item.value.length < item.totalCandidateAnswerMax
      );
    }
    // check length of input (required) to make sure the length of answer not 0.
    requiredAnswer.map(item => {
      item.value.map(input => {
        if (input.inputValue.length === 0) {
          // get the unanswered question (required)
          unAnswered.push(item);
        }
      });
    });
    // if there's required question still empty give info
    if (unAnswered.length > 0) {
      return this.setState({ unAnswered });
    }
    return this.setState({ modalConfirmationFinish: true, unAnswered: [] });
  };

  /**
   *  === SUBMIT QUESTIONNAIRE  ===
   * @param {string} status status of response ("completed" or "inProgress")
   * @returns {callback} array of unanswered "required" question or show modal confirmation finish taking survey.
   */
  submitQuestionnaire = status => {
    // check if user didn't fill the survey yet
    if (
      status === 'inProgress' &&
      !this.state.questions.find(item => item.value.length > 0)
    ) {
      return NavigationService.goBack();
    }
    // CHECK UNREQUIRED QUESTION
    // if all required question already inputed (collect the answer)
    let answers = [];
    this.state.questions.map(item => {
      if (item.required) {
        if (item.value.length > 0) {
          answers.push({
            scoreTypeId: item.scoreTypeId,
            id: item.questionId,
            response: item.value
          });
        }
      } else {
        // check the not required question
        let totalValue = 0;
        // check the length of value (answer)
        if (item.value.length >= item.totalCandidateAnswerMax) {
          item.value.map(input => {
            // calculate the input that not empty
            if (input.inputValue.length !== 0) {
              totalValue += 1;
            }
          });
          // if totalValue same with totalCandidateAnswerMax assign to answer
          if (
            totalValue >= item.totalCandidateAnswerMax ||
            (totalValue < item.totalCandidateAnswerMax &&
              status === 'inProgress')
          ) {
            answers.push({
              scoreTypeId: item.scoreTypeId,
              id: item.questionId,
              response: item.value
            });
          }
        } else {
          if (status === 'inProgress') {
            item.value.map(input => {
              if (input.inputValue.length > 0) {
                answers.push({
                  scoreTypeId: item.scoreTypeId,
                  id: item.questionId,
                  response: item.value
                });
              }
            });
          }
        }
      }
    });
    const { surveyResponseId, typeId } = this.props.navigation.state.params;
    // send request
    const params = {
      surveyId: this.props.merchant.dataGetSurvey?.id,
      storeId: this.props.merchant.selectedMerchant.storeId,
      surveyQuestionId: 1,
      status,
      typeId,
      photos: [],
      questions: answers
    };
    if (surveyResponseId) {
      return this.props.merchantUpdateSurveyResponseProcess({
        params,
        surveyResponseId
      });
    }
    return this.props.merchantSubmitSurveyResponseProcess(params);
  };
  /**
   *  === SET MODAL CONFIRMATION SAVE  ===
   * @param {boolean} value state of the modal confirmation save.
   * @returns {callback} show or hide the modal confirmation save. (when click goBack)
   */
  setModalConfirmationSave = value => {
    this.setState({ modalConfirmationSave: value });
  };
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
   * === HEADER MODIFY  ===
   * @returns {ReactElement} render finish button, goBack, and send button.
   */
  static navigationOptions = ({ navigation }) => {
    const checkRequiredAnswers = navigation.getParam('checkRequiredAnswers');
    const submitQuestionnaire = navigation.getParam('submitQuestionnaire');
    const setModalConfirmationSave = navigation.getParam(
      'setModalConfirmationSave'
    );
    let review;
    if (navigation.state.params) {
      review = navigation.state.params.review;
    }

    const finishButton = () => {
      return (
        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => (checkRequiredAnswers ? checkRequiredAnswers() : null)}
        >
          <Text style={Fonts.type21}>Selesai</Text>
        </TouchableOpacity>
      );
    };

    const sendButton = () => {
      return (
        <TouchableOpacity
          style={[
            styles.finishButton,
            { backgroundColor: Color.fontGreen50, borderWidth: 0 }
          ]}
          onPress={() => {
            submitQuestionnaire ? submitQuestionnaire('completed') : null;
          }}
        >
          <MaterialIcon
            name="check-circle"
            color={Color.fontWhite}
            size={14}
            style={{ marginRight: 6 }}
          />
          <Text style={Fonts.type25}>Kirim</Text>
        </TouchableOpacity>
      );
    };

    return {
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            setModalConfirmationSave ? setModalConfirmationSave(true) : null
          }
        >
          <MaterialIcon
            name="arrow-back"
            color={Color.fontBlack80}
            size={24}
            style={{ marginLeft: 16 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (review ? sendButton() : finishButton())
    };
  };

  /**
   * === RENDER HEADER QUESTIONNAIRE  ===
   * @returns {ReactElement} render header questionnaire (title, desc, etc).
   */
  renderHeaderQuestionnaire() {
    const { dataGetSurvey, dataGetSurveyBrand } = this.props.merchant;
    return (
      <View
        style={[
          styles.headerContainer,
          { flex: 1, flexWrap: 'wrap', paddingBottom: '5%' }
        ]}
      >
        <Text style={[Fonts.type4, { width: '90%' }]}>
          {dataGetSurvey?.name || '-'}
        </Text>
        <Text style={[Fonts.type23, { paddingTop: 4, width: '90%' }]}>
          {dataGetSurvey?.description || '-'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 12,
            flex: 1,
            flexWrap: 'wrap'
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
                dataGetSurvey?.invoiceGroups,
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
        <Text style={Fonts.type9}>
          ( <Text style={{ color: Color.mainColor }}> *</Text> Wajib untuk
          diisi)
        </Text>
      </View>
    );
  }
  /**
   * === RENDER QUESTION LIST  ===
   * @returns {ReactElement} render list of question.
   */
  renderQuestionList() {
    return (
      <QuestionListDataView
        questions={this.state.questions}
        review={this.state.review}
        updateQuestion={newQuestions =>
          this.setState({ questions: newQuestions })
        }
        onEdit={() =>
          this.setState({ review: false }, () => this.setNavigationParams())
        }
        checkUnAnsweredRequiredQuestion={value =>
          this.checkUnAnsweredRequiredQuestion(value)
        }
      />
    );
  }
  /**
   * === RENDER CONTENT ITEM ===
   * @returns {ReactElement} render item of content (header & list of question).
   */
  renderContentItem() {
    return (
      <View style={{ padding: 16 }}>
        {this.renderHeaderQuestionnaire()}
        {this.renderQuestionList()}
      </View>
    );
  }
  /**
   * === RENDER CONTENT ===
   * @returns {ReactElement} render content.
   */
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
  /**
   * === RENDER MODAL FINISH QUESTIONNAIRE ===
   * @returns {ReactElement} modal after click finish button.
   */
  renderModalFinish() {
    return (
      <ModalConfirmationType5
        statusBarWhite
        title={'Selesai mengisi survei?'}
        open={this.state.modalConfirmationFinish}
        content={'Pastikan jawaban yang Anda pilih sudah sesuai.'}
        okText={'Selesai'}
        cancelText={'Kembali'}
        ok={() => {
          this.setState({ modalConfirmationFinish: false, review: true }, () =>
            this.setNavigationParams()
          );
        }}
        cancel={() => this.setState({ modalConfirmationFinish: false })}
      />
    );
  }
  /**
   * === RENDER MODAL SAVE ANSWER QUESTIONNAIRE ===
   * @returns {ReactElement} modal after click goback.
   */
  renderModalSaveAnswer() {
    return (
      <ModalConfirmationType5
        statusBarWhite
        title={'Keluar dari survei?'}
        open={this.state.modalConfirmationSave}
        type={'okeNotRed'}
        content={'Jawaban yang sudah dimasukkan akan tetap tersimpan.'}
        okText={'Keluar'}
        cancelText={'Lanjutkan'}
        ok={() =>
          this.setState({ modalConfirmationSave: false }, () =>
            this.submitQuestionnaire('inProgress')
          )
        }
        cancel={() => this.setState({ modalConfirmationSave: false })}
      />
    );
  }
  /**
   * === RENDER MODAL LOADING ===
   * @returns {ReactElement} modal after submit button (send request).
   */
  renderModalLoading() {
    return (
      <Modal isVisible={this.props.merchant.loadingSubmitSurveyResponse}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../../assets/gif/loading/load_triagle.gif')}
            style={{ height: 80, width: 80 }}
          />
        </View>
      </Modal>
    );
  }
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
        onPress={() => this.setState({ openModalErrorGlobal: false })}
      />
    ) : (
      <View />
    );
  }
  /** ===================== */
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView>
        <StatusBarWhite />
        {this.props.merchant.loadingGetSurvey ||
        this.props.merchant.loadingGetSurveyBrand ? (
          <View style={{ height: '100%' }}>
            <LoadingPage />
          </View>
        ) : (
          <View style={{ height: '100%' }}>{this.renderContent()}</View>
        )}
        {/* MODAL */}
        {this.renderModalFinish()}
        {this.renderModalSaveAnswer()}
        {this.renderModalLoading()}
        {this.renderModalErrorResponse()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 12,
    borderWidth: 1,
    borderTopWidth: 4,
    borderRadius: 4,
    borderColor: Color.fontBlack10,
    borderTopColor: Color.fontGreen50
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
  finishButton: {
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.mainColor,
    borderWidth: 1,
    borderRadius: 24,
    padding: 8,
    paddingHorizontal: 12
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
)(MerchantQuestionnaireView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 06092021
 * updatedBy: dyah
 * updatedDate: 04102021
 * updatedFunction:
 * -> update validation when submit questionnaire (status: completed)
 */

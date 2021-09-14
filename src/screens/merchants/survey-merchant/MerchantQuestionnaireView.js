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
import { questions } from './mockData';
import NavigationService from '../../../navigation/NavigationService';
import QuestionListDataView from './QuestionListDataView';

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
    let newQuestions = [];
    questions.map(item => {
      // calculate the total of candidate answer
      let totalCandidateAnswerMax;
      if (
        item.surveyScoreType.code === 'single_score' ||
        item.surveyScoreType.code === 'cumulative_score'
      ) {
        totalCandidateAnswerMax = 1;
      } else {
        totalCandidateAnswerMax = item.surveyCandidateAnswer.length;
      }
      // add questions to local state
      newQuestions.push({
        surveyId: item.surveyId,
        required: item.required,
        totalCandidateAnswerMax,
        value: []
      });
    });
    this.setState({ questions: newQuestions });

    /**SET NAVIGATION FUNCTION */
    this.setNavigationParams();
  }

  componentDidUpdate(prevProps) {
    // if success with status 'completed' navigate to success screen
    // if success with status 'inProgress' back to survey list
    // if failed show toast
    if (this.props.merchant.errorSubmitSurvey) {
      if (
        prevProps.merchant.errorSubmitSurvey !==
        this.props.merchant.errorSubmitSurvey
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
    return this.state.unAnswered.find(item => item.surveyId === id);
  };

  /**
   *  === CHECK REQUIRED ANSWER  ===
   * @returns {callback} array of unanswered "required" question or show modal confirmation finish taking survey.
   */
  checkRequiredAnswers = () => {
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
    } else {
      // check length of input (required) to make sure the length of answer not 0.
      requiredAnswer.map(item => {
        item.value.map(input => {
          if (input.inputValue.length === 0) {
            // get the unanswered question (required)
            unAnswered.push(item);
          }
        });
      });
    }
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
    // CHECK UNREQUIRED QUESTION
    // if all required question already inputed (collect the answer)
    let answers = [];
    this.state.questions.map(item => {
      if (item.required) {
        item.value.map(input => answers.push(input)); //  data for request
      } else {
        // check the not required question
        let totalValue = 0;
        // check the length of value (answer)
        if (item.value.length === item.totalCandidateAnswerMax) {
          item.value.map(input => {
            // calculate the input that not empty
            if (input.inputValue.length !== 0) {
              totalValue += 1;
            }
          });
          // if totalValue same with totalCandidateAnswerMax assign to answer
          if (totalValue === item.totalCandidateAnswerMax) {
            item.value.map(input => answers.push(input)); //  data for request
          }
        }
      }
    });
    // send request
    const payload = {
      surveyId: this.props.navigation.state.params.surveyId,
      storeId: this.props.merchant.selectedMerchant.storeId,
      status,
      photos: [],
      questions: [
        {
          id: 1,
          scoreType: 1,
          response: answers
        }
      ]
    };
    console.log('payload', payload);
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
            NavigationService.navigate('SuccessSubmit', {
              surveyName: 'Coba Survey'
            });
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
    return (
      <View style={styles.headerContainer}>
        <Text style={Fonts.type4}>Survey Exclusive Danone September</Text>
        <Text style={[Fonts.type23, { paddingTop: 4 }]}>
          Cek Store Performance
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
            <Text style={Fonts.type23}>Exclusive Danone</Text>
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
            <Text style={Fonts.type23}>SGM (+1 Other)</Text>
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
        ok={() => this.submitQuestionnaire('inProgress')}
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
      <Modal isVisible={this.props.merchant.loadingSubmitSurvey}>
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
        onPress={() =>
          this.setState({ openModalErrorGlobal: false }, () =>
            this.submitQuestionnaire()
          )
        }
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
        {this.props.merchant.loadingGetSurveyList ? (
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
 * updatedDate: 13092021
 * updatedFunction:
 * -> update take survey code (separate the question list)
 */

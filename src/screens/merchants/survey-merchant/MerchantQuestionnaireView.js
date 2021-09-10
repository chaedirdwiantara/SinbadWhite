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
import {
  LoadingPage,
  StatusBarWhite,
  InputType7,
  RadioButton,
  ModalConfirmation,
  CheckBox
} from '../../../library/component';
import { Fonts } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
import { Color } from '../../../config';
import _ from 'lodash';
import { questions } from './mockData';
import NavigationService from '../../../navigation/NavigationService';

class MerchantQuestionnaireView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalConfirmation: false,
      review: false,
      questions: [],
      unAnswered: []
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

  /**SET NAVIGATION PARAMS */
  setNavigationParams = () => {
    this.props.navigation.setParams({
      checkRequiredAnswers: this.checkRequiredAnswers,
      submitQuestionnaire: this.submitQuestionnaire,
      review: this.state.review
    });
  };

  /** === UPDATE/SELECT ANSWER === */
  selectAnswer = (candidateAnswerId, survey) => {
    let newQuestions = this.state.questions;
    // find the index of question
    const index = newQuestions.findIndex(
      item => item.surveyId === survey.surveyId
    );
    if (survey.category === 'single_answer') {
      newQuestions[index].value = [
        { candidateAnswerId, inputValue: 'checked' }
      ];
    } else if (survey.category === 'multiple_answer') {
      // check the answer already selected or not (checkbox)
      const alreadySelected = newQuestions[index].value.find(
        item => item.candidateAnswerId === candidateAnswerId
      );
      // if alreadySelected, delete the value from the answer
      if (alreadySelected) {
        newQuestions[index].value = newQuestions[index].value.filter(
          answer => answer.candidateAnswerId !== candidateAnswerId
        );
      } else {
        // if not, add the value to the answer
        newQuestions[index].value.push({
          candidateAnswerId,
          inputValue: 'checked'
        });
      }
    } else if (survey.category === 'vc_basic') {
      // check the answer already inputed or not (input)
      const alreadyInputed = newQuestions[index].value.findIndex(
        item => item.candidateAnswerId === candidateAnswerId
      );
      // if alreadyInputed, change the value of the answer
      if (alreadyInputed > -1) {
        newQuestions[index].value[alreadyInputed] = {
          candidateAnswerId,
          inputValue: survey.inputValue
        };
      } else {
        // if not, add the value to the answer
        newQuestions[index].value.push({
          candidateAnswerId,
          inputValue: survey.inputValue
        });
      }
    }
    // update the answer of the question
    this.setState({ questions: newQuestions });
  };

  /** === CHECK SELECTED ANSWER (for radio button & check box) === */
  checkSelectedAnswers = (survey, candidateAnswerId) => {
    if (this.state.questions.length > 0) {
      // find the question
      const value = this.state.questions.find(
        item => item.surveyId === survey.surveyId
      ).value;
      // check the category & the value
      if (survey.category === 'single_answer') {
        if (value[0]) return value[0].candidateAnswerId;
      } else if (survey.category === 'multiple_answer') {
        if (value.length > 0) {
          return value.find(
            item => item.candidateAnswerId === candidateAnswerId
          );
        }
      }
    }
  };

  /** === CHECK UNANSWERED QUESTION (after click selesai) === */
  checkUnAnsweredQuestion = id => {
    return this.state.unAnswered.find(item => item.surveyId === id);
  };

  /** === CHECK REQUIRED ANSWER === */
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
    this.setState({ modalConfirmation: true, unAnswered: [] });
  };

  /** === SUBMIT QUESTIONNAIRE === */
  submitQuestionnaire = status => {
    // CHECK UNREQUIRED QUESTION
    // value === total candidate answers
    // inputValue !== 0
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
      surveyStepId: 1,
      storeId: this.props.merchant.selectedMerchant.storeId,
      status,
      answers
    };
    console.log('payload', payload);
  };
  /** === CHECK RENDER PER CATEGORY & TYPE === */
  renderPerCategoryAndType = item => {
    const {
      surveyQuestionCategory,
      surveyScoreType,
      surveyCandidateAnswer,
      surveyId
    } = item;
    switch (surveyQuestionCategory.code) {
      case 'single_answer':
        if (surveyScoreType.code === 'single_score') {
          return this.renderSingleAnswer(
            _.orderBy(surveyCandidateAnswer, ['order']),
            surveyId
          );
        }
        break;
      case 'multiple_answer':
        if (surveyScoreType.code === 'single_score') {
          return surveyCandidateAnswer.map(candidate =>
            this.renderMultiSingleAnswer(candidate, surveyId)
          );
        } else if (surveyScoreType.code === 'cumulative_score') {
          return surveyCandidateAnswer.map(candidate =>
            this.renderMultiCumulativeAnswer(candidate, surveyId)
          );
        }
        break;
      case 'vc_basic':
        if (surveyScoreType.code === 'range_score') {
          return surveyCandidateAnswer.map(candidate =>
            this.renderBasicRangeAnswer(candidate, surveyId)
          );
        }
        break;
      case 'vc_compare_group':
        if (surveyScoreType.code === 'range_score') {
          return this.renderCompareGroupRangeAnswer(
            surveyCandidateAnswer,
            surveyId
          );
        }
        break;
      default:
        break;
    }
  };
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const checkRequiredAnswers = navigation.getParam('checkRequiredAnswers');
    const submitQuestionnaire = navigation.getParam('submitQuestionnaire');
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
      headerRight: () => (review ? sendButton() : finishButton())
    };
  };

  /**
   * =======================
   * RENDER
   * =======================
   */
  /** === RENDER FOR SINGLE ANSWER x SINGLE SCORE === */
  renderSingleAnswer = (candidateAnswer, surveyId) => {
    return (
      <RadioButton
        data={candidateAnswer}
        disabled={this.state.review}
        onSelect={item =>
          this.selectAnswer(item.id, { surveyId, category: 'single_answer' })
        }
        selected={this.checkSelectedAnswers({
          surveyId,
          category: 'single_answer'
        })}
      />
    );
  };

  /** === RENDER FOR MULTIPLE ANSWER x SINGLE SCORE === */
  renderMultiSingleAnswer = (item, surveyId) => {
    return (
      <CheckBox
        key={'multi-single-ans-' + item.id}
        disabled={this.state.review}
        onSelect={() =>
          this.selectAnswer(item.id, {
            surveyId,
            category: 'multiple_answer'
          })
        }
        selected={this.checkSelectedAnswers(
          {
            surveyId,
            category: 'multiple_answer'
          },
          item.id
        )}
        label={item.title}
      />
    );
  };

  /** === RENDER FOR MULTIPLE ANSWER x CUMULATIVE SCORE === */
  renderMultiCumulativeAnswer = (item, surveyId) => {
    return (
      <CheckBox
        key={'multi-cum-ans-' + item.id}
        disabled={this.state.review}
        onSelect={() =>
          this.selectAnswer(item.id, {
            surveyId,
            category: 'multiple_answer'
          })
        }
        selected={this.checkSelectedAnswers(
          {
            surveyId,
            category: 'multiple_answer'
          },
          item.id
        )}
        label={item.title}
      />
    );
  };

  /** === RENDER FOR VC BASIC x RANGE SCORE === */
  renderBasicRangeAnswer = (item, surveyId) => {
    return (
      <View key={'basic-range-ans-' + item.id}>
        <View style={styles.boxContentItem}>
          <Text style={Fonts.type23}>{item.title}</Text>
          <View style={{ width: '40%' }}>
            <InputType7
              editable={!this.state.review}
              placeholder="Input disini"
              max={100}
              min={1}
              keyboardType="numeric"
              text={inputValue =>
                this.selectAnswer(item.id, {
                  surveyId,
                  category: 'vc_basic',
                  inputValue
                })
              }
            />
          </View>
        </View>
      </View>
    );
  };

  /** === RENDER FOR VC GROUP x RANGE SCORE === */
  renderCompareGroupRangeAnswer = (item, surveyId) => {
    return (
      <View>
        {_.orderBy(item, ['order'])
          .filter(candidate => candidate.isBaseValue)
          .map(candidate => (
            <View key={'base-' + candidate.id} style={styles.boxContentItem}>
              <Text style={Fonts.type23}>{candidate.title}</Text>
              <View style={{ width: '40%' }}>
                <InputType7
                  editable={!this.state.review}
                  placeholder="Input disini"
                  keyboardType="numeric"
                  max={100}
                  min={1}
                  text={inputValue =>
                    this.selectAnswer(item.id, {
                      surveyId,
                      category: 'vc_basic',
                      inputValue
                    })
                  }
                />
              </View>
            </View>
          ))}
        <View style={styles.notBaseContainer}>
          <Text style={Fonts.type83}>Bandingkan dengan:</Text>
          {_.orderBy(item, ['order'])
            .filter(candidate => !candidate.isBaseValue)
            .map(candidate => (
              <View
                key={'not-base-' + candidate.id}
                style={styles.boxContentItem}
              >
                <Text style={Fonts.type23}>{candidate.title}</Text>
                <View style={{ width: '40%' }}>
                  <InputType7
                    editable={!this.state.review}
                    placeholder="Input disini"
                    keyboardType="numeric"
                    text={inputValue =>
                      this.selectAnswer(candidate.id, {
                        surveyId,
                        category: 'vc_basic',
                        inputValue
                      })
                    }
                  />
                </View>
              </View>
            ))}
        </View>
      </View>
    );
  };

  /** === RENDER QUESTION === */
  renderUnAnsweredQuestion = () => {
    return (
      <View style={styles.unAnsweredQuestionContainer}>
        <MaterialIcon
          name="info"
          color={Color.fontYellow50}
          size={16}
          style={{ marginRight: 6 }}
        />
        <Text style={Fonts.type109p}>Pertanyaan ini belum dilengkapi</Text>
      </View>
    );
  };

  /** === RENDER QUESTION === */
  renderQuestion(item, index) {
    return (
      <View style={[styles.menuContainer]}>
        <View
          style={[
            styles.card,
            {
              borderColor: this.checkUnAnsweredQuestion(item.surveyId)
                ? Color.fontBlack50
                : Color.fontBlack10
            }
          ]}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={Fonts.type117p}>
              Pertanyaan {index + 1}
              {item.required && (
                <Text style={{ color: Color.mainColor }}>{' *'}</Text>
              )}
            </Text>
            {this.state.review && (
              <TouchableOpacity
                onPress={() =>
                  this.setState({ review: false }, () =>
                    this.setNavigationParams()
                  )
                }
              >
                <MaterialIcon name="edit" color={Color.fontBlack60} size={14} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ height: 16 }} />
          <Text style={Fonts.type8}>{item.title}</Text>
          {item.surveyQuestionCategory.code === 'multiple_answer' && (
            <Text style={Fonts.type67}>
              (Dapat pilih lebih dari satu jawaban)
            </Text>
          )}
          {this.renderPerCategoryAndType(item)}
          {this.checkUnAnsweredQuestion(item.surveyId) &&
            this.renderUnAnsweredQuestion()}
        </View>
      </View>
    );
  }

  /** === RENDER HEADER === */
  renderHeader() {
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
  /** === RENDER CONTENT ITEM === */
  renderContentItem() {
    return (
      <View style={{ padding: 16 }}>
        {this.renderHeader()}
        <FlatList
          data={questions}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({ item, index }) => this.renderQuestion(item, index)}
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
  /** === RENDER MODAL FINISH QUESTIONNAIRE === */
  renderModalFinish() {
    return (
      <ModalConfirmation
        statusBarWhite
        title={'Selesai mengisi survei?'}
        open={this.state.modalConfirmation}
        content={'Pastikan jawaban yang Anda pilih sudah sesuai.'}
        okText={'Selesai'}
        cancelText={'Kembali'}
        ok={() => {
          this.setState({ modalConfirmation: false, review: true }, () =>
            this.setNavigationParams()
          );
        }}
        cancel={() => this.setState({ modalConfirmation: false })}
      />
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
          <View style={{ height: '100%' }}>{this.renderContent()}</View>
        )}
        {/* MODAL */}
        {this.renderModalFinish()}
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
 * updatedDate: 09092021
 * updatedFunction:
 * -> update ui take survey (questionnaire).
 */

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
import { Fonts } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
import { Color } from '../../../config';
import QuestionAnswersListView from './QuestionAnswersListView';

class QuestionListDataView extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === UPDATE/SELECT ANSWER === */
  selectAnswer = (candidateAnswerId, survey) => {
    let newQuestions = this.props.questions;
    // find the index of question
    const index = newQuestions.findIndex(
      item => item.questionId === survey.questionId
    );
    if (survey.category === 'single_answer') {
      newQuestions[index].value = [
        { isBaseValue: false, candidateAnswerId, inputValue: 'checked' }
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
          isBaseValue: false,
          candidateAnswerId,
          inputValue: 'checked'
        });
      }
    } else if (
      survey.category === 'vc_basic' ||
      survey.category === 'vc_compare_group'
    ) {
      // check the answer already inputed or not (input)
      const alreadyInputed = newQuestions[index].value.findIndex(
        item => item.candidateAnswerId === candidateAnswerId
      );
      // if alreadyInputed, change the value of the answer
      if (alreadyInputed > -1) {
        newQuestions[index].value[alreadyInputed] = {
          candidateAnswerId,
          isBaseValue: survey.isBaseValue,
          inputValue: survey.inputValue
        };
      } else {
        // if not, add the value to the answer
        newQuestions[index].value.push({
          candidateAnswerId,
          isBaseValue: survey.isBaseValue,
          inputValue: survey.inputValue
        });
      }
    }
    // update the answer of the question
    this.props.updateQuestion(newQuestions);
  };

  /** === CHECK SELECTED ANSWER (for radio button & check box) === */
  checkSelectedAnswers = (survey, candidateAnswerId) => {
    if (this.props.questions.length > 0) {
      // find the question
      const value = this.props.questions.find(
        item => item.questionId === survey.questionId
      )?.value;
      // check the category & the value
      if (survey.category === 'single_answer') {
        if (value && value[0]) {
          return value[0].candidateAnswerId;
        }
      } else if (survey.category === 'multiple_answer') {
        if (value?.length > 0) {
          return value.find(
            item => item.candidateAnswerId === candidateAnswerId
          );
        }
      }
    }
  };

  /**
   * =======================
   * RENDER
   * =======================
   */

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
              borderColor: this.props.checkUnAnsweredRequiredQuestion(item.id)
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
            {this.props.review && (
              <TouchableOpacity onPress={this.props.onEdit}>
                <MaterialIcon name="edit" color={Color.fontBlack60} size={14} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ height: 16 }} />
          <Text style={Fonts.type8}>{item.title}</Text>
          {item.category.code === 'multiple_answer' && (
            <Text style={Fonts.type67}>
              (Dapat pilih lebih dari satu jawaban)
            </Text>
          )}
          <QuestionAnswersListView
            item={item}
            disabled={this.props.review}
            onChange={value => {
              this.selectAnswer(value.id, { ...value });
            }}
            selected={value =>
              this.checkSelectedAnswers({ ...value }, value.id)
            }
          />
          {this.props.checkUnAnsweredRequiredQuestion(item.id) &&
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
  render() {
    return (
      <FlatList
        data={this.props.merchant.dataGetSurvey?.questions}
        keyExtractor={(data, index) => index.toString()}
        renderItem={({ item, index }) => this.renderQuestion(item, index)}
      />
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
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionListDataView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 13092021
 * updatedBy: dyah
 * updatedDate: 160092021
 * updatedFunction:
 * -> add isBaseValue and change surveyId to questionId.
 */

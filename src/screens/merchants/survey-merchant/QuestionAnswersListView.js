import { React, Component, View } from '../../../library/reactPackage';
import {
  SingleAnswerComponent,
  MultipleAnswerComponent,
  BasicRangeAnswerComponent,
  CompareGroupRangeAnswerComponent
} from '../../../library/component';
import _ from 'lodash';

class QuestionAnswersListView extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === CHECK RENDER PER CATEGORY & TYPE === */
  renderContent = item => {
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
   * =======================
   * RENDER
   * =======================
   */
  /** === RENDER FOR SINGLE ANSWER x SINGLE SCORE === */
  renderSingleAnswer = (candidateAnswer, surveyId) => {
    return (
      <SingleAnswerComponent
        data={candidateAnswer}
        disabled={this.props.disabled}
        onChange={item =>
          this.props.onChange({
            questionId: this.props.questionId,
            id: item.id,
            surveyId,
            category: 'single_answer'
          })
        }
        selected={this.props.selected({ surveyId, category: 'single_answer' })}
      />
    );
  };

  /** === RENDER FOR MULTIPLE ANSWER x SINGLE SCORE === */
  renderMultiSingleAnswer = (candidateAnswer, surveyId) => {
    return (
      <MultipleAnswerComponent
        key={'multi-single-ans-' + candidateAnswer.id}
        disabled={this.props.disabled}
        label={candidateAnswer.title}
        onChange={() =>
          this.props.onChange({
            id: candidateAnswer.id,
            surveyId,
            category: 'multiple_answer'
          })
        }
        selected={this.props.selected({
          surveyId,
          id: candidateAnswer.id,
          category: 'multiple_answer'
        })}
      />
    );
  };

  /** === RENDER FOR MULTIPLE ANSWER x CUMULATIVE SCORE === */
  renderMultiCumulativeAnswer = (candidateAnswer, surveyId) => {
    return (
      <MultipleAnswerComponent
        key={'multi-cum-ans-' + candidateAnswer.id}
        disabled={this.props.disabled}
        label={candidateAnswer.title}
        onChange={() =>
          this.props.onChange({
            id: candidateAnswer.id,
            surveyId,
            category: 'multiple_answer'
          })
        }
        selected={this.props.selected({
          surveyId,
          id: candidateAnswer.id,
          category: 'multiple_answer'
        })}
      />
    );
  };

  /** === RENDER FOR VC BASIC x RANGE SCORE === */
  renderBasicRangeAnswer = (candidateAnswer, surveyId) => {
    return (
      <BasicRangeAnswerComponent
        key={'basic-range-ans-' + candidateAnswer.id}
        item={candidateAnswer}
        disabled={this.props.disabled}
        onChange={inputValue =>
          this.props.onChange({
            id: candidateAnswer.id,
            inputValue,
            surveyId,
            category: 'vc_basic'
          })
        }
      />
    );
  };

  /** === RENDER FOR VC GROUP x RANGE SCORE === */
  renderCompareGroupRangeAnswer = (candidateAnswer, surveyId) => {
    return (
      <CompareGroupRangeAnswerComponent
        item={candidateAnswer}
        disabled={this.props.disabled}
        onChange={value =>
          this.props.onChange({
            ...value,
            surveyId,
            category: 'vc_compare_group'
          })
        }
      />
    );
  };

  /** === RENDER MAIN === */
  render() {
    return <View>{this.renderContent(this.props.item)}</View>;
  }
}

export default QuestionAnswersListView;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 13092021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> update take survey code (separate the render per category/type)
 */

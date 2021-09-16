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
    const { category, scoreType, candidateAnswer, id } = item;
    switch (category.code) {
      case 'single_answer':
        if (scoreType.code === 'single_score') {
          return this.renderSingleAnswer(
            _.orderBy(candidateAnswer, ['order']),
            id
          );
        }
        break;
      case 'multiple_answer':
        if (scoreType.code === 'single_score') {
          return candidateAnswer.map(candidate =>
            this.renderMultiSingleAnswer(candidate, id)
          );
        } else if (scoreType.code === 'cumulative_score') {
          return candidateAnswer.map(candidate =>
            this.renderMultiCumulativeAnswer(candidate, id)
          );
        }
        break;
      case 'vc_basic':
        if (scoreType.code === 'percentage_range_score') {
          return candidateAnswer.map(candidate =>
            this.renderBasicRangeAnswer(candidate, id)
          );
        }
        break;
      case 'vc_compare_group':
        if (scoreType.code === 'percentage_range_score') {
          return this.renderCompareGroupRangeAnswer(candidateAnswer, id);
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
  renderSingleAnswer = (candidateAnswer, questionId) => {
    return (
      <SingleAnswerComponent
        data={candidateAnswer}
        disabled={this.props.disabled}
        onChange={item =>
          this.props.onChange({
            id: item.id,
            questionId,
            category: 'single_answer'
          })
        }
        selected={this.props.selected({
          questionId,
          category: 'single_answer'
        })}
      />
    );
  };

  /** === RENDER FOR MULTIPLE ANSWER x SINGLE SCORE === */
  renderMultiSingleAnswer = (candidateAnswer, questionId) => {
    return (
      <MultipleAnswerComponent
        key={'multi-single-ans-' + candidateAnswer.id}
        disabled={this.props.disabled}
        label={candidateAnswer.title}
        onChange={() =>
          this.props.onChange({
            id: candidateAnswer.id,
            questionId,
            category: 'multiple_answer'
          })
        }
        selected={this.props.selected({
          questionId,
          id: candidateAnswer.id,
          category: 'multiple_answer'
        })}
      />
    );
  };

  /** === RENDER FOR MULTIPLE ANSWER x CUMULATIVE SCORE === */
  renderMultiCumulativeAnswer = (candidateAnswer, questionId) => {
    return (
      <MultipleAnswerComponent
        key={'multi-cum-ans-' + candidateAnswer.id}
        disabled={this.props.disabled}
        label={candidateAnswer.title}
        onChange={() =>
          this.props.onChange({
            id: candidateAnswer.id,
            questionId,
            category: 'multiple_answer'
          })
        }
        selected={this.props.selected({
          questionId,
          id: candidateAnswer.id,
          category: 'multiple_answer'
        })}
      />
    );
  };

  /** === RENDER FOR VC BASIC x RANGE SCORE === */
  renderBasicRangeAnswer = (candidateAnswer, questionId) => {
    return (
      <BasicRangeAnswerComponent
        key={'basic-range-ans-' + candidateAnswer.id}
        item={candidateAnswer}
        defaultValue={candidateAnswer.answersResponse?.inputValue}
        disabled={this.props.disabled}
        onChange={inputValue =>
          this.props.onChange({
            id: candidateAnswer.id,
            inputValue,
            questionId,
            isBaseValue: false,
            category: 'vc_basic'
          })
        }
      />
    );
  };

  /** === RENDER FOR VC GROUP x RANGE SCORE === */
  renderCompareGroupRangeAnswer = (candidateAnswer, questionId) => {
    return (
      <CompareGroupRangeAnswerComponent
        item={candidateAnswer}
        disabled={this.props.disabled}
        onChange={value =>
          this.props.onChange({
            ...value,
            questionId,
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
 * updatedBy: dyah
 * updatedDate: 16092021
 * updatedFunction:
 * -> integration for ui take survey.
 * -> add isBaseValue & defaultValue.
 * -> change surveyId to questionId.
 */

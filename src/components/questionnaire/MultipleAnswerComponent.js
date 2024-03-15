import { React, Component } from '../../library/reactPackage';
import { CheckBox } from '../../library/component';

class MultipleAnswerComponent extends Component {
  constructor(props) {
    super(props);
  }

  /** === RENDER MAIN === */
  render() {
    return (
      <CheckBox
        disabled={this.props.disabled}
        onSelect={item => this.props.onChange(item)}
        selected={this.props.selected}
        label={this.props.label}
      />
    );
  }
}
export default MultipleAnswerComponent;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 13092021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> add questionnaire component (multiple answer)
 */

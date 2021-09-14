import { React, Component } from '../../library/reactPackage';
import { RadioButton } from '../../library/component';

class SingleAnswerComponent extends Component {
  constructor(props) {
    super(props);
  }

  /** === RENDER MAIN === */
  render() {
    return (
      <RadioButton
        data={this.props.data}
        disabled={this.props.disabled}
        onSelect={item => this.props.onChange(item)}
        selected={this.props.selected}
      />
    );
  }
}

export default SingleAnswerComponent;

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

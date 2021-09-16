import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import { InputType7 } from '../../library/component';
import { Fonts } from '../../helpers';
import { Color } from '../../config';
import _ from 'lodash';

class CompareGroupRangeAnswerComponent extends Component {
  constructor(props) {
    super(props);
  }

  /** === RENDER MAIN === */
  render() {
    return (
      <View>
        {_.orderBy(this.props.item, ['order'])
          .filter(candidate => candidate.isBaseValue)
          .map(answer => (
            <View key={'base-' + answer.id} style={styles.boxContentItem}>
              <Text style={Fonts.type23}>{answer.title}</Text>
              <View style={{ width: '40%' }}>
                <InputType7
                  editable={!this.props.disabled}
                  placeholder="Input disini"
                  keyboardType="numeric"
                  defaultValue={answer.answersResponse?.inputValue}
                  max={1000000}
                  min={0}
                  text={inputValue =>
                    this.props.onChange({
                      id: answer.id,
                      isBaseValue: true,
                      inputValue
                    })
                  }
                />
              </View>
            </View>
          ))}
        <View style={styles.notBaseContainer}>
          <Text style={Fonts.type83}>Bandingkan dengan:</Text>
          {_.orderBy(this.props.item, ['order'])
            .filter(candidate => !candidate.isBaseValue)
            .map(answer => (
              <View key={'not-base-' + answer.id} style={styles.boxContentItem}>
                <Text style={Fonts.type23}>{answer.title}</Text>
                <View style={{ width: '40%' }}>
                  <InputType7
                    editable={!this.props.disabled}
                    placeholder="Input disini"
                    keyboardType="numeric"
                    defaultValue={answer.answersResponse?.inputValue}
                    max={1000000}
                    min={0}
                    text={inputValue =>
                      this.props.onChange({
                        id: answer.id,
                        isBaseValue: false,
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
  }
}

const styles = StyleSheet.create({
  boxContentItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
    paddingTop: 12
  }
});

export default CompareGroupRangeAnswerComponent;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 13092021
 * updatedBy: dyah
 * updatedDate: 16092021
 * updatedFunction:
 * -> add props defaultValue.
 * -> update min & max.
 * -> add baseValue when updating text.
 */

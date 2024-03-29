import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import { Color } from '../../config';
import { Fonts } from '../../helpers';

class ProgressBarType2 extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * ======================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER BAR === */
  renderBar() {
    let percentage = (this.props.achieved / this.props.target) * 100;
    let value = percentage;
    if (percentage.toString() === 'Infinity') {
      percentage = 0;
      value = 0;
    }
    if (percentage > 100) {
      percentage = 100;
    }
    if (value % 1 !== 0) {
      value = parseInt(value, 10);
    }
    return (
      <View style={styles.boxBar}>
        <View style={styles.fullBar}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${percentage ? percentage : 0}%`
              }
            ]}
          />
        </View>
        <View style={{ paddingLeft: 8 }}>
          <Text style={Fonts.type38}>{value ? value : '0'} %</Text>
        </View>
      </View>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return <View style={styles.mainContainer}>{this.renderBar()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.backgroundWhite,
    width: '100%'
  },
  fullBar: {
    height: 8,
    flex: 1,
    backgroundColor: Color.fontBlack10,
    borderRadius: 8
  },
  boxBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  boxTitle: {
    paddingBottom: 10
  },
  progressBar: {
    height: '100%',
    left: 0,
    borderRadius: 8,
    backgroundColor: Color.mainColor
  }
});

export default ProgressBarType2;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Dyah
 * createdDate: 04082020
 * updatedBy: Dyah
 * updatedDate: 18082020
 * updatedFunction:
 * -> Delete value with coma.
 *
 */

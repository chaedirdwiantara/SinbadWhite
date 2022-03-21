import {
  React,
  Component,
  View,
  Image,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import { GlobalStyle, Fonts } from '../../helpers';
import { Color } from '../../config';

/**
 * Props
 * - title = '',
 * - description = ''
 */

class EmptyDataType2 extends Component {
  constructor(props) {
    super(props);
  }
  /** === EMPTY STATE === */
  renderEmptyState() {
    let justifyContent = 'center';
    let paddingTop = 0;
    let paddingHorizontal = 75;
    let paddingVertical = 16;
    if (this.props.top) {
      justifyContent = 'flex-start';
      paddingTop = 40;
    }
    if (this.props.wideTitle) {
      paddingHorizontal = 20;
      paddingVertical = 20;
    }

    return (
      <View style={[styles.boxEmpty, { justifyContent, paddingTop }]}>
        <Image
          source={require('../../assets/images/sinbad_image/search_sinbad.png')}
          style={GlobalStyle.fullImage}
        />
        <View style={[styles.boxTitle, { paddingHorizontal, paddingVertical }]}>
          <Text style={[Fonts.type7, { textAlign: 'center' }]}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.boxDescription}>
          <Text style={[Fonts.type17, { textAlign: 'center' }]}>
            {this.props.description}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    return <View style={styles.mainContainer}>{this.renderEmptyState()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  boxEmpty: {
    flex: 1,
    alignItems: 'center'
  },
  boxTitle: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 75
  },
  boxDescription: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 75
  }
});

export default EmptyDataType2;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 06082021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> create new component of empty data. (type2)
 *
 */

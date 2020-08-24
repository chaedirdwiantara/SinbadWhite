import {
  React,
  Component,
  View,
  StyleSheet,
  Image,
  Text
} from '../library/reactPackage'
import { connect } from '../library/thirdPartyPackage'
import { Color } from '../config'
import { GlobalStyle, Fonts } from '../helpers'

class SelectedMerchantName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
  }
  /**
   * =================
   * FUNCTIONAL
   * =================
   */
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.contentContainer,
            this.props.shadow ? GlobalStyle.shadowForBox : null
          ]}
        >
          <Image
            source={require('../assets/icons/merchant/store.png')}
            style={{ height: 24, width: 24, marginRight: 8 }}
          />
          {this.props.merchant.selectedMerchant.name.length >= 60 ? (
            <Text style={[Fonts.type16, { textTransform: 'capitalize' }]}>
              {this.props.merchant.selectedMerchant.name.substring(0, 60)}
              ...
            </Text>
          ) : (
            <Text style={[Fonts.type16, { textTransform: 'capitalize' }]}>
              {this.props.merchant.selectedMerchant.name}
            </Text>
          )}
        </View>
        {this.props.lines ? (
          <View style={GlobalStyle.lines} />
        ) : (
          <View style={GlobalStyle.boxPadding} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(SelectedMerchantName);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 08072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/


import {
  React,
  Component,
  StyleSheet,
  View
} from '../../library/reactPackage'
import {
  Button
} from '../../library/thirdPartyPackage'
import { Color } from '../../config'
import Fonts from '../../helpers/GlobalFont';

/**
 * HOW TO USE
 * <ButtonSingle
 *  white -> if button color white
 *  disabled={false/true}
 *  title={'Lanjutkan'}
 *  borderRadius={50}
 * />;
 */

class ButtonSingleSmall extends Component {
  constructor(props) {
    super(props);
  }
  /** === MAIN === */
  render() {
    let modifyFonts = '';
    let modifyDisabledFonts = '';
    let modifyDisabledButtonColor = '';
    let modifyButtonColor = '';
    if (this.props.white) {
      modifyFonts = Fonts.textButtonSmallWhiteActive;
      modifyDisabledFonts = Fonts.textButtonSmallWhiteDisabled;
      modifyDisabledButtonColor = [
        styles.buttonWhiteDisabled,
        {
          borderRadius: this.props.borderRadius,
          width: this.props.flex ? '100%' : null
        }
      ];
      modifyButtonColor = [
        styles.buttonWhite,
        {
          borderRadius: this.props.borderRadius,
          width: this.props.flex ? '100%' : null
        }
      ];
    } else if (this.props.disabledGrey) {
      modifyFonts = Fonts.textButtonSmallRedActive;
      modifyDisabledFonts = Fonts.textButtonSmallRedDisabled;
      modifyDisabledButtonColor = [
        styles.buttonGreyDisabled,
        {
          borderRadius: this.props.borderRadius,
          width: this.props.flex ? '100%' : null
        }
      ];
      modifyButtonColor = [
        styles.buttonRed,
        {
          borderRadius: this.props.borderRadius,
          width: this.props.flex ? '100%' : null
        }
      ];
    } else {
      modifyFonts = Fonts.textButtonSmallRedActive;
      modifyDisabledFonts = Fonts.textButtonSmallRedDisabled;
      modifyDisabledButtonColor = [
        styles.buttonRedDisabled,
        {
          borderRadius: this.props.borderRadius,
          width: this.props.flex ? '100%' : null
        }
      ];
      modifyButtonColor = [
        styles.buttonRed,
        {
          borderRadius: this.props.borderRadius,
          width: this.props.flex ? '100%' : null
        }
      ];
    }
    return (
      <View>
        <Button
          accessible={true}
          accessibilityLabel={
            this.props.accessibilityLabel ? this.props.accessibilityLabel : null
          }
          disabled={this.props.disabled ? this.props.disabled : false}
          onPress={this.props.onPress}
          title={this.props.title}
          titleStyle={modifyFonts}
          buttonStyle={modifyButtonColor}
          disabledStyle={modifyDisabledButtonColor}
          disabledTitleStyle={modifyDisabledFonts}
          type={'solid'}
          loading={this.props.loading}
          loadingStyle={{ paddingHorizontal: this.props.loadingPadding }}
          icon={this.props.icon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonRed: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Color.buttonActiveColorRed
  },
  buttonWhite: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Color.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: Color.buttonWhiteBorderRed
  },
  buttonWhiteDisabled: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Color.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: Color.buttonRedDisableColor
  },
  buttonRedDisabled: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Color.buttonRedDisableColor
  },
  buttonGreyDisabled: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Color.fontBlack40
  }
});

export default ButtonSingleSmall;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 28072020
 * updatedFunction:
 * -> add icon props for adding an icon.
 *
 */

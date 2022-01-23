import { React, Component, StyleSheet, View } from '../../library/reactPackage';
import { Button } from '../../library/thirdPartyPackage';
import { Color } from '../../config';
import { Fonts } from '../../helpers';

/**
 * HOW TO USE
 * <ButtonSingle
 *  white -> if button color white
 *  disabled={false/true}
 *  title={'Lanjutkan'}
 *  borderRadius={50}
 * />;
 */

class ButtonSingle extends Component {
  render() {
    let modifyFonts = '';
    let modifyDisabledFonts = '';
    let modifyDisabledButtonColor = '';
    let modifyButtonColor = '';
    let color = '';
    if (this.props.white) {
      color = Color.mainColor;
      modifyFonts = Fonts.textButtonWhiteActive;
      modifyDisabledFonts = Fonts.textButtonWhiteDisabled;
      modifyDisabledButtonColor = [
        styles.buttonWhiteDisabled,
        { borderRadius: this.props.borderRadius }
      ];
      modifyButtonColor = [
        styles.buttonWhite,
        { borderRadius: this.props.borderRadius }
      ];
    } else if (this.props.disabledGrey) {
      color = Color.fontWhite;
      modifyFonts = Fonts.textButtonRedActive;
      modifyDisabledFonts = Fonts.textButtonRedDisabled;
      modifyDisabledButtonColor = [
        styles.buttonGreyDisabled,
        { borderRadius: this.props.borderRadius }
      ];
      modifyButtonColor = [
        styles.buttonRed,
        { borderRadius: this.props.borderRadius }
      ];
    } else if (this.props.disabledGreyWhite) {
      color = Color.mainColor;
      modifyFonts = Fonts.textButtonWhiteActive;
      modifyDisabledFonts = Fonts.textButtonGreyWhiteDisabled;
      modifyDisabledButtonColor = [
        styles.buttonGreyWhiteDisabled,
        { borderRadius: this.props.borderRadius }
      ];
      modifyButtonColor = [
        styles.buttonWhite,
        { borderRadius: this.props.borderRadius }
      ];
    } else if (this.props.whiteTransparent) {
      color = Color.fontWhite;
      modifyFonts = Fonts.textButtonWhite;
      modifyDisabledFonts = Fonts.textButtonGreyWhiteDisabled;
      modifyDisabledButtonColor = [
        styles.buttonGreyWhiteDisabled,
        { borderRadius: this.props.borderRadius }
      ];
      modifyButtonColor = [
        styles.buttonWhiteTransparent,
        { borderRadius: this.props.borderRadius }
      ];
    } else {
      color = Color.fontWhite;
      modifyFonts = Fonts.textButtonRedActive;
      modifyDisabledFonts = Fonts.textButtonRedDisabled;
      modifyDisabledButtonColor = [
        styles.buttonRedDisabled,
        { borderRadius: this.props.borderRadius }
      ];
      modifyButtonColor = [
        styles.buttonRed,
        { borderRadius: this.props.borderRadius }
      ];
    }
    return (
      <View style={styles.boxButton}>
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
          loadingProps={{ color }}
          loading={this.props.loading}
          icon={this.props.leftIcon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxButton: {
    padding: 16
  },
  buttonRed: {
    backgroundColor: Color.buttonActiveColorRed,
    width: '100%',
    paddingVertical: 16
  },
  buttonWhite: {
    backgroundColor: Color.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: Color.buttonWhiteBorderRed,
    width: '100%',
    paddingVertical: 16
  },
  buttonWhiteTransparent: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Color.backgroundWhite,
    width: '100%',
    paddingVertical: 16
  },
  buttonWhiteDisabled: {
    backgroundColor: Color.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: Color.buttonRedDisableColor
  },
  buttonRedDisabled: {
    backgroundColor: Color.buttonRedDisableColor,
    width: '100%',
    paddingVertical: 16
  },
  buttonGreyDisabled: {
    backgroundColor: Color.fontBlack40,
    width: '100%',
    paddingVertical: 16
  },
  buttonGreyWhiteDisabled: {
    backgroundColor: Color.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: Color.buttonGreyWhiteDisabled,
    width: '100%',
    paddingVertical: 16
  }
});

export default ButtonSingle;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */

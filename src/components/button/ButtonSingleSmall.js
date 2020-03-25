import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import masterColor from '../../config/masterColor.json';
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonRed: {
    paddingHorizontal: 7,
    backgroundColor: masterColor.buttonActiveColorRed,
    height: 41
  },
  buttonWhite: {
    paddingHorizontal: 7,
    backgroundColor: masterColor.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: masterColor.buttonWhiteBorderRed,
    height: 41
  },
  buttonWhiteDisabled: {
    paddingHorizontal: 7,
    backgroundColor: masterColor.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: masterColor.buttonRedDisableColor
  },
  buttonRedDisabled: {
    paddingHorizontal: 7,
    backgroundColor: masterColor.buttonRedDisableColor,
    height: 41
  },
  buttonGreyDisabled: {
    paddingHorizontal: 7,
    backgroundColor: masterColor.fontBlack40,
    height: 41
  }
});

export default ButtonSingleSmall;

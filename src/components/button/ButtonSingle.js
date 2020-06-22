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

class ButtonSingle extends Component {
  render() {
    let modifyFonts = '';
    let modifyDisabledFonts = '';
    let modifyDisabledButtonColor = '';
    let modifyButtonColor = '';
    let color = '';
    if (this.props.white) {
      color = masterColor.mainColor;
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
      color = masterColor.fontWhite;
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
    } else {
      color = masterColor.fontWhite;
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
          disabled={this.props.disabled ? this.props.disabled : false}
          onPress={this.props.onPress}
          title={this.props.title}
          titleStyle={modifyFonts}
          buttonStyle={modifyButtonColor}
          disabledStyle={modifyDisabledButtonColor}
          disabledTitleStyle={modifyDisabledFonts}
          loadingProps={{ color }}
          loading={this.props.loading}
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
    backgroundColor: masterColor.buttonActiveColorRed,
    width: '100%',
    paddingVertical: 16
  },
  buttonWhite: {
    backgroundColor: masterColor.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: masterColor.buttonWhiteBorderRed,
    width: '100%',
    paddingVertical: 16
  },
  buttonWhiteDisabled: {
    backgroundColor: masterColor.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: masterColor.buttonRedDisableColor
  },
  buttonRedDisabled: {
    backgroundColor: masterColor.buttonRedDisableColor,
    width: '100%',
    paddingVertical: 16
  },
  buttonGreyDisabled: {
    backgroundColor: masterColor.fontBlack40,
    width: '100%',
    paddingVertical: 16
  }
});

export default ButtonSingle;

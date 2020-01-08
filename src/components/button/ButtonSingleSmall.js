import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  /** MAIN */
  render() {
    return (
      <View>
        <Button
          disabled={this.props.disabled ? this.props.disabled : false}
          onPress={this.props.onPress}
          title={this.props.title}
          titleStyle={
            this.props.white
              ? Fonts.textButtonSmallWhiteActive
              : Fonts.textButtonSmallRedActive
          }
          buttonStyle={
            this.props.white
              ? [styles.buttonWhite, { borderRadius: this.props.borderRadius }]
              : [styles.buttonRed, { borderRadius: this.props.borderRadius }]
          }
          disabledStyle={
            this.props.white
              ? [
                  styles.buttonWhiteDisabled,
                  { borderRadius: this.props.borderRadius }
                ]
              : [
                  styles.buttonRedDisabled,
                  { borderRadius: this.props.borderRadius }
                ]
          }
          disabledTitleStyle={
            this.props.white
              ? Fonts.textButtonSmallWhiteDisabled
              : Fonts.textButtonSmallRedDisabled
          }
          type={'solid'}
          loading={this.props.loading}
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
  }
});

export default connect()(ButtonSingleSmall);

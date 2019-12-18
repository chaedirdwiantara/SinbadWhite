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

class ButtonSingle extends Component {
  render() {
    return (
      <View style={styles.boxButton}>
        <Button
          disabled={this.props.disabled ? this.props.disabled : false}
          onPress={this.props.onPress}
          title={this.props.title}
          titleStyle={
            this.props.white
              ? Fonts.textButtonWhiteActive
              : Fonts.textButtonRedActive
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
              ? Fonts.textButtonWhiteDisabled
              : Fonts.textButtonRedDisabled
          }
          type={'solid'}
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
    height: 46
  },
  buttonWhite: {
    backgroundColor: masterColor.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: masterColor.buttonWhiteBorderRed,
    width: '100%',
    height: 46
  },
  buttonWhiteDisabled: {
    backgroundColor: masterColor.buttonActiveColorWhite,
    borderWidth: 1.5,
    borderColor: masterColor.buttonRedDisableColor
  },
  buttonRedDisabled: {
    backgroundColor: masterColor.buttonRedDisableColor,
    width: '100%',
    height: 46
  }
});

const mapStateToProps = ({}) => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(ButtonSingle);

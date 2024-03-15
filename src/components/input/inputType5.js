import {
    React,
    Component,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions
  } from '../../library/reactPackage';
  import {
    MaterialIcon,
    Tooltip,
  } from '../../library/thirdPartyPackage'
  import { Color } from '../../config';
  import { Fonts } from '../../helpers';
  const { width, height } = Dimensions.get('window');
  class InputType5 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        questionMarkShow: true,
      };
    }
    /**
     * ======================
     * RENDER VIEW
     * =======================
     */
    /** === RENDER PREFIX CONTENT === */
    renderSuffixContent() {
      return this.props.suffixContent ? (
        <View>{this.props.suffixContent}</View>
      ) : (
        <View />
      );
    }
    /** === RENDER PREFIX FOR PUSH OR NOT === */
    renderCheckSuffix() {
      return this.props.suffixForPush ? (
        <TouchableOpacity onPress={this.props.suffixPush}>
          {this.renderSuffixContent()}
        </TouchableOpacity>
      ) : (
        this.renderSuffixContent()
      );
    }
    /** === RENDER TITLE === */
    renderTitle() {
      return (
        <View style={styles.boxTitle, {flexDirection:'row', alignItems:'center'}}>
          <Text>
            <Text style={Fonts.type10}>{this.props.title} </Text>
            <Text style={Fonts.type71}>
              {this.props.additionalTitle ? this.props.additionalTitle : ''}
            </Text>
          </Text>
          {this.props.tooltip? this.renderTooltip() : null}
        </View>
      );
    }
    /** === RENDER INPUT === */
    renderInput() {
      return (
        <View style={styles.contentInput}>
          <View style={{ flex: 1 }}>
            <TextInput
              editable={this.props.editable}
              maxLength={this.props.maxLength}
              secureTextEntry={this.props.secureTextEntry}
              selectionColor={Color.mainColor}
              autoCapitalize={this.props.autoCapitalize}
              placeholder={this.props.placeholder}
              placeholderTextColor={Color.fontBlack40}
              value={this.props.value}
              onChangeText={this.props.onChangeText}
              keyboardType={this.props.keyboardType}
              style={[
                this.props.editable === false
                  ? Fonts.type31
                  : Fonts.type17,
                styles.boxInput,
                {
                  borderBottomColor: this.props.error
                    ? Color.fontRed0
                    : Color.fontBlack10
                }
              ]}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginLeft: -1,
              borderBottomWidth: 1,
              borderBottomColor: this.props.error
                ? Color.fontRed50
                : Color.fontBlack40
            }}
          >
            {this.props.suffix ? this.renderCheckSuffix() : <View />}
          </View>
        </View>
      );
    }
    /** === RENDER ERROR === */
    renderError() {
      return this.props.error && this.props.errorText ? (
        <View style={styles.boxError}>
          <Text style={Fonts.type13}>{this.props.errorText}</Text>
        </View>
      ) : (
        <View />
      );
    }
    /** === RENDER CONTENT === */
    renderContent() {
      return (
        <View style={styles.contentContainer}>
          {this.renderTitle()}
          {this.renderInput()}
          {this.renderError()}
          <View style={{ marginBottom: this.props.marginBottom }} />
        </View>
      );
    }

    /** === RENDER TOOLTIP === */
  renderTooltip() {
    return (
      <Tooltip
        backgroundColor={Color.fontBlack50OP80}
        height={this.props.type === 'stamp' ? 75 : 55}
        withOverlay={false}
        withPointer={false}
        onOpen={() => this.setState({ questionMarkShow: false })}
        onClose={() => this.setState({ questionMarkShow: true })}
        containerStyle={{
          padding: 8,
          width: this.props.type === 'stamp' ? 0.6 * width : 0.4 * width
        }}
        popover={
          <Text style={Fonts.type87}>
            {this.props.tooltipText?this.props.tooltipText : '-' }
          </Text>
        }
      >
        {this.state.questionMarkShow ? (
          <MaterialIcon name="help" size={13} color={Color.mainColor} />
        ) : (
          <View />
        )}
      </Tooltip>
    );
  }

    /** === MAIN VIEW === */
    render() {
      return <View style={styles.mainContainer}>{this.renderContent()}</View>;
    }
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: Color.backgroundWhite
    },
    contentContainer: {
      paddingHorizontal: 16
    },
    contentInput: {
      width: '100%',
      flexDirection: 'row'
    },
    boxTitle: {
      paddingBottom: 10
    },
    boxInput: {
      borderBottomWidth: 1,
      paddingHorizontal: 0,
      paddingVertical: 0,
      paddingBottom: 8,
      paddingTop: 8,
      borderBottomColor: Color.fontBlack40
    },
    boxError: {
      paddingTop: 8
    }
  });
  
  export default InputType5;
  
  /**
   * =========================================================
   * NOTE (28052020 - copy from input type 4 with different font design ), HOW TO USE
   * ========================================================
   * <InputType4
          title={'Nomor Handphone'}
          error={this.state.errorPhoneNumber}
          errorText={'No. HP yang anda masukan salah'}
          value={this.state.phoneNumber}
          onChangeText={phoneNumber => {
            const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
            this.checkPhoneFormat(cleanNumber);
          }}
          placeholder={'Masukan nomor handphone Anda'}
          keyboardType={'numeric'}
          maxLength={13}
          suffix
          suffixContent={
            this.state.errorPhoneNumber ? (
              <IconsMaterial
                color={Color.fontRed50}
                name={'close-circle'}
                size={18}
              />
            ) : (
              this.renderCheckInputIcon()
            )
          }
          marginBottom={5}
        />
   */
  
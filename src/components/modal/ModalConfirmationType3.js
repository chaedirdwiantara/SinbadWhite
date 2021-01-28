import {
    React,
    Component,
    View,
    StyleSheet,
    ModalPopUp,
    TouchableOpacity,
    Text
  } from '../../library/reactPackage'
  import {
    connect
  } from '../../library/thirdPartyPackage'
  import {
    StatusBarRedOP50,
    StatusBarBlackOP40
  } from '../../library/component'
  import { Fonts } from '../../helpers'
  import masterColor from '../../config/masterColor.json';
  
  class ModalConfirmation extends Component {
    constructor(props) {
      super(props);
    }
    /** MAIN RENDER */
    render() {
      return (
        <ModalPopUp
          visible={this.props.open}
          transparent
          animationType="fade"
          onRequestClose={() => {}}
        >
          {this.props.statusBarWhite ? (
            <StatusBarBlackOP40 />
          ) : (
            <StatusBarRedOP50 />
          )}
          <View style={styles.mainContainer}>
            <View style={styles.card}>
              <View style={styles.boxCard}>
                <View style={styles.containerTitle}>
                  <Text style={[Fonts.type43, { textAlign: 'center' }]}>
                    {this.props.title}
                  </Text>
                </View>
                <View style={styles.contentContainer}>
                  {
                    this.props.customContent 
                    ? 
                      this.props.customContent 
                    : 
                      <Text style={[Fonts.type17, { textAlign: 'center' }]}>
                        {this.props.content}
                      </Text>
                  }         
                </View>
                {this.props.subContent ? (
                  <View style={styles.contentSubContainer}>
                    <Text style={[Fonts.type44, { textAlign: 'center' }]}>
                      {this.props.subContent}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                {this.props.type === 'okeNotRed' ? (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.boxRed}
                      onPress={this.props.cancel}
                    >
                      <Text style={Fonts.type45}>{this.props.cancelText ? this.props.cancelText : 'Tidak'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.boxGrey}
                      onPress={this.props.ok}
                    >
                      <Text style={Fonts.type45}>{this.props.confirmText ? this.props.confirmText : 'Ya'}</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.boxGrey}
                      onPress={this.props.cancel}
                    >
                      <Text style={Fonts.type45}>{this.props.cancelText ? this.props.cancelText : 'Tidak'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.boxRed}
                      onPress={this.props.ok}
                    >
                      <Text style={Fonts.type45}>{this.props.confirmText ? this.props.confirmText : 'Ya'}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ModalPopUp>
      );
    }
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: masterColor.fontBlack100OP40,
      position: 'relative',
      height: '100%',
      justifyContent: 'center'
    },
    card: {
      backgroundColor: masterColor.backgroundWhite,
      borderRadius: 12,
      marginHorizontal: '18%'
    },
    boxCard: {
      paddingVertical: 16,
      paddingHorizontal: 16
    },
    containerTitle: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16
    },
    contentSubContainer: {
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContainer: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    boxRed: {
      width: '47%',
      alignItems: 'center',
      borderRadius: 8,
      paddingVertical: 12,
      backgroundColor: masterColor.mainColor
    },
    boxGrey: {
      width: '47%',
      alignItems: 'center',
      borderRadius: 8,
      paddingVertical: 12,
      backgroundColor: masterColor.fontBlack40
    }
  });
  
  export default connect()(ModalConfirmation);
  

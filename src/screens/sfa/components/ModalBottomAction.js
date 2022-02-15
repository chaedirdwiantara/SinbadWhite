import {
  React,
  Component,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from '../../../library/reactPackage';
import {
  ModalBottomType4,
  StatusBarRedOP50,
  ButtonSingleSmall
} from '../../../library/component';
import { Color } from '../../../config/';
import { Fonts, GlobalStyle } from '../../../helpers';

const ModalBottomAction = props => {
  /** === RENDER CONTENT === */
  const renderContent = () => {
    return (
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <StatusBarRedOP50 />
        <View
          style={[
            styles.contentContainer,
            {
              paddingVertical: 25,
              paddingHorizontal: 50
            }
          ]}
        >
          <Text
            style={[
              Fonts.paragraphSmall,
              {
                textAlign: 'center',
                color: Color.textSecondary
              }
            ]}
          >
            Penagihan yang telah terhapus tidak dapat dikembalikan
          </Text>
        </View>
        {renderButton()}
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 28 }}>
        <View style={{ flex: 1, marginRight: 11 }}>
          <TouchableOpacity
            onPress={props?.leftButtonPress}
            style={{
              width: '100%',
              height: '100%',
              paddingVertical: 12,
              backgroundColor: Color.btnSec,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={[
                Fonts.bodyDefault,
                {
                  color: Color.fontWhite,
                  textAlign: 'center',
                  textAlignVertical: 'center'
                }
              ]}
            >
              {props.leftTitle}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginLeft: 11 }}>
          <TouchableOpacity
            onPress={props?.rightButtonPress}
            style={{
              paddingVertical: 12,
              backgroundColor: Color.btnPri,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={[
                Fonts.bodyDefault,
                {
                  color: Color.fontWhite,
                  textAlign: 'center',
                  textAlignVertical: 'center'
                }
              ]}
            >
              {props.rightTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ModalBottomType4
      open={props.open}
      close={props.close}
      content={renderContent()}
      title={'Keluar halaman ini?'}
      typeClose={'cancel'}
    />
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 16
  }
});

export default ModalBottomAction;

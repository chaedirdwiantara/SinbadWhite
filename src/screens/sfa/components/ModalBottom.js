import {
  React,
  View,
  Text,
  // Dimensions,
  Image
} from '../../../library/reactPackage';
import {
  ModalBottomType1,
  StatusBarBlackOP40
} from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';

// const { height, width } = Dimensions.get('window');

const ModalBottom = props => {
  /**
   * RENDER CONTENT
   */
  const renderContent = () => {
    return (
      <View>
        <StatusBarBlackOP40 />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {props?.imagePath ? (
            <Image source={props?.imagePath} style={GlobalStyle.fullImage} />
          ) : null}
          <View style={{ marginBottom: 20, marginTop: 12 }}>
            <Text
              style={[Fonts.type7, { textAlign: 'center', marginBottom: 10 }]}
            >
              {props?.title}
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              {props?.description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ModalBottomType1
      open={props.open}
      content={renderContent()}
      onPress={props?.onPress}
      title={''}
      buttonTitle={props?.buttonTitle}
    />
  );
};

export default ModalBottom;

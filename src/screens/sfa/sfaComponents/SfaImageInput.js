import {
  React,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from '../../../library/reactPackage';
import { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import masterColor from '../../../config/masterColor.json';
import { MaterialIcon, Tooltip } from '../../../library/thirdPartyPackage';
import { Fonts, GlobalStyle } from '../../../helpers';
const { width } = Dimensions.get('window');
const SfaImageInput = props => {
  const [isQuestionMarkShow, setQuestionMarkShow] = useState(false);
  const [errorInputImage, setErrorInputImage] = useState(false);
  const [imageName, setImageName] = useState();
  const [imageType, setImageType] = useState();
  const [imageData, setImageData] = useState();
  /** FUNCTION CLICK CAMERA */
  const clickCamera = () => {
    console.log('iamge picker');
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      maxWidth: 800,
      quality: 1
      // maxHeight: 600
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('image picker', response);
      setErrorInputImage(false);

      if (response.didCancel) {
        null;
      } else if (response.error) {
        setErrorInputImage(true);
      } else if (response.customButton) {
        null;
      } else if (response.fileSize > 2000000) {
        setErrorInputImage(true);
      } else {
        console.log('disiniii');
        console.log(response, 'response');
        setImageData(response.data);
        setImageName(response.fileName);
        setImageType(response.type);
      }
    });
  };
  /** RENDER CAMERA */
  const renderCamera = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => clickCamera()}
          style={[GlobalStyle.shadowForBox, { width: 90, marginTop: 12 }]}
        >
          <View>
            <MaterialIcon
              name="camera-alt"
              color={masterColor.mainColor}
              size={50}
              style={{ alignSelf: 'center', marginTop: 18 }}
            />
          </View>
          <Text
            style={[Fonts.type38, { textAlign: 'center', marginBottom: 8 }]}
          >
            Unggah Foto
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  /** === RENDER TOOLTIP === */
  const renderTooltip = () => {
    return (
      <>
        <Tooltip
          backgroundColor={masterColor.fontBlack50OP80}
          height={55}
          withOverlay={false}
          withPointer={false}
          onOpen={() => setQuestionMarkShow(false)}
          onClose={() => setQuestionMarkShow(true)}
          containerStyle={{
            padding: 8,
            width: 0.6 * width
          }}
          popover={
            <Text style={Fonts.type87}>
              Dapat berupa foto Bukti Transfer atau Kuitansi
            </Text>
          }
        >
          {isQuestionMarkShow ? (
            <MaterialIcon name="help" size={13} color={masterColor.mainColor} />
          ) : (
            <View />
          )}
        </Tooltip>
      </>
    );
  };
  /** RENDER TITLE */
  const renderTitle = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[Fonts.type10]}>
          {props.title ? props.title : '*Foto Penagihan'}
        </Text>
        {renderTooltip()}
      </View>
    );
  };
  return (
    <View>
      {renderTitle()}
      {renderCamera()}
    </View>
  );
};

export default SfaImageInput;

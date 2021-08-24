import {
  React,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet
} from '../../../library/reactPackage';
import { useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import masterColor from '../../../config/masterColor.json';
import { MaterialIcon, Tooltip } from '../../../library/thirdPartyPackage';
import { Fonts, GlobalStyle } from '../../../helpers';
import { II_MB } from '../../../constants/paymentConstants';
const { width } = Dimensions.get('window');
const SfaImageInput = props => {
  const [isQuestionMarkShow, setQuestionMarkShow] = useState(true);
  const [errorInputImage, setErrorInputImage] = useState(false);
  const [imageName, setImageName] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [imageData, setImageData] = useState(null);

  /** USE EFFECT  */
  useEffect(() => {
    setImageData(props.imageData);
  }, [props.imageData]);
  /** FUNCTION DELETE IMAGE */
  const onDeleteImage = () => {
    props.delete();
    setImageData();
    setImageName();
    setImageType();
  };
  /** FUNCTION CLICK CAMERA */
  const clickCamera = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      maxWidth: 800,
      quality: 1
    };

    ImagePicker.showImagePicker(options, response => {
      setErrorInputImage(false);

      if (response.didCancel) {
        null;
      } else if (response.error) {
        setErrorInputImage(true);
      } else if (response.customButton) {
        null;
      } else if (response.fileSize > II_MB) {
        setErrorInputImage(true);
      } else {
        props.action(response);
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
        <Text style={[Fonts.type10, { marginRight: 6 }]}>
          {props.title ? props.title : '*Foto Penagihan'}
        </Text>
        {renderTooltip()}
      </View>
    );
  };

  /** RENDER IMAGE */
  const renderImage = () => {
    return (
      <View>
        <View style={styles.smallContainerImage}>
          <Image
            source={{
              uri: `data:image/jpeg;base64, ${imageData}`
            }}
            style={[styles.images]}
          />
        </View>
        {renderButton()}
      </View>
    );
  };

  /** RENDER BUTTON */

  const renderButton = () => {
    return (
      <View style={styles.smallContainerButtonImage}>
        <TouchableOpacity
          style={styles.buttonImage}
          onPress={() => onDeleteImage()}
        >
          <Text style={Fonts.type36}>Hapus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonImage}
          onPress={() => clickCamera()}
        >
          <Text style={Fonts.type36}>Ulangi Foto</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {renderTitle()}
      {!props.loading ? (
        props.imageData || imageData ? (
          renderImage()
        ) : (
          renderCamera()
        )
      ) : (
        <View style={[styles.smallContainerImage, { flex: 1, height: 328 }]}>
          <Image
            source={require('../../../assets/gif/loading/load_triagle.gif')}
            style={{ height: 50, width: 50 }}
          />
        </View>
      )}
    </View>
  );
};

export default SfaImageInput;
const styles = StyleSheet.create({
  images: {
    width: 328,
    height: 328,
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',
    aspectRatio: 2 / 3
  },
  smallContainerButtonImage: {
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonImage: {
    width: 148,
    height: 48,
    borderRadius: 5,
    borderColor: masterColor.mainColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallContainerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 8
  }
});

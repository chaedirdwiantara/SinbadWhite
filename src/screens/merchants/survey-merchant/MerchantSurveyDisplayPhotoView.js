import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  Image,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  RNFS,
  RNCamera,
  ImageEditor
} from '../../../library/thirdPartyPackage';
import {
  StatusBarRed,
  ModalConfirmation,
  ButtonSingleSmall,
  ButtonSingle,
  ModalBottomType3,
  BackHandlerBackSpecific
} from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import masterColor from '../../../config/masterColor.json';

const { width, height } = Dimensions.get('window');
const steps = ['Before Display', 'After Display', 'Completed'];

class MerchantSurveyDisplayPhotoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      active: 0,
      backCamera: true,
      flash: false,
      photo: [
        {
          name: 'photo1',
          uri: null,
          base64: ''
        },
        {
          name: 'photo2',
          uri: null,
          base64: ''
        },
        {
          name: 'photo3',
          uri: null,
          base64: ''
        },
        {
          name: 'photo4',
          uri: null,
          base64: ''
        },
        {
          name: 'photo5',
          uri: null,
          base64: ''
        }
      ],
      capturedPicture: {
        uri: null
      },
      modalNextProcess: false,
      modalCompleted: false,
      modalConfirmation: false,
      displayPhoto: false,
      photosDisplayBefore: [],
      photosDisplayAfter: []
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.navigationFunction();
  }
  goBack = () => {
    if (
      this.state.active === 0 &&
      this.state.photosDisplayBefore.length === 0
    ) {
      this.setState({
        modalConfirmation: true
      });
    }

    if (this.state.active === 1 && this.state.photosDisplayAfter.length === 0) {
      this.setState({
        modalConfirmation: true
      });
    }
  };

  takePicture = async () => {
    this.setState({ loading: true });
    const cropData = {
      offset: { x: 600, y: 400 },
      size: { width: 1850, height: 1850 }
    };

    if (this.camera) {
      let options = {
        quality: 0.2,
        base64: true,
        fixOrientation: true
      };
      const data = await this.camera.takePictureAsync(options);
      ImageEditor.cropImage(data.uri, cropData).then(url => {
        let newData = { ...data, uri: 'data:image/jpeg;base64,' + data.base64 };
        this.setState({ capturedPicture: newData });
        RNFS.readFile(url, 'base64').then(dataImage => {
          // this.props.saveImageBase64(dataImage);
        });
        RNFS.unlink(data.uri);
      });
    }
  };

  savePicture = () => {
    let newPhoto = this.state.photo;
    let check = 0;
    newPhoto.map(item => {
      if (!item.uri) {
        if (check === 0) {
          check = check + 1;
          return (item.uri =
            'data:image/jpeg;base64,' + this.state.capturedPicture.base64);
        }
        return;
      }
    });
    this.setState({ photo: newPhoto, capturedPicture: { uri: null } });
  };

  submitPicture = () => {
    if (this.state.active === 0) {
      this.setState({
        modalNextProcess: false,
        photosDisplayBefore: this.state.photo,
        displayPhoto: true
      });
    } else {
      this.setState({
        modalNextProcess: false,
        modalCompleted: true,
        photosDisplayAfter: this.state.photo,
        displayPhoto: true,
        active: 2
      });
    }
  };

  continueStep = () => {
    let newPhoto = this.state.photo;
    newPhoto.map(item => (item.uri = null));
    this.setState({
      displayPhoto: false,
      active: 1,
      photo: newPhoto
    });
  };

  deletePhotoFromList = deleteUri => {
    let newPhoto = this.state.photo;
    let newData = [];
    newPhoto.map((item, index) => {
      if (index === deleteUri) {
        return (item.uri = null);
      } else {
        return newData.push(item);
      }
    });
    this.setState({ photo: newPhoto });
  };
  /** ====== DID MOUNT FUNCTION ========== */
  /** NAVIGATION FUNCTION */
  navigationFunction() {
    this.props.navigation.setParams({
      goBackFunction: () => this.goBack()
    });
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    let storeName = 'Display Toko Photo';
    const { state } = navigation;

    return {
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => state.params.goBackFunction()}
        >
          <MaterialIcon color={Color.fontWhite} name={'arrow-back'} size={24} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View>
          <Text style={Fonts.type35}>{storeName}</Text>
        </View>
      )
    };
  };
  /** === RENDER STEPS === */
  renderSteps() {
    return (
      <View style={[styles.cardContainer]}>
        <View style={[styles.insideCard, GlobalStyle.shadowForBox5]}>
          <FlatList
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            data={steps}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              paddingVertical: 8
            }}
            keyExtractor={(data, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'column' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 8
                  }}
                >
                  <View
                    style={{
                      height: 22,
                      width: 22,
                      backgroundColor:
                        index <= this.state.active
                          ? masterColor.mainColor
                          : masterColor.fontBlack10,
                      borderRadius: 11,
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 3
                    }}
                  >
                    <Text style={Fonts.type2}>{index + 1}</Text>
                  </View>
                  {index !== steps.length - 1 && (
                    <View
                      style={{
                        height: 6,
                        width: 80,
                        backgroundColor:
                          index < this.state.active
                            ? masterColor.mainColor
                            : masterColor.fontBlack10,
                        borderRadius: 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    />
                  )}
                </View>
                <View>
                  <Text style={[Fonts.type57]}>{item}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
  /** === RENDER DISPLAY PHOTO === */
  renderDisplayPhoto() {
    return (
      <View style={[styles.cardContainer]}>
        {this.state.photosDisplayBefore.length !== 0 ? (
          <View style={[styles.insideCard, GlobalStyle.shadowForBox5]}>
            <Text>Photos Display Before</Text>
            <FlatList
              data={this.state.photosDisplayBefore}
              numColumns={5}
              keyExtractor={(data, index) => 'Before' + index.toString()}
              listKey={(data, index) => 'Before' + index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity key={index}>
                  <Image
                    source={{
                      isStatic: true,
                      uri: item.uri
                    }}
                    style={{
                      borderRadius: 4,
                      width: 51,
                      height: 51,
                      marginRight: 10,
                      marginTop: 12
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}
        <View style={{ height: 16 }} />
        {this.state.photosDisplayAfter.length !== 0 ? (
          <View style={[styles.insideCard, GlobalStyle.shadowForBox5]}>
            <Text>Photos Display After</Text>
            <FlatList
              data={this.state.photosDisplayAfter}
              numColumns={5}
              keyExtractor={(data, index) => 'After' + index.toString()}
              listKey={(data, index) => 'After' + index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity key={index}>
                  <Image
                    source={{
                      isStatic: true,
                      uri: item.uri
                    }}
                    style={{
                      borderRadius: 4,
                      width: 51,
                      height: 51,
                      marginRight: 10,
                      marginTop: 12
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}
        {this.state.photosDisplayAfter.length === 0 ? (
          <View style={{ width: '100%' }}>
            <ButtonSingle
              title="Continue"
              borderRadius={4}
              onPress={() => this.continueStep()}
            />
          </View>
        ) : null}
      </View>
    );
  }
  /** === RENDER CAMERA === */
  renderCamera() {
    return (
      <View
        style={{
          paddingTop: 165,
          overflow: 'hidden'
        }}
      >
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          aspect={1}
          style={{
            flex: 1
          }}
          type={
            this.state.backCamera
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          captureAudio={false}
          ratio="1:1"
          defaultTouchToFocus
          flashMode={
            this.state.flash
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          clearWindowBackground={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 40,
                marginLeft: 5,
                padding: 6,
                backgroundColor: masterColor.fontWhite
              }}
              onPress={() => this.setState({ flash: !this.state.flash })}
            >
              <MaterialIcon
                name="flash-on"
                color={masterColor.fontBlack60}
                size={15}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderRadius: 40,
                borderColor: masterColor.fontWhite,
                padding: 10,
                backgroundColor: masterColor.fontWhite
              }}
              onPress={this.takePicture.bind(this)}
            >
              <MaterialIcon
                name="photo-camera"
                color={masterColor.fontBlack60}
                size={32}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 40,
                marginRight: 5,
                padding: 6,
                backgroundColor: masterColor.fontWhite
              }}
              onPress={() =>
                this.setState({ backCamera: !this.state.backCamera })
              }
            >
              <MaterialIcon
                name="switch-camera"
                color={masterColor.fontBlack60}
                size={15}
              />
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
  /** === RENDER PHOTO LIST === */
  renderPhotoList() {
    return (
      <View style={{ backgroundColor: masterColor.fontWhite }}>
        <View style={{ padding: 15 }}>
          <FlatList
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.photo}
            keyExtractor={(data, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                {item.uri ? (
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 6
                    }}
                  >
                    <Image
                      source={{
                        isStatic: true,
                        uri: item.uri
                      }}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 5
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: masterColor.fontBlack40
                      }}
                      onPress={() => this.deletePhotoFromList(index)}
                    >
                      <MaterialIcon
                        name="delete"
                        color={masterColor.fontWhite}
                        size={15}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: masterColor.fontBlack10,
                      borderRadius: 5,
                      backgroundColor: masterColor.fontWhite,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 12
                    }}
                  >
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: masterColor.fontBlack10,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Text style={[Fonts.type34, { fontSize: 15 }]}>+</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </View>
    );
  }
  /** === RENDER BUTTON SUBMIT === */
  renderSubmit() {
    return (
      <View
        style={{
          backgroundColor: masterColor.fontWhite
        }}
      >
        <ButtonSingle
          title="Proceed"
          disabled={!this.state.photo[0].uri}
          borderRadius={5}
          onPress={() => this.setState({ modalNextProcess: true })}
        />
      </View>
    );
  }
  /** === RENDER CONTENT ITEM === */
  renderContentItem() {
    return this.state.displayPhoto ? (
      <View>
        {this.renderSteps()}
        {this.renderDisplayPhoto()}
      </View>
    ) : (
      <View>
        {this.renderSteps()}
        {this.renderCamera()}
        {this.renderPhotoList()}
        {this.renderSubmit()}
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator
          data={[1]}
          renderItem={this.renderContentItem.bind(this)}
          keyExtractor={(data, index) => index.toString()}
        />
      </View>
    );
  }
  /** === RENDER REVIEW IMAGE === */
  renderReviewImage() {
    return (
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.cardContainer,
            { height: '100%', justifyContent: 'space-between' }
          ]}
        >
          <View style={[styles.insideCard, GlobalStyle.shadowForBox5]}>
            <Image
              source={{
                isStatic: true,
                uri: this.state.capturedPicture.uri
              }}
              style={{
                height: 257
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 8
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                padding: 8,
                alignItems: 'center',
                width: 138,
                justifyContent: 'center'
              }}
              onPress={() => this.setState({ capturedPicture: { uri: null } })}
            >
              <MaterialIcon
                name="delete-forever"
                color={masterColor.fontBlack80}
                size={15}
                style={{ marginRight: 4 }}
              />
              <Text style={[Fonts.type31, { color: masterColor.fontBlack80 }]}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                padding: 8,
                alignItems: 'center',
                width: 138,
                justifyContent: 'center'
              }}
              onPress={() => this.savePicture()}
            >
              <MaterialIcon
                name="check"
                color={masterColor.fontGreen50}
                size={15}
                style={{ marginRight: 4 }}
              />
              <Text style={Fonts.type98}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER MODAL LEAVE TASK === */
  renderModalLeaveTask() {
    return (
      <ModalConfirmation
        statusBarWhite
        title={'Leave Task?'}
        open={this.state.modalConfirmation}
        content={
          'You have unsaved images. Do you still want to leave task without saving current images? '
        }
        type={'okeNotRed'}
        okText={'Leave'}
        cancelText={'Cancel'}
        ok={() =>
          this.setState({ modalConfirmation: false }, () =>
            NavigationService.navigate('MerchantSurveyView')
          )
        }
        cancel={() => this.setState({ modalConfirmation: false })}
      />
    );
  }
  /** === RENDER MODAL NEXT PROCESS === */
  renderModalNextProcess() {
    return (
      <ModalBottomType3
        open={this.state.modalNextProcess}
        title={`Submit the ${
          this.state.active === 0 ? 'Before' : 'After'
        } Photo`}
        content={
          <View>
            <View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 16
              }}
            >
              <Text style={Fonts.type12}>
                You can only submit it once. After this you can proceed to the
                next step.
              </Text>
            </View>
            <FlatList
              data={this.state.photo}
              numColumns={3}
              keyExtractor={(data, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{
                    isStatic: true,
                    uri: item.uri
                  }}
                  style={{
                    width: 99,
                    height: 99,
                    marginLeft: 16,
                    marginBottom: 16,
                    borderRadius: 5
                  }}
                />
              )}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View style={{ padding: 16, flex: 1 }}>
                <ButtonSingleSmall
                  title="Cancel"
                  white
                  borderRadius={4}
                  onPress={() => this.setState({ modalNextProcess: false })}
                />
              </View>
              <View style={{ padding: 16, flex: 1 }}>
                <ButtonSingleSmall
                  title="Submit"
                  borderRadius={4}
                  onPress={this.submitPicture.bind(this)}
                />
              </View>
            </View>
          </View>
        }
        close={() => this.setState({ modalNextProcess: false })}
        typeClose={'cancel'}
      />
    );
  }
  /** === RENDER MODAL COMPLETED === */
  renderModalCompleted() {
    return (
      <ModalBottomType3
        open={this.state.modalCompleted}
        title={''}
        content={
          <View
            style={{
              paddingHorizontal: 16,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              source={require('../../../assets/images/sinbad_image/smile_sinbad.png')}
              style={GlobalStyle.fullImage}
            />
            <Text style={Fonts.type7}>Task Successfully Completed</Text>
            <Text style={[Fonts.type12, { textAlign: 'center', padding: 14 }]}>
              You can view the photos later in the Toko Survey detail in Task
              List
            </Text>
            <View style={{ width: '100%' }}>
              <ButtonSingle
                title="Return to task list"
                borderRadius={4}
                onPress={() => NavigationService.navigate('MerchantSurveyView')}
              />
            </View>
          </View>
        }
        close={() => this.setState({ modalCompleted: false })}
        typeClose={'cancel'}
      />
    );
  }
  /** BACKGROUND */
  renderBackground() {
    return <View style={styles.backgroundRed} />;
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <SafeAreaView>
        <BackHandlerBackSpecific
          navigation={this.props.navigation}
        />
        <StatusBarRed />
        <View style={{ height: '100%' }}>
          {this.renderBackground()}
          {this.state.capturedPicture.uri
            ? this.renderReviewImage()
            : this.renderContent()}
        </View>
        {this.renderModalLeaveTask()}
        {this.renderModalNextProcess()}
        {this.renderModalCompleted()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000
  },
  backgroundRed: {
    backgroundColor: Color.mainColor,
    height: 85
  },
  containerTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 0.1 * width
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 5
  },
  insideCard: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ auth, merchant, user, permanent }) => {
  return { auth, merchant, user, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantSurveyDisplayPhotoView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 20112020
 * updatedBy: dyah
 * updatedDate: 20112020
 * updatedFunction:
 * -> add new merchant survey display photo screen.
 * -> add modal (leave task).
 * -> add delete icon (render photo list).
 */

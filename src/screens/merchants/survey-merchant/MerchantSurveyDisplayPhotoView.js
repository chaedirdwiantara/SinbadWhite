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
  RFPercentage,
  RNFS,
  RNCamera,
  ImageEditor
} from '../../../library/thirdPartyPackage';
import {
  StatusBarRed,
  ModalConfirmation,
  ButtonSingleSmall,
  ButtonSingle,
  ModalBottomType3
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
      displayPhoto: false,
      photosDisplayBefore: [],
      photosDisplayAfter: []
    };
  }

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

  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = () => {
    let storeName = 'Display Toko Photo';

    return {
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
      <View style={[styles.lastOrderContainer]}>
        <View style={[styles.cardLastOrder, GlobalStyle.shadowForBox5]}>
          <FlatList
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            data={steps}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
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
      <View style={[styles.lastOrderContainer]}>
        {this.state.photosDisplayBefore.length !== 0 ? (
          <View style={[styles.cardLastOrder, GlobalStyle.shadowForBox5]}>
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
          <View style={[styles.cardLastOrder, GlobalStyle.shadowForBox5]}>
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
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          ratio="1:1"
          defaultTouchToFocus
          // flashMode={RNCamera.Constants.FlashMode.off}
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
              onPress={() => null}
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
              onPress={() => null}
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
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyExtractor={(data, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                {item.uri ? (
                  <TouchableOpacity>
                    <Image
                      source={{
                        isStatic: true,
                        uri: item.uri
                      }}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 5,
                        marginHorizontal: 12
                      }}
                    />
                  </TouchableOpacity>
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
            styles.lastOrderContainer,
            { height: '100%', justifyContent: 'space-between' }
          ]}
        >
          <View style={[styles.cardLastOrder, GlobalStyle.shadowForBox5]}>
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
        open={false}
        content={
          'You have unsaved images. Do you still want to leave task without saving current images? '
        }
        type={'okeNotRed'}
        okText={'Leave'}
        cancelText={'Cancel'}
        ok={() => null}
        cancel={() => null}
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
  containerSlider: {
    flex: 1,
    paddingBottom: 5
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(51,51,51, 0.2)'
  },
  activeDot: {
    width: 20,
    height: 6,
    borderRadius: 5,
    backgroundColor: 'red'
  },
  // CARD
  cardPromo: {
    borderRadius: 15,
    borderWidth: 0,
    height: 0.31 * height,
    width: 0.9 * width,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'flex-start',
    marginLeft: 0.015 * width,
    marginTop: 2,
    marginRight: 0.03 * width
  },
  productImage: {
    resizeMode: 'contain',
    width: 57,
    height: undefined,
    aspectRatio: 1 / 1
  },
  textPlusProduct: {
    color: '#333333',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratMedium
  },
  // SEMENTARA
  cardTask: {
    flex: 1,
    flexDirection: 'column',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    shadowOpacity: 0.22,
    shadowRadius: 2.22
  },
  containerTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 0.1 * width
  },
  containerList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
  },
  checkBox: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  taskBox: {
    flex: 2,
    justifyContent: 'center'
  },
  rightArrow: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  wrapMenu: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  /** for content */
  lastOrderContainer: {
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 5
  },
  cardLastOrder: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Color.backgroundWhite
  },
  boxFaktur: {
    marginBottom: 8
  },
  cardTaskList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Color.backgroundWhite
  },
  /** for menu */
  containerMenu: {
    paddingHorizontal: 16
  },
  taskListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  boxMenu: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10
  },
  boxMainMenu: {
    paddingTop: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  iconSize: {
    height: 50,
    width: 70
  },
  boxNotification: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 1000
  },
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  preview: {
    // flex: 1,
    // maxWidth: 0.45 * height,
    maxHeight: 0.45 * height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  markerId: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.45 * height,
    // height: 0.7 * height,
    height: 0.45 * height,
    borderWidth: 5,
    borderRadius: 0.05 * width,
    borderColor: masterColor.fontGreen50,
    borderStyle: 'dashed'
  },
  boxCircleCamera: {
    transform: [{ rotate: '90deg' }],
    borderWidth: 2,
    borderRadius: 40,
    padding: 10,
    borderColor: masterColor.fontWhite
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
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 01072020
 * updatedFunction:
 * -> Add checking user status
 * updatedDate: 02072020
 * updatedFunction:
 * -> Remove unused state
 * -> Add function to change modal check status False after navigate
 * updatedDate: 03072020
 * updatedFunction:
 * -> Change key
 */

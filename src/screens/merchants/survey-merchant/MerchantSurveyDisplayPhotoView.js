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
  ButtonSingle,
  LoadingPage,
  BackHandlerBackSpecific
} from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';
import _ from 'lodash';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import ModalCarousel from './ModalCarousel';
import ModalBottomCompleted from './ModalBottomCompleted';
import ModalBottomSubmit from './ModalBottomSubmit';
import MerchantPhotoList from './MerchantPhotoList';
import MerchantSurveySteps from './MerchantSurveySteps';
import { ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY } from '../../../constants';
const { width } = Dimensions.get('window');

class MerchantSurveyDisplayPhotoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeStep: 0,
      backCamera: true,
      flash: false,
      photo: [
        {
          uri: null,
          base64: ''
        }
      ],
      capturedPhoto: {
        uri: null
      },
      modalSubmit: false,
      modalCompleted: false,
      modalConfirmation: false,
      displayPhoto: false,
      photosDisplayBefore: [],
      photosDisplayAfter: [],
      activeIndex: 0,
      openCarousel: false,
      dataCarousel: []
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
    const {
      readOnly,
      surveyResponseId,
      surveySteps
    } = this.props.navigation.state.params;
    let newPhoto = [];
    if (readOnly && !surveyResponseId) {
      // eslint-disable-next-line react/no-did-mount-set-state
      return this.setState({ displayPhoto: true });
    }
    if (surveyResponseId) {
      this.props.merchantGetSurveyProcess(surveyResponseId);
    } else {
      let array = _.range(
        0,
        surveySteps.find(item => item.order === 1).maxPhotos
      );
      _.each(array, () =>
        newPhoto.push({
          uri: null,
          base64: ''
        })
      );
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ photo: newPhoto });
    }
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    /**CHECK SURVEY RESPONSE */
    if (
      prevProps.merchant.dataSurvey !== this.props.merchant.dataSurvey &&
      this.props.merchant.dataSurvey.success
    ) {
      this.checkResponsePhoto();
    }
    /**CHECK AFTER SUBMIT */
    if (this.props.merchant.newSurveyResponse) {
      const surveyResponseId = this.props.merchant.dataSubmitSurvey.payload.id;
      this.props.merchantGetSurveyProcess(surveyResponseId);
    }
    /**CHECK NAVIGATION FUNCTION */
    if (!this.props.navigation.state.params.goBackFunction) {
      this.navigationFunction();
    }
  }
  /** === CHECK RESPONSE PHOTO === */
  checkResponsePhoto = () => {
    if (!_.isEmpty(this.props.merchant.dataSurvey.payload.responsePhoto)) {
      const newSurveyResponse = _.orderBy(
        this.props.merchant.dataSurvey.payload.responsePhoto,
        ['surveyStepId'],
        ['asc']
      );
      const arraySurveyStepId = [
        ...new Set(newSurveyResponse.map(item => item.surveyStepId))
      ];
      if (arraySurveyStepId.length === 2) {
        this.setState(
          {
            modalSubmit: false,
            photosDisplayBefore: newSurveyResponse.filter(
              item => item.surveyStepId === arraySurveyStepId[0]
            ),
            photosDisplayAfter: newSurveyResponse.filter(
              item => item.surveyStepId === arraySurveyStepId[1]
            ),
            displayPhoto: true,
            modalCompleted: this.state.activeStep === 0 ? false : true,
            activeStep: 2
          }
          // () => this.surveyDone()
        );
      } else {
        this.setState({
          modalSubmit: false,
          activeStep: 0,
          photosDisplayBefore: newSurveyResponse.filter(
            item => item.surveyStepId === arraySurveyStepId[0]
          ),
          displayPhoto: true
        });
      }
    }
  };
  /** === FOR GET LOG ALL ACTIVITY === */
  refreshMerchantGetLogAllActivityProcess() {
    this.props.merchantGetLogAllActivityProcess(
      this.props.merchant.selectedMerchant.journeyPlanSaleId
    );
  }
  /** === FOR SET SALES ACTIVITY SURVEY_TOKO DONE === */
  surveyDone() {
    this.props.merchantPostActivityProcess({
      journeyPlanSaleId: this.props.merchant.selectedMerchant.journeyPlanSaleId,
      activity: ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY
    });
    this.refreshMerchantGetLogAllActivityProcess();
  }
  /** === GO BACK FUNCTION === */
  goBack = () => {
    let totalPhoto = 0;
    this.state.photo.map(item => {
      if (item.uri) {
        totalPhoto = totalPhoto + 1;
      }
    });
    if (this.state.capturedPhoto.uri) {
      return this.setState({ capturedPhoto: { uri: null } });
    }
    if (this.state.activeStep === 1 && totalPhoto === 0) {
      return this.setState({ activeStep: 0, displayPhoto: true });
    }
    if (
      this.state.activeStep === 0 &&
      totalPhoto >= 1 &&
      _.isEmpty(this.state.photosDisplayBefore)
    ) {
      return this.setState({
        modalConfirmation: true
      });
    }
    if (
      this.state.activeStep === 1 &&
      totalPhoto >= 1 &&
      _.isEmpty(this.state.photosDisplayAfter)
    ) {
      return this.setState({
        modalConfirmation: true
      });
    }

    return NavigationService.navigate('MerchantSurveyView');
  };
  /** === TAKE PHOTO === */
  takePhoto = async () => {
    this.setState({ loading: true });
    let cropData = {
      offset: { x: 0, y: 250 }
    };

    if (this.camera) {
      let options = {
        quality: 0.2,
        base64: true,
        fixOrientation: true
      };
      const data = await this.camera.takePictureAsync(options);
      console.log('ORIGINAL IMAGE', data);
      let smallest = data.width < data.height ? data.width : data.height;
      cropData.size = { width: smallest, height: smallest };
      console.log('CROP OPTIONS', JSON.stringify(cropData));
      ImageEditor.cropImage(data.uri, cropData).then(url => {
        RNFS.readFile(url, 'base64').then(dataImage => {
          console.log('CROPED IMAGE', dataImage);
          if (this.state.photo.find(item => !item.uri)) {
            let newData = { ...data, uri: dataImage };
            this.setState({ capturedPhoto: newData });
          }
        });
        RNFS.unlink(data.uri);
      });
    }
  };
  /** === SAVE PHOTO TO PHOTO LIST === */
  savePhoto = () => {
    let newPhoto = this.state.photo;
    let check = 0;
    newPhoto.map(item => {
      if (!item.uri) {
        if (check === 0) {
          check = check + 1;
          return (item.uri = this.state.capturedPhoto.base64);
        }
        return;
      }
    });
    this.setState({ photo: newPhoto, capturedPhoto: { uri: null } });
  };
  /** === SUBMIT PHOTO === */
  submitPhoto = () => {
    const newPhoto = [];
    const { surveySteps } = this.props.navigation.state.params;
    let params = {
      surveyId: this.props.navigation.state.params.surveyId,
      storeId: this.props.merchant.selectedMerchant.storeId,
      storeName: this.props.merchant.selectedMerchant.name,
      surveySerialId: this.props.navigation.state.params.surveySerialId
    };
    this.state.photo.map(item => {
      if (item.uri) {
        newPhoto.push({
          long: this.props.merchant.selectedMerchant.longitude,
          lat: this.props.merchant.selectedMerchant.latitude,
          file: item.uri
        });
      }
    });
    if (this.state.activeStep === 0) {
      params = {
        ...params,
        photos: newPhoto,
        status: '',
        surveyStepId: surveySteps.find(item => item.order === 1).surveyStepId
      };
      this.props.merchantSubmitSurveyProcess(params);
    } else {
      params = {
        photos: newPhoto,
        status: 'completed',
        surveyStepId: surveySteps.find(item => item.order === 2).surveyStepId
      };
      let surveyResponseId = null;
      if (this.props.merchant.dataSubmitSurvey.payload) {
        surveyResponseId = this.props.merchant.dataSubmitSurvey.payload.id;
      } else {
        surveyResponseId = this.props.navigation.state.params.surveyResponseId;
      }
      this.props.merchantUpdateSurveyProcess({ params, surveyResponseId });
    }
  };
  /** === CONTINUE STEP === */
  continueStep = () => {
    const { surveySteps } = this.props.navigation.state.params;
    let newPhoto = [];
    let array = _.range(
      0,
      surveySteps.find(item => item.order === 2).maxPhotos
    );
    _.each(array, () =>
      newPhoto.push({
        uri: null,
        base64: ''
      })
    );
    this.setState({
      displayPhoto: false,
      activeStep: 1,
      photo: newPhoto
    });
  };
  /** === DELETE PHOTO FROM PHOTO LIST === */
  deletePhotoFromList = deleteUri => {
    let newPhoto = this.state.photo;
    newPhoto.map((item, index) => {
      if (index === deleteUri) {
        newPhoto.splice(index, 1);
      }
    });
    newPhoto.push({
      uri: null,
      base64: ''
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
    const { state } = navigation;
    let surveyName = '';
    if (state.params.surveyName) {
      surveyName = state.params.surveyName;
    }

    return {
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => {
            if (state.params.goBackFunction) {
              return state.params.goBackFunction();
            }
          }}
        >
          <MaterialIcon color={Color.fontWhite} name={'arrow-back'} size={24} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View>
          <Text style={Fonts.type35}>{surveyName}</Text>
        </View>
      )
    };
  };
  /** === RENDER STEPS === */
  renderSteps() {
    return (
      <View style={[styles.cardContainer, { paddingBottom: 16 }]}>
        <View style={[styles.insideCard, GlobalStyle.shadowForBox5]}>
          <MerchantSurveySteps
            active={this.state.activeStep}
            surveySteps={this.props.navigation.state.params.surveySteps}
          />
        </View>
      </View>
    );
  }
  /** === RENDER DISPLAY PHOTO === */
  renderDisplayPhoto() {
    const { surveySteps } = this.props.navigation.state.params;
    return (
      <View style={[styles.cardContainer]}>
        {this.state.photosDisplayBefore.length !== 0 ? (
          <View style={[styles.insideCard, GlobalStyle.shadowForBox5]}>
            <Text>{`Foto ${
              surveySteps.find(item => item.order === 1).title
            }`}</Text>
            <FlatList
              data={this.state.photosDisplayBefore}
              numColumns={5}
              keyExtractor={(data, index) => 'Before' + index.toString()}
              listKey={(data, index) => 'Before' + index.toString()}
              renderItem={({ item, index }) =>
                index > 4 ? null : (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.setState({
                        openCarousel: true,
                        dataCarousel: this.state.photosDisplayBefore,
                        activeIndex: index
                      });
                    }}
                  >
                    <Image
                      source={{
                        isStatic: true,
                        uri: item.fileUrl
                      }}
                      style={styles.imageDisplayPhoto}
                    />
                  </TouchableOpacity>
                )
              }
            />
          </View>
        ) : null}
        <View style={{ height: 16 }} />
        {this.state.photosDisplayAfter.length !== 0 ? (
          <View style={[styles.insideCard, GlobalStyle.shadowForBox5]}>
            <Text>{`Foto ${
              surveySteps.find(item => item.order === 2).title
            }`}</Text>
            <FlatList
              data={this.state.photosDisplayAfter}
              numColumns={5}
              keyExtractor={(data, index) => 'After' + index.toString()}
              listKey={(data, index) => 'After' + index.toString()}
              renderItem={({ item, index }) =>
                index > 4 ? null : (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.setState({
                        openCarousel: true,
                        dataCarousel: this.state.photosDisplayAfter,
                        activeIndex: index
                      });
                    }}
                  >
                    <Image
                      source={{
                        isStatic: true,
                        uri: item.fileUrl
                      }}
                      style={styles.imageDisplayPhoto}
                    />
                  </TouchableOpacity>
                )
              }
            />
          </View>
        ) : null}
      </View>
    );
  }
  /** === RENDER CAMERA === */
  renderCamera() {
    return (
      <View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          aspect={1}
          style={styles.camera}
          type={
            this.state.backCamera
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          captureAudio={false}
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
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity
              style={styles.smallIcon}
              onPress={() => this.setState({ flash: !this.state.flash })}
            >
              <MaterialIcon
                name={this.state.flash ? 'flash-on' : 'flash-off'}
                color={Color.fontBlack60}
                size={15}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mediumIcon}
              onPress={this.takePhoto.bind(this)}
            >
              <MaterialIcon
                name="photo-camera"
                color={Color.fontBlack60}
                size={32}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallIcon}
              onPress={() =>
                this.setState({ backCamera: !this.state.backCamera })
              }
            >
              <MaterialIcon
                name="switch-camera"
                color={Color.fontBlack60}
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
      <MerchantPhotoList
        data={this.state.photo}
        onDelete={index => this.deletePhotoFromList(index)}
      />
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    const { readOnly } = this.props.navigation.state.params;
    return (
      <View style={styles.buttonBottom}>
        {this.state.displayPhoto && _.isEmpty(this.state.photosDisplayAfter) ? (
          <ButtonSingle
            title="Continue"
            borderRadius={4}
            disabled={readOnly}
            onPress={() => this.continueStep()}
          />
        ) : null}
        {!this.state.displayPhoto && this.state.activeStep !== 2 ? (
          <ButtonSingle
            title="Lanjut"
            disabled={!this.state.photo[0].uri}
            borderRadius={5}
            onPress={() => this.setState({ modalSubmit: true })}
          />
        ) : null}
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
        {this.renderButton()}
      </View>
    );
  }
  /** === RENDER REVIEW IMAGE === */
  renderReviewImage() {
    return (
      <View style={styles.contentContainer}>
        <View style={[styles.cardContainer, styles.reviewContainer]}>
          <View style={[styles.insideCard, GlobalStyle.shadowForBox5]}>
            <Image
              source={{
                isStatic: true,
                uri: 'data:image/jpeg;base64,' + this.state.capturedPhoto.uri
              }}
              style={{ height: 257 }}
            />
          </View>
          <View style={styles.reviewButtonContainer}>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => this.setState({ capturedPhoto: { uri: null } })}
            >
              <MaterialIcon
                name="delete-forever"
                color={Color.fontBlack80}
                size={15}
                style={{ marginRight: 4 }}
              />
              <Text style={[Fonts.type98, { color: Color.fontBlack80 }]}>
                Hapus
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => this.savePhoto()}
            >
              <MaterialIcon
                name="check"
                color={Color.fontGreen50}
                size={15}
                style={{ marginRight: 4 }}
              />
              <Text style={Fonts.type98}>Simpan</Text>
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
        title={'Leave Task'}
        open={this.state.modalConfirmation}
        content={'Jika keluar maka akan menghapus data yang tersimpan?'}
        type={'okeNotRed'}
        okText={'Keluar'}
        cancelText={'Batal'}
        ok={() =>
          this.setState({ modalConfirmation: false }, () => {
            if (this.state.activeStep === 1) {
              return this.setState({ activeStep: 0, displayPhoto: true });
            } else {
              return NavigationService.navigate('MerchantSurveyView');
            }
          })
        }
        cancel={() => this.setState({ modalConfirmation: false })}
      />
    );
  }
  /** === RENDER MODAL NEXT PROCESS (MODAL SUBMIT)=== */
  renderModalSubmit() {
    const { surveySteps } = this.props.navigation.state.params;
    let sectionName = '';
    if (this.state.activeStep === 0) {
      sectionName = surveySteps.find(item => item.order === 1).title;
    } else {
      sectionName = surveySteps.find(item => item.order === 2).title;
    }
    return (
      <ModalBottomSubmit
        open={this.state.modalSubmit}
        loading={this.props.merchant.loadingSubmitSurvey}
        title={`Kirim foto "${sectionName}"`}
        data={this.state.photo}
        onClose={() => this.setState({ modalSubmit: false })}
        onSubmit={this.submitPhoto.bind(this)}
      />
    );
  }
  /** === RENDER MODAL COMPLETED === */
  renderModalCompleted() {
    return (
      <ModalBottomCompleted
        open={this.state.modalCompleted}
        onReturnTaskList={() => NavigationService.navigate('MerchantHomeView')}
        onClose={() => this.setState({ modalCompleted: false })}
      />
    );
  }
  /** === RENDER CAROUSEL === */
  renderCarousel() {
    return (
      <ModalCarousel
        isVisible={this.state.openCarousel}
        onClose={() => this.setState({ openCarousel: false })}
        data={this.state.dataCarousel}
        onSnapToItem={index => this.setState({ activeIndex: index })}
        activeIndex={this.state.activeIndex}
        onPrevious={() =>
          this.setState({ activeIndex: this.state.activeIndex - 1 })
        }
        onNext={() =>
          this.setState({ activeIndex: this.state.activeIndex + 1 })
        }
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
        <BackHandlerBackSpecific navigation={this.props.navigation} />
        <StatusBarRed />
        {this.props.merchant.loadingGetSurvey ? (
          <View style={{ height: '100%' }}>
            <LoadingPage />
          </View>
        ) : (
          <View style={{ height: '100%' }}>
            {this.renderBackground()}
            {this.state.capturedPhoto.uri
              ? this.renderReviewImage()
              : this.renderContent()}
          </View>
        )}
        {this.renderModalLeaveTask()}
        {this.renderModalSubmit()}
        {this.renderModalCompleted()}
        {this.renderCarousel()}
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
  },
  imageDisplayPhoto: {
    borderRadius: 4,
    width: 51,
    height: 51,
    marginRight: 10,
    marginTop: 12
  },
  camera: {
    flex: 1,
    height: width,
    width,
    overflow: 'hidden'
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
    height: width
  },
  smallIcon: {
    borderRadius: 40,
    marginLeft: 5,
    padding: 6,
    backgroundColor: Color.fontWhite
  },
  mediumIcon: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: Color.fontWhite,
    padding: 10,
    backgroundColor: Color.fontWhite
  },
  reviewContainer: {
    height: '100%',
    justifyContent: 'space-between'
  },
  reviewButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8
  },
  reviewButton: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    width: 138,
    justifyContent: 'center'
  },
  buttonBottom: {
    width: '100%',
    bottom: 0,
    alignSelf: 'center'
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
 * updatedDate: 16122020
 * updatedFunction:
 * -> additional params to submit survey response.
 */

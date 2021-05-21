import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions
} from '../../library/reactPackage';
import { TextInputMask } from 'react-native-masked-text';
import { 
  MaterialIcon, 
  moment,
  Tooltip, 
  connect,
  bindActionCreators
} from '../../library/thirdPartyPackage';
import { 
  InputType5
} from '../../library/component';
import * as ActionCreators from '../../state/actions';
import { Fonts, GlobalStyle } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import ImagePicker from 'react-native-image-picker';
import ModalPrincipal from './ModalPrincipal';
import { useSelector, useDispatch } from 'react-redux';
import ModalReferenceList from './ModalReferenceList';
import { sfaGetTransferImageProcess } from '../../state/actions';

const { width, height } = Dimensions.get('window');

const SfaEditCollectionPromo = props => {
  const status = props.status;

  const [dataReference, setDataReference] = useState(null);

  //DATA PROMO
  const [noRef, setNoRef] = useState(props.data.paymentCollection.paymentCollectionMethod.reference);
  const [promoNumber, setPromoNumber] = useState(props.data.paymentCollection.paymentCollectionMethod.promoNo);
  const [principal, setPrincipal] = useState(props.data.paymentCollection.paymentCollectionMethod.principal)
  const [promoBalance, setPromoBalance] = useState(props.data.paymentCollection.paymentCollectionMethod.balance)
  const [promoValue, setPromoValue] = useState(props.data.paymentCollection.paidAmount)
  const [dataImage, setDataImage] = useState(props.data.paymentCollection.paymentCollectionMethod)
  const [isInputImageError, setIsInputImageError] = useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = useState(true)
  const [isDisable, setIsDisable] = useState(false)
  const [openModalPrincipal, setOpenModalPrincipal] = useState(false);

  const { selectedMerchant } = useSelector(state => state.merchant);
  const { dataSfaGetTransferImage} = useSelector(state => state.sfa);
  const [openModalReference, setOpenModalReference] = useState(false);
  const dispatch = useDispatch();

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

   useEffect(() => {
    setExistingImage();
  }, [dataSfaGetTransferImage]);

  const setExistingImage = () => {
    if (dataSfaGetTransferImage && dataReference) {
      setDataImage({ fileData: dataSfaGetTransferImage.data.image });
    }
  };

//    useEffect(() => {
//     const front = moment.utc(new Date()).local().format('YYYYMMDD')
//     const mid = selectedMerchant.externalId
//     const back = moment.utc(new Date()).local().format('HHmmss')
//     setPromoNumber(`${front}${mid}${back}`)
//     props.promoNumber(`${front}${mid}${back}`)
//   }, []);

  const clickCamera = () => {
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
        setIsInputImageError(false);

      if (response.didCancel) {
        null
      } else if (response.error) {
        null
      } else if (response.customButton) {
        null
      } else if (response.fileSize > 2000000) {
        setIsInputImageError(true);
      } else {
        props.promoImage({
          fileName: response.fileName,
          fileData: response.data,
          fileType: response.type,
          fileUri: response.uri,
          fileSize: response.fileSize
        });
        setDataImage({
          fileName: response.fileName,
          fileData: response.data,
          fileType: response.type,
          fileUri: response.uri,
          fileSize: response.fileSize
        });
      }
    });
  };

  const textReference = (text) => {
    setNoRef(text)
    props.referenceCode(text)
  }

  const textPromoNumber = (text) => {
    setPromoNumber(text)
    props.promoNumber(text)
  }

  const selectedPrincipal = (data) => {
    props.principal(data);
    setPrincipal(data);
    setOpenModalPrincipal(false);
  }

  const textPromoBalance = (text) => {
    setPromoBalance(parseInt(text.replace(/[Rp.]+/g, '')))
    props.promoValue(parseInt(text.replace(/[Rp.]+/g, '')))
  }

  const textBillingPromo = (text) => {
    if (parseInt(text.replace(/[Rp.]+/g, '')) > parseInt(props.remainingBilling)) {
        setPromoValue(parseInt(props.remainingBilling))
        props.billingPromoValue(parseInt(props.remainingBilling))
      } else {
        setPromoValue(parseInt(text.replace(/[Rp.]+/g, '')))
        props.billingPromoValue(parseInt(text.replace(/[Rp.]+/g, '')))
      }
  }

  const selectedReference = data => {
    if (props.collectionMethod.id === 5) {
      dispatch(sfaGetTransferImageProcess(data.id));
    }
    setDataReference(data);

    // //DATA INPUT
    setNoRef(data.referenceCode);
    props.referenceCode(data.referenceCode);
    setPromoNumber(data.promoCode);
    props.promoNumber(data.promoCode);
    setPrincipal(data.principal);
    props.principal(data.principal);
    setPromoBalance(data.balance);
    props.promoValue(data.balance);

    setDataImage({ fileData: data.image });
    props.promoImage(data.image);

    props.useNoReference(true);
    setOpenModalReference(false);
    setIsDisable(true);
    props.paymentCollectionMethodId(data.id)
  };

  const deleteDataReference = () => {
    const front = moment.utc(new Date()).local().format('YYYYMMDD')
    const mid = selectedMerchant.externalId
    const back = moment.utc(new Date()).local().format('HHmmss')

    setIsDisable(false);
    setDataReference();
    setNoRef(null);
    props.referenceCode(null);
    setPromoNumber(`${front}${mid}${back}`);
    props.promoNumber(`${front}${mid}${back}`);
    setPrincipal(null);
    props.principal(null);
    setPromoBalance(null);
    props.promoValue(null);

    setDataImage(null);
    props.promoImage(null);

    props.useNoReference(false);
  };

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  const renderForm = () => {
      return(
        <View>
            {renderFormReference()}
            {renderFormPromoNumber()}
            {renderFormPrincipal()}
            {renderPromoValue()}
            {renderBillingValue()}
            {renderUploadImage()}
        </View>
      )
  }

  const renderFormReference = () => {
    return (
      <View style={{ marginHorizontal: -16, marginVertical: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 3 }}>
            <InputType5
              title={
                isDisable !== false ? 'Nomor Referensi' : '*Nomor Referensi'
              }
              value={noRef}
              placeholder={isDisable ? 'Nomor Referensi' : '*Nomor Referensi'}
              onChangeText={text => textReference(text.trim())}
              keyboardType={'default'}
              text={text => setNoRef(text)}
              editable={!isDisable}
              tooltip={true}
              tooltipText={
                'Dapat berupa Nomor Cek, Giro, Transfer atau Kuitansi'
              }
            />
          </View>
          {isDisable ? (
            <View style={{ flexDirection: 'row', marginRight: 16 }}>
              <TouchableOpacity
                onPress={() => setOpenModalReference(true)}
                style={{
                  backgroundColor: masterColor.mainColor,
                  height: 36,
                  width: 66,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8
                }}
              >
                <Text style={Fonts.type94}> Ubah </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteDataReference()}
                style={{
                  backgroundColor: 'white',
                  height: 36,
                  width: 66,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: masterColor.mainColor,
                  borderWidth: 1
                }}
              >
                <Text style={Fonts.type100}> Hapus </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginRight: 16 }}>
              <TouchableOpacity
                onPress={() => setOpenModalReference(true)}
                disabled={props.data.paymentCollection.paymentCollectionMethod.balance <= 0 ? true : false}
                style={{
                  backgroundColor:
                  props.data.paymentCollection.paymentCollectionMethod.balance <= 0
                      ? masterColor.fontRed10
                      : masterColor.mainColor,
                  height: 36,
                  width: 66,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={Fonts.type94}> Cari</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderFormPromoNumber = () => {
    return(
      <View style={{ marginBottom: 16 }}>
        <View>
          <View>
            <Text style={Fonts.type10}>Nomor Promo</Text>
          </View>
        </View>
        <TextInput
          style={
            [Fonts.type17, styles.boxInput, 
              {opacity: 0.5}
            ]
          }
          value={promoNumber}
          editable={false}
          placeholder={'Nomor Promo'}
          keyboardType={'default'}
        />
      </View>
    )
    }

    const renderFormPrincipal= () => {
        return(
          <View>
              <Text style={Fonts.type10}>
                  {status === 'available' ? 'Principal' : '*Principal'}
              </Text>
              <View>
                  <TouchableOpacity
                  disabled={isDisable}
                  style={styles.boxMenu}
                  onPress={() => setOpenModalPrincipal(true)}
                  >
                      <Text
                          style={[
                          Fonts.type17,
                          { opacity: principal === null || isDisable ? 0.5 : null }
                          ]}
                      >
                          {principal === null ? 'Pilih Principal' : principal.name}
                      </Text>
                      <View style={{ position: 'absolute', right: 16 }}>
                          <MaterialIcon
                          name="chevron-right"
                          color={masterColor.fontBlack40}
                          size={24}
                          />
                      </View>
                  </TouchableOpacity>
                  <View style={[GlobalStyle.lines,{marginBottom:8}]} />
              </View>
          </View>
        )
    }

    const renderPromoValue = () => {
      return (
        <View style={{ paddingTop: 16 }}>
          <Text style={Fonts.type10}>
            {isDisable ? 'Nilai Promo' : '*Nilai Promo'}
          </Text>
          <View
            style={[
              GlobalStyle.boxInput,
              { flexDirection: 'row', alignItems: 'center' }
            ]}
          >
            <TextInputMask
              editable={!isDisable}
              type={'money'}
              options={{
                precision: 0,
                separator: ',',
                delimiter: '.',
                unit: 'Rp ',
                suffixUnit: ''
              }}
              value={promoBalance}
              onChangeText={text => textPromoBalance(text)}
              style={[
                Fonts.type17,
                {
                  width: '95%',
                  borderBottomColor: masterColor.fontBlack10,
                  opacity: isDisable === true ? 0.5 : null
                }
              ]}
            />
          </View>
          <View style={GlobalStyle.lines} />
        </View>
      );
    };

    const renderBillingValue = () => {
        return(
            <View>
                <Text style={[Fonts.type10, {paddingTop: 16}]}>
                    {status === 'available' ? 'Jumlah Penagihan' : '*Jumlah Penagihan'}
                </Text>
                <View style={[GlobalStyle.boxInput, {flexDirection:"row", alignItems:"center"}]}>
                <TextInputMask
                    type={'money'}
                    options={{
                    precision: 0,
                    separator: ',',
                    delimiter: '.',
                    unit: 'Rp ',
                    suffixUnit: ''
                    }}
                    value={promoValue}
                    onChangeText={(text) => textBillingPromo(text)}
                    style={[
                    Fonts.type17,
                    {
                        width:"95%",
                        borderBottomColor: masterColor.fontBlack10
                    }
                    ]}
                />
                </View>
                <View  style={GlobalStyle.lines}/>
            </View>
        )
    }

    const renderUploadImage = () => {
        return(
            <View>
                <View style={{flexDirection:"row", paddingTop: 16}}>
                  <Text style={[Fonts.type10]}>
                      {status === 'available' ? 'Unggah Foto/Gambar' : '*Unggah Foto/Gambar'}
                  </Text>
                  {renderTooltip("image")}
                </View>
                {dataReference ? (
                  dataImage ? (
                    <View style={styles.smallContainerImage}>
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64, ${dataImage}`
                      }}
                      style={[
                        styles.images,
                        { opacity: isDisable === true ? 0.5 : null }
                      ]}
                    />
                  </View>
                  ) : (
                    <View style={[styles.smallContainerImage, {height: 250}]}>
                    <Image
                source={require('../../assets/gif/loading/load_triagle.gif')}
                style={{ height: 50, width: 50 }}
              />
                  </View>
                   
                  )
                  ) : dataImage ? (
                    <View style={{marginTop: 12}}>
                        <View style={styles.smallContainerImage}>
                          <Image
                          source={{ uri: `data:image/jpeg;base64, ${dataImage}` }}
                          style={styles.images}
                          />
                      </View>
                    <View style={styles.smallContainerButtonImage}>
                    <TouchableOpacity style={styles.buttonImage} onPress={()=> setDataImage()}>
                        <Text style={Fonts.type36}>Hapus</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonImage} onPress={() => clickCamera()}>
                        <Text style={Fonts.type36}>Ulangi Foto</Text>
                    </TouchableOpacity>
                </View> 
                </View>
                ):( 
                <View>
                <TouchableOpacity onPress={() => clickCamera()} style={[GlobalStyle.shadowForBox,{flex: 1, width:90, marginTop: 12}]}>
                    <View >
                        <MaterialIcon
                            name="camera-alt"
                            color={masterColor.mainColor}
                            size={50}
                            style={{alignSelf:"center", marginTop:18}}
                        />
                    </View>
                    <Text style={[Fonts.type38,{textAlign:"center", marginBottom: 8}]}>Unggah Foto</Text>
                </TouchableOpacity>
                </View>
                )}
                
            </View>
        )
    }


    /**
   * ==================================
   * MODAL
   * ==================================
   */

  /** MODAL BANK DESTINATION */
  const renderModalPrincipal = () => {
    return (
      <View>
        {openModalPrincipal ? (
          <ModalPrincipal
            open={openModalPrincipal}
            close={() => setOpenModalPrincipal(false)}
            onRef={ref => (selectPrincipal = ref)}
            selectPrincipal={selectedPrincipal.bind(this)}
          />
        ) : null}
      </View>
    );
  };

  /** MODAL REFERENCE */
  const renderModalReference = () => {
    return (
      <View>
        {openModalReference ? (
          <ModalReferenceList
            open={openModalReference}
            close={() => setOpenModalReference(false)}
            onRef={ref => (selectCollection = ref)}
            selectCollection={selectedReference.bind(this)}
            supplierId={selectedMerchant.supplierId}
            storeId={selectedMerchant.storeId}
            paymentCollectionTypeId={props.collectionMethod.id}
          />
        ) : null}
      </View>
    );
  };

  /** === RENDER TOOLTIP === */
  const renderTooltip = (data)=> {
    return (
      <View>
        <Tooltip
          backgroundColor={masterColor.fontBlack50OP80}
          height={55}
          withOverlay={false}
          withPointer={false}
          onOpen={() => setIsTooltipOpened(false)}
          onClose={() => setIsTooltipOpened(true)}
          containerStyle={{
            padding: 8,
            width: 0.4 * width
          }}
          popover={
            <Text style={Fonts.type87}>
              Dapat berupa foto Bukti Transfer atau Kuitansi
            </Text>
          }
        >
          {isTooltipOpened ? (
            <MaterialIcon name="help" style={{marginLeft: 6}} size={17} color={masterColor.mainColor} />
          ) : (
            <View />
          )}
        </Tooltip>
      </View>
    );
  }

  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
      return (
          <View>
              {renderForm()}
          </View>
      )
  }

  /**
   * =======================
   * MAIN
   * =======================
    */
  return (
    <>
      <View style={styles.mainContainer}>
        {renderContent()}
        {renderModalPrincipal()}
        {renderModalReference()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
      },
    boxMenu: {
        paddingVertical: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    smallContainerImage: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      alignItems: 'center',
      paddingTop: 8
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
        justifyContent : 'center',
        alignItems: 'center'
    },
    images: {
        width: 328,
        height: 328,
        borderWidth: 1,
        marginHorizontal: 3,
        backgroundColor: 'white',
        aspectRatio: 2 / 3
      },
    boxInput: {
      borderBottomWidth: 1,
      paddingHorizontal: 0,
      paddingVertical: 0,
      paddingBottom: 8,
      borderBottomColor: masterColor.fontBlack40
    },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapDispatchToProps
)(SfaEditCollectionPromo);
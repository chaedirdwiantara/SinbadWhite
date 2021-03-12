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
} from '../../library/thirdPartyPackage';
import { 
  InputType5
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import ImagePicker from 'react-native-image-picker';
import ModalPrincipal from './ModalPrincipal';

const { width, height } = Dimensions.get('window');

const SfaAddTagihanPromo = props => {
  const status = props.status;
  const [noRef, setNoRef] = useState('');
  const [promoNumber, setPromoNumber] = useState('');
  const [principal, setPrincipal] = useState(null)
  const [promoBalance, setPromoBalance] = useState(0)
  const [promoValue, setPromoValue] = useState(0)
  const [dataImage, setDataImage] = useState(null)
  const [errorInputImage, setErrorInputImage] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(true)
  const [isDisable, setIsDisable] = useState(false)

  const [openModalPrincipal, setOpenModalPrincipal] = useState(false);
  

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  const clickCamera = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' }
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      maxWidth: 800,
      quality: 1
      // maxHeight: 600
    };

    ImagePicker.showImagePicker(options, response => {
      setErrorInputImage(false);

      if (response.didCancel) {
        null
      } else if (response.error) {
        null
      } else if (response.customButton) {
        null
      } else if (response.fileSize > 2000000) {
        setErrorInputImage(true);
      } else {
        // const source = { uri: response.uri };
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
              onChangeText={text => textReference(text)}
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
                disabled={props.collectionMethod.balance <= 0 ? true : false}
                style={{
                  backgroundColor:
                    props.collectionMethod.balance <= 0
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
              {borderBottomColor: masterColor.fontBlack10, marginTop: 8}
            ]
          }
          value={promoNumber}
          placeholder={'Nomor Promo'}
          keyboardType={'default'}
          onChangeText={(text) => textPromoNumber(text)}
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
                  style={styles.boxMenu}
                  onPress={() => setOpenModalPrincipal(true)}
                  >
                      <Text
                          style={[
                          Fonts.type17,
                          { opacity: principal === null ? 0.5 : null }
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
                {dataImage ? (
                    <View style={{marginTop: 12}}>
                        <View style={styles.smallContainerImage}>
                          <Image
                          source={{ uri: dataImage.fileUri }}
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
            // supplierId={selectedMerchant.supplierId}
            // storeId={selectedMerchant.storeId}
            // paymentCollectionTypeId={props.collectionMethod.id}
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
          onOpen={() => setOpenTooltip(false)}
          onClose={() => setOpenTooltip(true)}
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
          {openTooltip ? (
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
      </View>
    </>
  );
};

export default SfaAddTagihanPromo;

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
        alignItems: 'center'
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

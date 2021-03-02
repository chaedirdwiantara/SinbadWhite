import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Tooltip,
  Dimensions,
  TextInput
} from '../../library/reactPackage';
import { TextInputMask } from 'react-native-masked-text';
import { MaterialIcon, moment } from '../../library/thirdPartyPackage';
import { 
  InputType5, 
  DatePickerSpinnerWithMinMaxDate, 
  ModalBottomType4 
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import ImagePicker from 'react-native-image-picker';
import ModalReferenceList from './ModalReferenceList';
import ModalBankDestination from './ModalBankDestination'
import {useSelector} from 'react-redux';

const { width, height } = Dimensions.get('window');

const SfaAddTagihanTransfer = props => {
  const status = props.status;
  
  const [openModalTransferDate, setOpenModalTransferDate] = useState(false)
  const [errorInputImage, setErrorInputImage] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(true)
  const [isDisable, setIsDisable] = useState(false)
  const [openModalReference, setOpenModalReference] = useState(false);
  const [openModalBank, setOpenModalBank] = useState(false);
  const [openModalBankDestination, setOpenModalBankDestination] = useState(false);

  //DATA INPUT
  const [noRef, setNoRef] = useState('');
  const [bankSource, setBankSource] = useState('');
  const [bankDestination, setBankDestination] = useState(null);
  const [transferDate, setTransferDate] = useState(null)
  const [balance, setBalance] = useState(0)
  const [billingValue, setBillingValue] = useState(0);
  const [dataImage, setDataImage] = useState(null)

  //SELECTOR
  const {selectedMerchant} = useSelector(state => state.merchant);
  

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const openTransferDate = () => {
    setOpenModalTransferDate(true)
  }

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
        props.transferImage(response.data)
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

  const deleteImage = () => {
    props.transferImage(null)
    setDataImage(null)
  }

  const textReference = (text) => {
    props.referenceCode(text)
    setNoRef(text)   
  }

  const textTransferDate = (date) => {
    setTransferDate(date)
    props.transferDate(moment(date).format('YYYY-MM-DD'))
}

  const textTransferValue = (text) => {
        setBalance(parseInt(text.replace(/[Rp.]+/g, '')))
        props.transferValue(parseInt(text.replace(/[Rp.]+/g, '')))
  }

  const textBillingValue = (text) => {
    if (parseInt(text.replace(/[Rp.]+/g, '')) > parseInt(props.remainingBilling)) {
        setBillingValue(parseInt(props.remainingBilling))
        props.billingValue(parseInt(props.remainingBilling))
      } else {
        setBillingValue(parseInt(text.replace(/[Rp.]+/g, '')))
        props.billingValue(parseInt(text.replace(/[Rp.]+/g, '')))
      }
  }

  const selectedReference = (data) => {
    setDataReference(data)
    setOpenModalReference(false)
    setDataSubmit({...dataSubmit, 
      referenceCode:data.referenceCode,
      balance: data.balance,
      bankAccount: data.bankSource,
      invalidDate: data.invalidDate,
      issuedDate: data.issuedDate})
    setIsDisable(true)
  }

  const selectedBankDestination = (data) => {
    props.bankAccount(data)
    setBankDestination(data)
    setOpenModalBankDestination(false)
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
            {renderFormBankSource()}
            {renderFormBankAccount()}
            {renderTransferDate()}
            {renderTransferValue()}
            {renderBillingValue()}
            {renderUploadImage()}
        </View>
      )
  }

  const renderFormReference = () => {
      return(
        <View style={{ marginVertical: 16 }}>
          <View style={{flexDirection:"row"}}>
            <View >
              <Text style={Fonts.type10}>{isDisable ? 'Nomor Referensi' : '*Nomor Referensi'}</Text>
            </View>
            {/* {renderTooltip()} */}
          </View>
          <View style={{flexDirection:"row"}}>
            <TextInput
              style={
                [Fonts.type17, styles.boxInput, 
                  {borderBottomColor: masterColor.fontBlack10, marginTop: 8, width: "80%"}
                ]
              }
              value={noRef}
              placeholder={
                isDisable ? 'Nomor Referensi' : '*Nomor Referensi'
              }
              keyboardType={'default'}
              onChangeText={(text) => textReference(text)}
            />
            <View style={{ marginRight: 16}}>
              <TouchableOpacity
                onPress={() =>setOpenModalReference(true)}
                style={{
                  backgroundColor: 'red',
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
          </View>
        </View>
      )
  }

  const renderFormBankSource = () => {
      return(
        <View>
            <Text style={Fonts.type10}>
                {isDisable ? 'Sumber Bank' : '*Sumber Bank'}
            </Text>
            <View>
                <TouchableOpacity
                style={styles.boxMenu}
                onPress={() => console.log('open bank list')}
                >
                    <Text
                        style={[
                        Fonts.type17,
                        { opacity: bankSource === '' ? 0.5 : null }
                        ]}
                    >
                        {bankSource === '' ? 'Pilih Sumber Bank' : bankSource.name}
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

  const renderFormBankAccount = () => {
    return(
      <View>
          <Text style={Fonts.type10}>
              {isDisable ? 'Tujuan Bank' : '*Tujuan Bank'}
          </Text>
          <View>
              <TouchableOpacity
              style={styles.boxMenu}
              onPress={() => setOpenModalBankDestination(true)}
              >
                  <Text
                      style={[
                      Fonts.type17,
                      { opacity: bankDestination === null ? 0.5 : null }
                      ]}
                  >
                      {bankDestination === null ? 'Pilih Tujuan Bank' : bankDestination.bank.displayName}
                  </Text>
                  <View style={{ position: 'absolute', right: 16 }}>
                      <MaterialIcon
                      name="chevron-right"
                      color={masterColor.fontBlack40}
                      size={24}
                      />
                  </View>
              </TouchableOpacity>
              <View style={[GlobalStyle.lines]} />
          </View>
      </View>
    )
}

    const renderTransferDate = () => {
        return (
            <View style={{paddingVertical: 16}}>
                <Text style={Fonts.type10}>
                    {isDisable ? 'Tanggal Transfer' : '*Tanggal Transfer'}
                </Text>
                <TouchableOpacity
                    style={styles.boxMenu}
                    onPress={() => openTransferDate()}
                >
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialIcon name="date-range" color={masterColor.mainColor} size={16} />
                            <Text
                                style={[
                                Fonts.type17,
                                { opacity: transferDate === null ? 0.5 : null, marginLeft: 11 }
                                ]}
                            >
                                {transferDate !== null ? moment(transferDate).format('DD/MM/YYYY') : "Pilih Tanggal Transfer"}
                            </Text>
                        </View>
                </TouchableOpacity>
                    <View style={[GlobalStyle.lines]} />
            </View>
        )
    }

    const renderTransferValue = () => {
        return (
            <View style={{paddingTop: 16}}>
                <Text style={Fonts.type10}>{isDisable ? 'Nilai Transfer' : '*Nilai Transfer'}</Text>
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
                        value={balance}
                        onChangeText={(text) => textTransferValue(text)}
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

    const renderBillingValue = () => {
        return(
            <View>
                <Text style={[Fonts.type10, {paddingTop: 16}]}>
                    {isDisable ? 'Jumlah Penagihan' : '*Jumlah Penagihan'}
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
                    value={billingValue}
                    onChangeText={(text) => textBillingValue(text)}
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
                <Text style={[Fonts.type10, {paddingTop: 16}]}>
                    {isDisable? 'Unggah Foto/Gambar' : '*Unggah Foto/Gambar'}
                </Text>
                {dataImage ? (
                    <View style={{marginTop: 12}}>
                        <View style={styles.smallContainerImage}>
                          <Image
                          source={{ uri: dataImage.fileUri }}
                          style={styles.images}
                          />
                      </View>
                    <View style={styles.smallContainerButtonImage}>
                    <TouchableOpacity style={styles.buttonImage} onPress={()=> deleteImage()}>
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

  /** === RENDER TOOLTIP === */
  const renderTooltip = ()=> {
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

  const renderModalTransferDate = () => {
    return(
      <ModalBottomType4
        typeClose={'Tutup'}
        open={openModalTransferDate}
        title={"Tanggal Transfer"}
        close={() => setOpenModalTransferDate(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
             onSelect={(date)=> textTransferDate(date)}
             close={() => setOpenModalTransferDate(false)}
            //  minDate={new Date("2021-02-20")}
             maxDate={new Date()}
            />
          </View>
        }
      />
    )
  }

  /** MODAL REFERENCE */
const renderModalReference = () => {
  console.log("disini:", props.collectionMethod.id);
  return (
    <View>
      {openModalReference ? (
        <ModalReferenceList
          open={openModalReference}
          close={() => setOpenModalReference(false)}
          onRef={ref => (selectCollection = ref)}
          selectCollection={selectedReference.bind(this)}
          supplierId = {selectedMerchant.supplierId}
          storeId= {selectedMerchant.storeId}
          paymentCollectionTypeId = {props.collectionMethod.id}
        />
      ) : null}
    </View>
  );
}

  /** MODAL BANK DESTINATION */
  const renderModalBankDestination = () => {
    return (
      <View>
        {openModalBankDestination ? (
          <ModalBankDestination
            open={openModalBankDestination}
            close={() => setOpenModalBankDestination(false)}
            onRef={ref => (selectBankDestination = ref)}
            selectBankDestination={selectedBankDestination.bind(this)}
            supplierId = {selectedMerchant.supplierId}
            storeId= {selectedMerchant.storeId}
            paymentCollectionTypeId = {props.collectionMethod.id}
          />
        ) : null}
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
      </View>
      {renderModalTransferDate()}
      {renderModalReference()}
      {renderModalBankDestination()}
    </>
  );
};

export default SfaAddTagihanTransfer;

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

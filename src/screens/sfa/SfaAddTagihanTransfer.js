import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput
} from '../../library/reactPackage';
import { TextInputMask } from 'react-native-masked-text';
import { MaterialIcon, moment, MaterialCommunityIcons } from '../../library/thirdPartyPackage';
import { 
  InputType5, 
  DatePickerSpinnerWithMinMaxDate, 
  ModalBottomType4 
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
const SfaAddTagihanTransfer = props => {
  const status = props.status;
  const [noRef, setNoRef] = useState('');
  const [bankSource, setBankSource] = useState('');
  const [issuedDate, setIssuedDate] = useState(new Date())
  const [invalidDate, setInvalidDate] = useState(new Date())
  const [balance, setBalance] = useState(0)
  const [collection, setCollection] = useState(0)
  const [checkMaterai,setCheckMaterai] = useState(false)
  const [openModalTransferDate, setOpenModalTransferDate] = useState(false)

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const openTransferDate = () => {
    setOpenModalTransferDate(true)
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
        <View style={{ marginHorizontal: -16, marginVertical: 16 }}>
            <InputType5
                title={status === 'available' ? 'Nomor Cek' : '*Nomor Referensi'}
                value={noRef}
                placeholder={
                status === 'available' ? 'Nomor Cek' : '*Nomor Referensi'
                }
                keyboardType={'default'}
                text={text => setNoRef(text)}
            />
        </View>
      )
  }

  const renderFormBankSource = () => {
      return(
        <View>
            <Text style={Fonts.type10}>
                {status === 'available' ? 'Sumber Bank' : '*Sumber Bank'}
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
              {status === 'available' ? 'Tujuan Bank' : '*Tujuan Bank'}
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
                      {bankSource === '' ? 'Pilih Tujuan Bank' : bankSource.name}
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
                    {status === 'available' ? 'Tanggal Transfer' : '*Tanggal Transfer'}
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
                                { opacity: bankSource === '' ? 0.5 : null, marginLeft: 11 }
                                ]}
                            >
                                {bankSource === '' ? moment(invalidDate).format('DD/MM/YYYY') : bankSource.name}
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
                <Text style={Fonts.type10}>{status === 'available' ? 'Nilai Transfer' : '*Nilai Transfer'}</Text>
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
                        onChangeText={(text) => console.log(text)}
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
                    value={collection}
                    onChangeText={(text) => console.log(text)}
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
                    {status === 'available' ? 'Unggah Foto/Gambar' : '*Unggah Foto/Gambar'}
                </Text>
            </View>
        )
    }


    /**
   * ==================================
   * MODAL
   * ==================================
   */
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
             onSelect={(date)=> alert(date)}
             close={() => setOpenModalTransferDate(false)}
             minDate={new Date("2021-02-20")}
            //  maxDate={new Date("2021-02-25")}
            />
          </View>
        }
      />
    )
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
  console.log("collection:", props.collectionMethod);
  return (
    <>
      <View style={styles.mainContainer}>
        {renderContent()}
      </View>
      {renderModalTransferDate()}
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
    }
});

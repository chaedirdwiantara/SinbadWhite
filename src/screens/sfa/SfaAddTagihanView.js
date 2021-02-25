import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon,
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
  StatusBarWhite,
  ButtonSingle
} from '../../library/component';
import { TextInputMask } from 'react-native-masked-text';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import * as ActionCreators from '../../state/actions';
import { useDispatch } from 'react-redux';
import ModalCollectionMethod from'./ModalCollectionMethod'
import SfaAddTagihanCheque from './SfaAddTagihanCheque';
import SfaAddTagihanTransfer from './SfaAddTagihanTransfer'

const SfaAddTagihanView = (props) => {
  const dispatch = useDispatch();
  const [collectionMethod, setCollectionMethod] = useState(null)
  const [openCollectionMethod, setOpenCollectionMethod] = useState(false)
  const [cash, setCash] = useState(0)
  const [methodStatus, setMethodStatus] = useState('available')
  const [disabled, setDisabled] = useState(false)

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const selectedCollectionMethod = (data) => {
    setCollectionMethod(data)
    setOpenCollectionMethod(false)
  }

  const selectBilling = () => {
    if (collectionMethod !== null) {
      if (collectionMethod.code === "cash") {
        return renderBillingCash()
      }
      if(collectionMethod.code === 'cheque'){
        return renderBillingCheque()
      }
      if (collectionMethod.code === "transfer") {
        return renderBillingTransfer()
      }
    }
  } 
  
  const textBillingCash = (text) => {
    if (parseInt(text.replace(/[Rp.]+/g, '')) > parseInt(props.navigation.state.params.data.remainingBilling)) {
      setCash(parseInt(props.navigation.state.params.data.remainingBilling))
    } else {
      setCash(parseInt(text.replace(/[Rp.]+/g, '')))
    }
  }

  const saveCollection = () => {
    alert(cash)
  }

  const dataTrasfer = (data) => {
    
  }

  useEffect(() => {
    if (collectionMethod !== null) {
      if (collectionMethod.code === cash) {
        if (cash === 0 || cash === '') {
          setDisabled(true)
        } else {
          setDisabled(false)
        }
      }
    }
  }, [collectionMethod, cash]);

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  const renderFakturInfo = () => {
    return (
        <View style={styles.container}>
          <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
            <View>
              <Text style={Fonts.type48}>Informasi Faktur</Text>
            </View>
            <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
            {renderItemFakturInfo()}
          </View>
        </View>
    )
  }

  const renderItemFakturInfo = () => {
    return (
      <View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Nama Faktur</Text>
          <Text style={Fonts.type17}>{props.navigation.state.params.data.invoiceGroupName}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>No. Pesanan</Text>
          <Text style={Fonts.type17}>{props.navigation.state.params.data.orderCode}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>No. Referensi</Text>
          <Text style={Fonts.type17}>
            {props.navigation.state.params.data.orderRef === null ? "-" : props.navigation.state.params.data.orderRef}
          </Text>
        </View>
      </View>
    )
  }

  const renderCollectionInfo = () => {
    return (
        <View style={styles.container}>
          <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
            <View>
              <Text style={Fonts.type48}>Informasi Tagihan</Text>
            </View>
            <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
            <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
              <Text style={Fonts.type17}>Sisa Tagihan</Text>
              <Text style={Fonts.type22}>{MoneyFormat(props.navigation.state.params.data.remainingBilling)}</Text>
            </View>
          </View>
        </View>
    )
  }

  const renderCollectionDetail = () => {
    return (
        <View style={[styles.container, {marginBottom:16}]}>
          <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
            <View>
              <Text style={Fonts.type48}>Detail Penagihan</Text>
            </View>
            <View style={[GlobalStyle.lines, { flex: 1, marginTop: 8, marginBottom: 16 }]} />
            <View>
              <Text style={Fonts.type10}>Metode Penagihan</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.boxMenu}
                onPress={() => setOpenCollectionMethod(true)}
              >
                <Text style={[Fonts.type17, {opacity: collectionMethod === null ? 0.5 : null}]}>
                  {
                    collectionMethod === null 
                    ? "Pilih Metode Penagihan"
                    : collectionMethod.name
                  }
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
            {selectBilling()}
          </View>
        </View>
    )
  }

  const renderBillingCash = () => {
    return (
      <View style={{marginTop:16}}>
        <View>
          <Text style={Fonts.type10}>Jumlah Penagihan</Text>
        </View>
        <View style={[styles.boxInput, {flexDirection:"row", alignItems:"center"}]}>
          <TextInputMask
            type={'money'}
            options={{
              precision: 0,
              separator: ',',
              delimiter: '.',
              unit: 'Rp ',
              suffixUnit: ''
            }}
            value={cash}
            onChangeText={(text) => textBillingCash(text)}
            style={[
              Fonts.type17,
              {
                width:"95%",
                borderBottomColor: masterColor.fontBlack10
              }
            ]}
          />
        </View>
      </View>
    )
  } 

  /** RENDER CHEQUE PAYMENT */
  const renderBillingCheque = () => {
    return <SfaAddTagihanCheque status={methodStatus}/>
  }

  /** RENDER CHEQUE PAYMENT */
  const renderBillingTransfer = () => {
    return <SfaAddTagihanTransfer collectionMethod={collectionMethod} data={dataTrasfer}/>
  }
  /**
   * =======================
   * MODAL
   * =======================
   */
  const renderModalCollectionMethod = () => {
    return (
      <View>
        {openCollectionMethod ? (
          <ModalCollectionMethod
            open={openCollectionMethod}
            close={() => setOpenCollectionMethod(false)}
            onRef={ref => (selectCollection = ref)}
            selectCollection={selectedCollectionMethod.bind(this)}
          />
        ) : null}
      </View>
    );
  }

  const renderButtonSave= () => {
    return (
      <ButtonSingle
        disabled={cash === 0 || cash === '' ? true : false}
        title={'Simpan'}
        borderRadius={4}
        onPress={() => saveCollection()}
      />
    );
  }

  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderFakturInfo()}
        {renderCollectionInfo()}
        {renderCollectionDetail()}
      </View>
    );
  };

  

  /**
   * =======================
   * MAIN
   * =======================
   */
  console.log("ini dataa:", props.navigation.state.params.data);
  return (
    <>
      {/* {props.merchant.dataGetMerchantDetail ? ( */}
        <SafeAreaView style={styles.mainContainer}>
          <StatusBarWhite />
          <ScrollView style={{ flex: 1}}>
            {renderContent()}
          </ScrollView>
          {renderButtonSave()}
          {renderModalCollectionMethod()}
        </SafeAreaView>
      {/* ) : (
        <LoadingPage />
      )} */}
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  container: {
    marginHorizontal: 16,
    marginTop: 16
  },
  cardTaskList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: masterColor.backgroundWhite
  },
  boxMenu: {
    // paddingHorizontal: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  boxInput: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderBottomColor: masterColor.fontBlack10
  },
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SfaAddTagihanView);

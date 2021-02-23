import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  ButtonSingle, 
  LoadingPage
} from '../../library/component';
import {
  sfaGetDetailProcess,
} from '../../state/actions';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import { useDispatch } from 'react-redux';

function SfaDetailView(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState(
    {
      "data": {
        "id": 1,
        "orderCode": "S010004232321231231",
        "orderRef": "A754123131",
        "invoiceGroupName": "COMBINE",
        "totalBilling": 670000,
        "totalInstorePayment": 335000,
        "totalCollection": 0,
        "remainingBilling": 335000,
        "collections": [
            {
                "name": "Tunai",
                "value": 0
            },
            {
                "name": "Cek",
                "value": 0
            },
            {
                "name": "Giro",
                "value": 0
            },
            {
                "name": "Transfer",
                "value": 0
            },
            {
                "name": "Promo",
                "value": 0
            },
            {
                "name": "Retur",
                "value": 0
            },
            {
                "name": "Materai",
                "value": 0
            }
        ]
      }
    }
  );
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const addCollection = () => {
    NavigationService.navigate('SfaAddTagihanView')
  }

  useEffect(() => {
    const orderParcelId = parseInt(props.navigation.state.params.orderParcelId);
    dispatch(sfaGetDetailProcess(orderParcelId));
  }, [dispatch]);

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
    const detailSfa = props.sfa.dataSfaGetDetail.data
    return (
      <View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Nama Faktur</Text>
          <Text style={Fonts.type17}>{detailSfa.invoiceGroupName}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>No. Pesanan</Text>
          <Text style={Fonts.type17}>{detailSfa.orderCode}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>No. Referensi</Text>
          <Text style={Fonts.type17}>
            {detailSfa.orderRef === null || detailSfa.orderRef === "" ? "-" : detailSfa.orderRef}
          </Text>
        </View>
      </View>
    )
  }

  const renderCollectionInfo = () => {
    return (
        <View style={[styles.container, {marginBottom:16}]}>
          <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
            <View>
              <Text style={Fonts.type48}>Informasi Tagihan</Text>
            </View>
            <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
            {renderItemCollectionInfo()}
            <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
            {renderCollectionDetail()}
            <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
            {renderCollectionOutstanding()}
          </View>
        </View>
    )
  }

  const renderItemCollectionInfo = () => {
    const detailSfa = props.sfa.dataSfaGetDetail.data
    return (
      <View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Total Tagihan</Text>
          <Text style={Fonts.type17}>{MoneyFormat(detailSfa.totalBilling)}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Pembayaran Dari Toko</Text>
          <Text style={Fonts.type17}>{MoneyFormat(detailSfa.totalInStorePayment)}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Total Penagihan</Text>
          <Text style={Fonts.type17}>{MoneyFormat(detailSfa.totalCollection)}</Text>
        </View>
      </View>
    )
  }

  const renderCollectionDetail = () => {
    return props.sfa.dataSfaGetDetail.data.collections.map((item, index) => {
      return (
        <View key={index} style={{marginLeft:8}}>
          <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
            <Text style={Fonts.type17}>{item.name}</Text>
            <Text style={Fonts.type17}>
              {
                item.value === 0 
                ? "-"
                : MoneyFormat(item.value)
              }
            </Text>
          </View>
        </View>
      )
    })
  }

  const renderCollectionOutstanding = () => {
    return(
      <View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Outstanding</Text>
          <Text style={Fonts.type22}>{MoneyFormat(props.sfa.dataSfaGetDetail.data.remainingBilling)}</Text>
        </View>
      </View>
    )
  }

  const renderAddCollection= () => {
    return (
      <ButtonSingle
        disabled={false}
        title={'Tagih'}
        borderRadius={4}
        onPress={() => addCollection()}
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
      </View>
    );
  };

  

  /**
   * =======================
   * MAIN
   * =======================
   */
  console.log("ordeParcelId:", props.navigation.state.params.orderParcelId);
  console.log("ini data:", props.sfa.dataSfaGetDetail);
  return (
    <>
      {props.sfa.dataSfaGetDetail ? (
        <SafeAreaView style={styles.mainContainer}>
          <StatusBarWhite />
          <ScrollView style={{ flex: 1}}>
            {renderContent()}
          </ScrollView>
          {renderAddCollection()}
        </SafeAreaView>
       ) : (
        <LoadingPage />
      )} 
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
});

const mapStateToProps = ({ user, merchant, sfa }) => {
  return { user, merchant, sfa };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SfaDetailView);
// export default DMSView;

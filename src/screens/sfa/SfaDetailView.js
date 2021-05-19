import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  TouchableWithoutFeedback
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon
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
import { useDispatch , useSelector} from 'react-redux';

function SfaDetailView(props) {
  const dispatch = useDispatch();
  const { dataSfaGetDetail } = useSelector(state => state.sfa);
  const [accordionOpen, setAccordionOpen] = useState(false)
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const addCollection = () => {
    NavigationService.navigate('SfaAddTagihanView', {data: dataSfaGetDetail.data})
  }

  useEffect(() => {
    const orderParcelId = parseInt(props.navigation.state.params.orderParcelId);
    dispatch(sfaGetDetailProcess(orderParcelId));
  }, [dispatch]);

  const openAccordion = (event) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        375,
        LayoutAnimation.Types.easeIn,
        LayoutAnimation.Properties.opacity
      )
    );

    setAccordionOpen(event)
  }

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
    const detailSfa = dataSfaGetDetail.data
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
    const detailSfa = dataSfaGetDetail.data
    return (
      <View key={1}>
        <TouchableWithoutFeedback onPress={() => openAccordion(!accordionOpen)}>
          <View style={{flexDirection:"row", marginBottom: 4, justifyContent:"space-between"}}>
            <View style={{flexDirection:"row", justifyContent:"space-around"}}>
              {
                accordionOpen === true ? (
                    <MaterialIcon
                      name="keyboard-arrow-up"
                      color={masterColor.fontBlack50}
                      size={24}
                      style={{marginTop:-4, marginLeft: -4, marginRight: 6}}
                    />
                  ) : (
                    <MaterialIcon
                      name="keyboard-arrow-down"
                      color={masterColor.fontBlack50}
                      size={24}
                      style={{marginTop:-4, marginLeft: -4, marginRight: 6}}
                    />
                  )
              }
              <Text style={Fonts.type17}>Total Tagihan</Text>
            </View>
            <Text style={Fonts.type17}>{MoneyFormat(detailSfa.totalBilling)}</Text>
          </View>
        </TouchableWithoutFeedback>
        {renderAccordion()}
        <View style={[GlobalStyle.lines, { flex: 1, marginBottom: 8 }]} />

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
    return dataSfaGetDetail.data.collections.map((item, index) => {
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
          <Text style={Fonts.type22}>{MoneyFormat(dataSfaGetDetail.data.remainingBilling)}</Text>
        </View>
      </View>
    )
  }

  const renderAddCollection= () => {
    return (
      <ButtonSingle
        disabled={dataSfaGetDetail.data.isPaid || dataSfaGetDetail.data.remainingBilling === 0}
        title={'Tagih'}
        borderRadius={4}
        onPress={() => addCollection()}
      />
    );
  }

  const renderAccordion = () => {
    if (accordionOpen === true) {
      return(
        <View>
          <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
            <Text style={Fonts.type17}>{`Total Barang (${dataSfaGetDetail.data.parcelQty})`}</Text>
            <Text style={Fonts.type17}>{MoneyFormat(dataSfaGetDetail.data.parcelGrossPrice)}</Text>
          </View>
          {
            dataSfaGetDetail.data.promoList !== null 
            ? renderPromo()
            : null
          }
          <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
            <Text style={Fonts.type17}>Ongkos Kirim</Text>
            <Text style={Fonts.type17}>{MoneyFormat(0)}</Text>
          </View>
          <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
            <Text style={Fonts.type17}>PPN 10%</Text>
            <Text style={Fonts.type17}>{MoneyFormat(dataSfaGetDetail.data.parcelTaxes)}</Text>
          </View>
        </View>
      )
    }
  }

  const renderPromo = () => {
    return dataSfaGetDetail.data.promoList.map((item, index) => {
      return(
        <View key={index} style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={[Fonts.type51, {width:"80%"}]}>
            {
              item.promoValue !== null
              ? item.promoName
              : `${item.catalogueName} (${item.promoQty} Pcs)`
            }
          </Text>
          <Text style={Fonts.type51}>
            {
              item.promoValue !== null
              ? `- ${MoneyFormat(item.promoValue)}`
              : 'FREE'
            }
          </Text>
        </View>
      )
    })
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
  return (
    <>
      {dataSfaGetDetail ? (
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

export const HeaderRightOption = props => {

  return (
    <View style={styles.navOption}>
      <>
        <TouchableOpacity onPress={()=> NavigationService.navigate('SfaCollectionLog')}>
          <MaterialIcon
            name="restore"
            size={28}
            style={{ color: masterColor.fontBlack50 , marginRight: 10 }}
          />
        </TouchableOpacity>
      </>
    </View>
  );
};

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
  navOption: {
    flex: 1,
    paddingHorizontal: 10
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapDispatchToProps
)(SfaDetailView);
// export default DMSView;

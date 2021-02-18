import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
  StatusBarWhite,
  ButtonSingle
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';

function SfaDetailView(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState(
    {
      fakturInfo : {
        fakturName: "COMBINE",
        noPesanan: "S0100038289100137",
        noRef: "A75472883"
      },
      tagihanInfo : {
        firstSaldo : 2000000,
        sinbadBilling: 500000,
        totalBilling: 0,
        metodePenagihan: {
          tunai: null, 
          cek: null, 
          giro: null, 
          transfer: null, 
          voucher: null, 
          promotion: null, 
          retur: null, 
          materai: null
        },
        outStanding: 1500000
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
          <Text style={Fonts.type17}>{data.fakturInfo.fakturName}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>No. Pesanan</Text>
          <Text style={Fonts.type17}>{data.fakturInfo.noPesanan}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>No. Referensi</Text>
          <Text style={Fonts.type17}>{data.fakturInfo.noRef}</Text>
        </View>
      </View>
    )
  }

  const renderTagihanInfo = () => {
    return (
        <View style={[styles.container, {marginBottom:16}]}>
          <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
            <View>
              <Text style={Fonts.type48}>Informasi Tagihan</Text>
            </View>
            <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
            {renderItemTagihanInfo()}
            <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
            {renderTagihanDetail()}
            <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
            {renderTagihanOutstanding()}
          </View>
        </View>
    )
  }

  const renderItemTagihanInfo = () => {
    return (
      <View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>First Saldo</Text>
          <Text style={Fonts.type17}>{MoneyFormat(data.tagihanInfo.firstSaldo)}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Pembayaran Dari Toko</Text>
          <Text style={Fonts.type17}>{MoneyFormat(data.tagihanInfo.sinbadBilling)}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Total Penagihan</Text>
          <Text style={Fonts.type17}>{MoneyFormat(data.tagihanInfo.totalBilling)}</Text>
        </View>
      </View>
    )
  }

  const renderTagihanDetail = () => {
    return (
      <View style={{marginLeft:8}}>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Tunai</Text>
          <Text style={Fonts.type17}>{data.tagihanInfo.metodePenagihan.tunai}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Cek</Text>
          <Text style={Fonts.type17}>{data.tagihanInfo.metodePenagihan.cek}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Giro</Text>
          <Text style={Fonts.type17}>{data.tagihanInfo.metodePenagihan.giro}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Transfer</Text>
          <Text style={Fonts.type17}>{data.tagihanInfo.metodePenagihan.transfer}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Voucher</Text>
          <Text style={Fonts.type17}>{data.tagihanInfo.metodePenagihan.voucher}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Promotion</Text>
          <Text style={Fonts.type17}>{data.tagihanInfo.metodePenagihan.promotion}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Retur</Text>
          <Text style={Fonts.type17}>{data.tagihanInfo.metodePenagihan.retur}</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Meterai</Text>
          <Text style={Fonts.type17}>{data.tagihanInfo.metodePenagihan.materai}</Text>
        </View>
      </View>
    )
  }

  const renderTagihanOutstanding = () => {
    return(
      <View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>Outstanding</Text>
          <Text style={Fonts.type22}>{MoneyFormat(data.tagihanInfo.outStanding)}</Text>
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
        {renderTagihanInfo()}
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
      {/* {props.merchant.dataGetMerchantDetail ? ( */}
        <SafeAreaView style={styles.mainContainer}>
          <StatusBarWhite />
          <ScrollView style={{ flex: 1}}>
            {renderContent()}
          </ScrollView>
          {renderAddCollection()}
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
  navOption: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  cardTaskList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: masterColor.backgroundWhite
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
)(SfaDetailView);
// export default DMSView;

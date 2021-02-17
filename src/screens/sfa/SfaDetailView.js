import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
  StatusBarWhite
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
      }
    }
    );
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

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
          <Text style={Fonts.type17}>test</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>No. Pesanan</Text>
          <Text style={Fonts.type17}>test</Text>
        </View>
        <View style={{flexDirection:"row", marginBottom: 8, justifyContent: "space-between"}}>
          <Text style={Fonts.type17}>No. Referensi</Text>
          <Text style={Fonts.type17}>test</Text>
        </View>
      </View>
    )
  }

  const renderTagihanInfo = () => {
    return (
        <View style={styles.container}>
          <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
            <View>
              <Text style={Fonts.type48}>Informasi Tagihan</Text>
            </View>
            <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          </View>
        </View>
    )
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
          <View style={{ flex: 1 }}>
            {renderContent()}
          </View>
        </SafeAreaView>
      {/* ) : (
        <LoadingPage />
      )} */}
    </>
  );
}

/**
 * =======================
 * HEADER MODIFY
 * =======================
 */
export const NavOptionRight = props => {
  return (
    <View style={styles.navOption}>
      <Text style={[Fonts.type21, {marginRight: 16}]}>Tagih</Text>
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

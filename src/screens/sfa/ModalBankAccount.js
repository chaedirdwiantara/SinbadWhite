import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon,
  Modal
} from '../../library/thirdPartyPackage';
import { LoadingPage } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { sfaGetAllBankProcess } from '../../state/actions';

function ModalBankAccount(props) {
  const dispatch = useDispatch();
  const {
    dataSfaGetAllBank,
    loadingSfaGetAllBank
   } = useSelector(state => state.sfa);
  
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
 
   useEffect(() => {
     getBankAccount()
   }, []);

   /** GET BANK ACCOUNT LIST DATA */
      const getBankAccount = () => {
     dispatch(sfaGetAllBankProcess())
   }
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  const renderHeader = () => {
    return(
      <View style={styles.headerContainer}>
        <View style={[styles.headerContent]}>
          <View style={[styles.headerBody]}>
            <TouchableOpacity onPress={props.close}>
              <View>
                <MaterialIcon
                  name="arrow-back"
                  size={24}
                  color={masterColor.fontBlack50}
                  style={{
                    marginBottom: 8,
                    marginLeft: 8,
                    alignContent: 'flex-start'
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-start', flex: 1, alignSelf:"center" }}>
            <Text style={[Fonts.type5, {marginLeft: 16}]}>
              { props?.title ? props?.title : 'Sumber Bank' }
            </Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, styles.shadowLine]} />
      </View>
    )
  }


  const renderCollectionMethod = () => {
    const data = dataSfaGetAllBank;
    if (data)
  {  return data.data.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => props.selectCollection(item)}>
            <View style={{ margin: 16 }}>
              <Text style={Fonts.type24}>{item.displayName}</Text>
            </View>
            <View style={GlobalStyle.lines} />
          </TouchableOpacity>
        </View>
      );
    })}
  };

  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
    return (
      <>
        <View style={styles.contentContainer}>
          {!loadingSfaGetAllBank && dataSfaGetAllBank? renderCollectionMethod() : <LoadingPage />}
        </View>
      </>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <View style={{ flex: 1 }}>
      <Modal
        style={{ flex: 1 }}
        isVisible={props.open}
        coverScreen={true}
        hasBackdrop={true}
        useNativeDriver={true}
        backdropOpacity={0.4}
        style={styles.mainContainer}
        onPress={props.close}
      >
        {renderHeader()}
        {renderContent()}
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  },
  headerContainer: {
    backgroundColor: masterColor.backgroundWhite,
    height: 56,
    justifyContent: 'center'
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerBody: {
    marginHorizontal: 8,
    marginVertical: 16
  },
  contentContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  shadowLine: {
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2
  }
});

export default ModalBankAccount;

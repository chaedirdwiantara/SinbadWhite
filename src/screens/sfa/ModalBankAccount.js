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
import { SearchBarType1, LoadingPage } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import * as ActionCreators from '../../state/actions';
import { useDispatch, useSelector } from 'react-redux';

function ModalBankAccount(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    data: [
      {
        id: 1,
        bankCode: 'BCA',
        bankName: '014',
        displayName: 'Bank BCA'
      },
      {
        id: 2,
        bankCode: 'BNI',
        bankName: '009',
        displayName: 'Bank BNI'
      },
      {
        id: 3,
        bankCode: 'Mandiri',
        bankName: '008',
        displayName: 'Bank Mandiri'
      },
      {
        id: 4,
        bankCode: 'BRI',
        bankName: '002',
        displayName: 'Bank BRI'
      }
    ]
  });

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /* necessary lines for Integrate task later
//   useEffect(() => {
//     getBankAccount()
//   }, []);
/* necessary lines for Integrate task later
   /** GET BANK ACCOUNT LIST DATA */
  //    const getBankAccount = () => {
  //     dispatch(sfaGetBankAccountProcess(data))
  //   }

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
            <Text style={[Fonts.type5, {marginLeft: 16}]}>Sumber Bank</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, styles.shadowLine]} />
      </View>
    )
  }


  const renderCollectionMethod = () => {
    const data = data;
    return data.data.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => props.selectCollection(item)}>
            <View style={{ margin: 16 }}>
              <Text style={Fonts.type24}>{item.referenceCode}</Text>
              {item.balance > 0 ? (
                <Text style={[Fonts.type22, { marginTop: 5 }]}>
                  Saldo: {MoneyFormat(item.balance)}
                </Text>
              ) : null}
            </View>
            <View style={GlobalStyle.lines} />
          </TouchableOpacity>
        </View>
      );
    });
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
          {data ? renderCollectionMethod() : <LoadingPage />}
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

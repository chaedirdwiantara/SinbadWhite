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

function ModalListMaterai(props) {
  const dispatch = useDispatch();
  const [dataStamp, setDataStamp] = useState({
        "data": [
            {
                "id": 1,
                "name": "Rp3.000",
                "nominal": 3000
            },
            {
                "id": 2,
                "name": "Rp6.000",
                "nominal": 6000
            },
            {
                "id": 3,
                "name": "Rp9.000",
                "nominal": 9000
            },
            {
                "id": 4,
                "name": "Rp10.000",
                "nominal": 10000
            },
            {
                "id": 5,
                "name": "Rp12.000",
                "nominal": 12000
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
            <Text style={[Fonts.type5, {marginLeft: 16}]}>Nilai Materai</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, styles.shadowLine]} />
      </View>
    )
  }


  const renderCollectionMethod = () => {
    const data = dataStamp;
    return data.data.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => props.selectStamp(item)}>
            <View style={{ margin: 16 }}>
              <Text style={Fonts.type24}>{item.name}</Text>
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
          {dataStamp ? renderCollectionMethod() : <LoadingPage />}
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

export default ModalListMaterai;

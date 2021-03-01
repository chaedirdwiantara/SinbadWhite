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

function ModalBankDestination(props) {
  const dispatch = useDispatch();
  const [dataBank, setDataBank] = useState({
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
                    marginLeft: 8,
                    alignContent: 'flex-start'
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-start', flex: 1, alignSelf:"center" }}>
            <Text style={[Fonts.type5, {marginLeft: 16}]}>Tujuan Bank</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, styles.shadowLine]} />
      </View>
    )
  }


  const renderCollectionMethod = () => {
    console.log(dataBank, 'data state');
    const data = dataBank;
    return data.data.map((item, index) => {
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
          {dataBank ? renderCollectionMethod() : <LoadingPage />}
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  export default connect(
    mapDispatchToProps
  )(ModalBankDestination);

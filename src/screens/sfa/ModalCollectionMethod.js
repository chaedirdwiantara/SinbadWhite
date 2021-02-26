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
  Modal,
} from '../../library/thirdPartyPackage';
import {
  LoadingPage
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import * as ActionCreators from '../../state/actions';
import { useDispatch , useSelector} from 'react-redux';
import { sfaGetPaymentMethodProcess } from '../../state/actions';

function ModalCollectionMethod(props) {
  const dispatch = useDispatch();
  const { dataSfaGetPaymentMethod} = useSelector(state => state.sfa);
  const [data, setData] = useState({
    "data": [
      {
        "id": 1,
        "name": "Tunai",
        "code": "cash",
        "status": "active",
        "balance": 0
      },
      {
        "id": 2,
        "name": "Cek",
        "code": "cheque",
        "status": "active",
        "balance": 1000000
      },
      {
        "id": 3,
        "name": "Giro",
        "code": "giro",
        "status": "active",
        "balance": 0
      },
      {
        "id": 4,
        "name": "Transfer",
        "code": "transfer",
        "status": "active",
        "balance": 0
      },
      {
        "id": 5,
        "name": "Promo",
        "code": "promo",
        "status": "active",
        "balance": 0
      },
      {
        "id": 6,
        "name": "Retur",
        "code": "sales_return",
        "status": "disabled",
        "balance": 0
      }
	  ]
  })
 

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  useEffect(() => {
    const data = {
      supplierId : 2,
      storeId: 101
    }
    dispatch(sfaGetPaymentMethodProcess(data))
  }, []);

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
            <Text style={[Fonts.type5, {marginLeft: 16}]}>Metode Penagihan</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, styles.shadowLine]} />
      </View>
    )
  }

  const renderCollectionMethod = () => {
    return data.data.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity 
            disabled={item.status === "disabled" ? true : false} 
            onPress={() => props.selectCollection(item)}
            style={{backgroundColor: item.status === "disabled" ? masterColor.fontBlack10 : null}}
          >
            <View style={{margin: 16, opacity: item.status === "disabled" ? 0.5 : null}}>
              <Text style={Fonts.type24}>{item.name}</Text>
              {
                item.balance > 0 
                ? <Text style={[Fonts.type22, {marginTop: 5}]}>Saldo: {MoneyFormat(item.balance)}</Text>
                : null
              }
            </View>
            <View style={GlobalStyle.lines} />
          </TouchableOpacity>
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
      <View style={styles.contentContainer}>
        {/* {renderHeader()} */}
        {renderCollectionMethod()}
      </View>
    );
  };

  

  /**
   * =======================
   * MAIN
   * =======================
   */
  console.log("disini:",dataSfaGetPaymentMethod);
  return (
    <View style={{flex:1}}>
        <Modal
          style={{flex: 1}}
          isVisible={props.open}
          coverScreen={true}
          hasBackdrop={true}
          useNativeDriver={true}
          backdropOpacity={0.4}
          style={styles.mainContainer}
          onPress={props.close}
        >
          <View style={styles.contentContainer}>
          {renderHeader()}
            {
              dataSfaGetPaymentMethod !== null
              ? renderContent()
              : <LoadingPage />
            }
          </View>
        </Modal>
      </View>
  );
}
const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      backgroundColor: masterColor.backgroundWhite,
    },
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
        flexDirection: 'row'
    },
    headerBody: {
        marginHorizontal: 8,
        marginVertical: 16
    },
    contentContainer: {
        flex: 1,
        backgroundColor: masterColor.backgroundWhite,
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
)(ModalCollectionMethod);

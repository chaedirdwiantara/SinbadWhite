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
import { sfaGetBankAccountProcess } from '../../state/actions';

function ModalPrincipal(props) {
  const dispatch = useDispatch();
//   const { dataSfaGetBankAccount} = useSelector(state => state.sfa);

const [dataPrincipal, setDataPrincipal] = useState([
    {id: 1, name: "Asahi"},
    {id: 2, name: "Frisian Flag"},
])

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  useEffect(() => {
    dispatch(sfaGetBankAccountProcess())
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
                    marginLeft: 8,
                    alignContent: 'flex-start'
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-start', flex: 1, alignSelf:"center" }}>
            <Text style={[Fonts.type5, {marginLeft: 16}]}>Principal</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, styles.shadowLine]} />
      </View>
    )
  }


  const renderPrincipal = () => {
    // const data = dataSfaGetBankAccount;
    return dataPrincipal.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => props.selectPrincipal(item)}>
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
            {renderPrincipal()}
          {/* {dataSfaGetBankAccount ? renderCollectionMethod() : <LoadingPage />} */}
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
  )(ModalPrincipal);

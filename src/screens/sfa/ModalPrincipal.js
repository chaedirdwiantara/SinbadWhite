import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon,
  Modal
} from '../../library/thirdPartyPackage';
import { SearchBarType1, LoadingPage, LoadingLoadMore } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import * as ActionCreators from '../../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import { sfaGetPrincipalProcess, sfaPrincipalLoadmoreProcess } from '../../state/actions';
import SfaNoDataView from './SfaNoDataView';

function ModalPrincipal(props) {
  const dispatch = useDispatch();
  const { dataSfaGetPrincipal, loadingLoadmorePrincipal, loadingSfaGetPrincipal} = useSelector(state => state.sfa);
  const { selectedMerchant} = useSelector(state => state.merchant);
  const { userSuppliers } = useSelector(state => state.user);
  const [limit, setLimit] = useState(20)
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  useEffect(() => {
    dispatch(sfaGetPrincipalProcess(
      {
        supplierId: parseInt(userSuppliers[0].supplier.id), 
        limit: limit, 
        skip: 0
      }
    ))
  }, []);

  const loadMore = () => {
    if (dataSfaGetPrincipal) {
      if (
        dataSfaGetPrincipal.data.length <
        dataSfaGetPrincipal.meta.total
      ) {
        const page = limit + 10;
        setLimit(page)
        dispatch(sfaPrincipalLoadmoreProcess({
          supplierId: parseInt(userSuppliers[0].supplier.id), 
          limit: page, 
          skip: 1
        }))
      }
    }
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
    return dataSfaGetPrincipal && !loadingSfaGetPrincipal ? (
      dataSfaGetPrincipal.data.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={dataSfaGetPrincipal.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            onEndReachedThreshold={0.2}
            onEndReached={()=>loadMore()}
            showsVerticalScrollIndicator
          />
          {loadingLoadmorePrincipal ? <LoadingLoadMore /> : null}
        </View>
      ) : (
        <View style={{ marginTop: '30%' }}>
          <SfaNoDataView />
        </View>
      )
    ) : <LoadingPage />
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index}>
          <TouchableOpacity onPress={() => props.selectPrincipal(item)}>
            <View style={{ margin: 16 }}>
              <Text style={Fonts.type24}>{item.name}</Text>
            </View>
            <View style={GlobalStyle.lines} />
          </TouchableOpacity>
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
      <>
        <View style={styles.contentContainer}>
            {renderPrincipal()}
          {/* {dataSfaGetPrincipal ? renderPrincipal() : <LoadingPage />} */}
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

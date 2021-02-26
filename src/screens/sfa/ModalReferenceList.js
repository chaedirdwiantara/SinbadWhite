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
    SearchBarType1,
    LoadingPage
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import * as ActionCreators from '../../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import { sfaGetReferenceListProcess } from '../../state/actions';
import SfaNoDataView from './SfaNoDataView';

function ModalReferenceList(props) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('')
  const {
    dataGetReferenceList
   } = useSelector(state => state.sfa);


  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  useEffect(() => {
    getReference()
  }, []);

   /** GET REFERENCE LIST DATA */
   const getReference = () => {
     console.log(props, 'props');
    const data = {
      supplierId : props.supplierId,
      storeId: props.storeId,
      paymentCollectionTypeId: props.paymentCollectionTypeId,
      limit: 20
    }
    dispatch(sfaGetReferenceListProcess(data))
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
            <TouchableOpacity onPress={props.close} style={{flex: 1}}>
              <View>
                <MaterialIcon
                  name="arrow-back"
                  size={24}
                  color={masterColor.fontBlack50}
                  style={{
                    marginBottom: 8,
                    marginLeft: 8,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: '90%', marginLeft: -8}}>
          <SearchBarType1
              placeholder={'Cari Cek Disini'}
              searchText={searchText}
              // onRef={ref => (this.parentFunction = ref)}
              // parentFunction={this.parentFunction.bind(this)}
            />
          </View>
        </View>
        <View style={[GlobalStyle.lines, styles.shadowLine]} />
      </View>
    )
  }

  const renderCollectionMethod = () => {
    const data = dataGetReferenceList
    if( data.data)
   { return data.data.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => props.selectCollection(item)}>
            <View style={{margin: 16}}>
              <Text style={Fonts.type24}>{item.referenceCode}</Text>
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
    })}
    else {
      return <SfaNoDataView />
    }
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
        {dataGetReferenceList?  
         
        renderCollectionMethod()
     : <LoadingPage/>}
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
        alignItems:'center'
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

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalReferenceList);
// export default DMSView;

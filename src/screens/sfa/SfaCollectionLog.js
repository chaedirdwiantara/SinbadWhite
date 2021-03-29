import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
    StatusBarWhite,
    LoadingPage,
    LoadingLoadMore
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import SfaNoDataView from './SfaNoDataView';
import { useDispatch , useSelector} from 'react-redux';
import {
    sfaGetCollectionLogProcess,
    sfaCollectionLogLoadmoreProcess
} from '../../state/actions';

function SfaCollectionLog(props) {
    const dispatch = useDispatch();
    const { 
        dataSfaGetCollectionLog, 
        loadingLoadmoreCollectionLog,
        dataSfaGetDetail
    } = useSelector(state => state.sfa);
    const { selectedMerchant } = useSelector(state => state.merchant);
    const [limit, setLimit] = useState(20)
    
    /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

    useEffect(() => {
        const data = {
            storeId: parseInt(selectedMerchant.storeId),
            orderParcelId: dataSfaGetDetail.data.id,
            limit: limit,
            skip: 0
        }
        dispatch(sfaGetCollectionLogProcess(data));
      }, []);

      const loadMore = () => {
        if (dataSfaGetCollectionLog) {
          if (
            dataSfaGetCollectionLog.data.length <
            dataSfaGetCollectionLog.meta.total
          ) {
            const page = limit + 10;
            setLimit(page)
            dispatch(sfaCollectionLogLoadmoreProcess({
                storeId: parseInt(selectedMerchant.storeId),
                orderParcelId: dataSfaGetDetail.data.id,
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

    //**RENDER ITEM */
    const renderItem = ({item, index}) => {
        return(
            <View key={index}>
                    <TouchableOpacity onPress={()=> NavigationService.navigate('SfaCollectionDetailView')}>
                        <View style={{flexDirection: "row", justifyContent:"space-between", marginHorizontal:16, marginVertical: 16}}>
                            <View style={{flex: 2}}>
                                <Text style={{...Fonts.type42, marginBottom: 8}}>{item.salesName}</Text>
                                <Text style={Fonts.type17}>{item.createdAt} WIB</Text>
                            </View>
                            <View style={{flex: 1, flexDirection:"row", justifyContent:"space-between"}}>
                                <View style={{marginLeft: 16}}>
                                    <Text style={{...Fonts.type36, marginBottom: 8}}>{MoneyFormat(item.amount)}</Text>
                                    <Text style={[Fonts.type17, {textAlign:"right"}]}>{item.paymentCollectionMethodName}</Text>
                                </View>
                                <View style={{alignSelf:"center"}}>
                                    <MaterialIcon
                                        name="chevron-right"
                                        color={masterColor.fontBlack40}
                                        size={24}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{...GlobalStyle.lines, marginLeft: 16}} />
                    </TouchableOpacity>
                </View>
        )
    }

    /** === RENDER COLLECTIONLIST === */
    const renderCollectionList = () => {
            return(
                <View style={styles.container}>
                { dataSfaGetCollectionLog ?
                    dataSfaGetCollectionLog.data !== null ? (
                        <FlatList
                            data={dataSfaGetCollectionLog.data}
                            renderItem={renderItem}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => loadMore()}
                            showsVerticalScrollIndicator
                        />
                    ) : (
                        <View style={{ marginTop: '20%' }}>
                            <SfaNoDataView
                                topText={"Tidak Ada Transaksi"}
                                midText={'Belum ada transaksi yang telah dilakukan'}
                                bottomText={""}
                            />
                        </View>
                    )
                :
                    <LoadingPage />
                }
                {loadingLoadmoreCollectionLog ? <LoadingLoadMore /> : null}
                </View>
            )
    }
    /** === RENDER CONTENT === */
    const renderContent = () =>{
        return(
            <View style={styles.container}>
                {renderCollectionList()}
            </View>
        )
    }


    /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <View style={styles.mainContainer}>
        <StatusBarWhite />
        <View style={styles.container}>
            {renderContent()}
        </View>
    </View>
  );

}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: masterColor.backgroundWhite
    },
    container: {
        flex: 1,
    }
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  export default connect(
    mapDispatchToProps
  )(SfaCollectionLog);
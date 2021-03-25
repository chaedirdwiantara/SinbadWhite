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
    StatusBarWhite
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';

function SfaCollectionLog(props) {
    const [collectionLog, setCollectionLog] = useState({
        data : [
            {
                storeId: 1,
                orderParcelId: 1,
                salesName: "Dian Mandala Putra",
                updatedAt: "2021-03-25 06:49:18",
                amount: 50000,
                paymentMethod: {
                    id: 19,
                    type: "promo"
                }
            },
            {
                storeId: 1,
                orderParcelId: 1,
                salesName: "Dian Mandala Putra",
                updatedAt: "2021-03-25 06:49:18",
                amount: 50000,
                paymentMethod: {
                    id: 19,
                    type: "promo"
                }
            },
        ],
    })
    /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
    const capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }
    

    /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

    /** === RENDER COLLECTIONLIST === */
    const renderCollectionList = () => {
        return collectionLog.data.map((item, index) => {
            return(
                <View key={index}>
                    <TouchableOpacity>
                        <View style={{flexDirection: "row", justifyContent:"space-between", marginHorizontal:16, marginVertical: 16}}>
                            <View>
                                <Text style={{...Fonts.type42, marginBottom: 8}}>{item.salesName}</Text>
                                <Text style={Fonts.type17}>{item.updatedAt} WIB</Text>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                <View style={{marginRight: 24}}>
                                    <Text style={{...Fonts.type36, marginBottom: 8}}>{MoneyFormat(item.amount)}</Text>
                                    <Text style={Fonts.type17}>{capitalizeFirstLetter(item.paymentMethod.type)}</Text>
                                </View>
                                <MaterialIcon
                                    name="chevron-right"
                                    color={masterColor.fontBlack40}
                                    size={24}
                                    style={{alignSelf:"center"}}
                                />
                            </View>
                        </View>
                        <View style={{...GlobalStyle.lines, marginLeft: 16}} />
                    </TouchableOpacity>
                </View>
            )
        })
    }
    /** === RENDER CONTENT === */
    const renderContent = () =>{
        return(
            <View>
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
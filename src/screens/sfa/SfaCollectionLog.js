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
                salesmanName: "salesman Udin",
                collectionDate: moment(new Date()).format("DD MMM YYYY HH:mm"),
                totalCollection: 15000,
                collectionMethod: {
                    id: 1,
                    code: "cash"
                }
            },
            {
                salesmanName: "salesman Asep",
                collectionDate: moment(new Date()).format("DD MMM YYYY HH:mm"),
                totalCollection: 15000,
                collectionMethod: {
                    id: 1,
                    code: "cash"
                }
            },
        ]
    })
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

    /** === RENDER COLLECTIONLIST === */
    const renderCollectionList = () => {
        return collectionLog.data.map((item, index) => {
            return(
                <View key={index}>
                    <TouchableOpacity>
                        <View style={{flexDirection: "row", justifyContent:"space-between", marginHorizontal:16, marginVertical: 16}}>
                            <View>
                                <Text>{item.salesmanName}</Text>
                                <Text>{item.collectionDate} WIB</Text>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                <View style={{marginRight: 24}}>
                                    <Text>{item.totalCollection}</Text>
                                    <Text>{item.collectionMethod.code}</Text>
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
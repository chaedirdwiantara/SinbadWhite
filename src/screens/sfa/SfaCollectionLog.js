import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';

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
        return(
            <View>
                <Text>{collectionLog.collectionDate}</Text>
            </View>
        )
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
    <View>
        <StatusBarWhite />
        <View style={{ flex: 1 }}>{renderContent()}</View>
    </View>
  );

}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  export default connect(
    mapDispatchToProps
  )(SfaCollectionLog);
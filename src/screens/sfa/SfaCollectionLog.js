import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
    StatusBarWhite
} from '../../library/component';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';

function SfaCollectionLog(props) {
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
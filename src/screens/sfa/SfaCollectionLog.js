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
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';

function SfaCollectionLog(props) {

    /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <View>
        <TouchableOpacity onPress={()=> NavigationService.navigate('SfaCollectionDetailView')}>
            <Text>Go To Added collection</Text>
        </TouchableOpacity>
    </View>
  );

}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  export default connect(
    mapDispatchToProps
  )(SfaCollectionLog);
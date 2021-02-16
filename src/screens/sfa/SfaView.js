import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';

function SfaView(props) {
  const dispatch = useDispatch();

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
  const renderHeader = () => {
    return (
        <View>
            <TouchableOpacity onPress={() => NavigationService.navigate('SfaDetailView')}>
                <Text>Header</Text>
            </TouchableOpacity>
        </View>
    )
  }

  const renderBody = () => {
    return (
        <View>
            <Text>Body</Text>
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
      <View style={{ flex: 1 }}>
        {renderHeader()}
        {renderBody()}
      </View>
    );
  };

  

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      {/* {props.merchant.dataGetMerchantDetail ? ( */}
        <SafeAreaView style={styles.mainContainer}>
          <View style={{ flex: 1 }}>
            {renderContent()}
          </View>
        </SafeAreaView>
      {/* ) : (
        <LoadingPage />
      )} */}
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
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
)(SfaView);
// export default DMSView;

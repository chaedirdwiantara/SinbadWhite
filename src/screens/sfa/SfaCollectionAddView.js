import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from '../../library/reactPackage';
import { MaterialIcon, moment } from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor.json';
import { GlobalStyle, Fonts, MoneyFormatSpace } from '../../helpers';
import {
  APPROVED,
  REJECTED,
  PENDING
} from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';
import { ButtonSingle } from '../../library/component';

const SfaCollectionAddView = props => {
  return (
    <>
      <View>
        <Text>Add Collection</Text>
      </View>
    </>
  );
};

export default SfaCollectionAddView;

import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from '../../../library/reactPackage';
import { MaterialIcon } from '../../../library/thirdPartyPackage';
import NavigationService from '../../../navigation/NavigationService';
import masterColor from '../../../config/masterColor.json';
import { ModalConfirmation } from '../../../library/component';

/** === HEADER === */
export const HeaderLeftOption = props => {
  const [openModalConfirmBack, setOpenModalConfirmBack] = useState(false);

  return (
    <>
      <View style={styles.headerLeftOption}>
        <TouchableOpacity
          style={[styles.boxButton]}
          onPress={() => {
            setOpenModalConfirmBack(true);
          }}
        >
          <MaterialIcon
            name="arrow-back"
            color={masterColor.fontBlack80}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <ModalConfirmBack
        openModalConfirmBack={openModalConfirmBack}
        setOpenModalConfirmBack={setOpenModalConfirmBack}
      />
    </>
  );
};

/** ===> MODAL BACK CONFIRMATION === */
export const ModalConfirmBack = props => {
  return props?.openModalConfirmBack ? (
    <ModalConfirmation
      title={'Keluar halaman ini?'}
      open={props?.openModalConfirmBack}
      okText={'Keluar'}
      cancelText={'Tetap Disini'}
      content={
        'Data yang telah terinput akan terhapus jika kamu meninggalkan halaman ini'
      }
      type={'okeNotRed'}
      ok={() => {
        props?.setOpenModalConfirmBack(false);
        handleBackPress();
      }}
      cancel={() => {
        props?.setOpenModalConfirmBack(false);
      }}
    />
  ) : (
    <View />
  );
};

/** === BACK BUTTON RN PRESS HANDLING === */
export const handleBackPress = () => {
  NavigationService.goBack();
};

/**
 * ================================
 * NAVIGATION FUNCTION for ADD VIEW
 * ================================
 */
export const navigationFunctionAddView = props => {
  const backAction = () => {
    props?.setOpenModalConfirmBack(true);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction
  );

  return () => backHandler.remove();
};

const styles = StyleSheet.create({
  headerLeftOption: {
    flex: 1,
    paddingHorizontal: 12,
    left: 5
  }
});

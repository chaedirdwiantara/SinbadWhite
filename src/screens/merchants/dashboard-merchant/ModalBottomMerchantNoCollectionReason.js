import {
  React,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from '../../../library/reactPackage';
import { ModalBottomWithClose, ButtonSingle } from '../../../library/component';
import { useEffect, useState } from 'react';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
const ModalBottomMerchantNoCollectionReason = props => {
  const [isButtonDisabled, setIsButtonDisaled] = useState(false);
  const [selectedReasonId, setSelectedReasonId] = useState('');
  const [selectedReasonText, setSelectedReasonText] = useState('');
  const [isViewOnly, setIsViewOnly] = useState(false);

  /** EFFECT TO DISABLE BBUTTON */
  useEffect(() => {
    if (selectedReasonId) {
      setIsButtonDisaled(false);
    } else {
      setIsButtonDisaled(true);
    }
  }, [selectedReasonId]);
  /** FUNCTION REASON SELECTED */
  const selectReason = item => {
    if (item.id === selectedReasonId) {
      setSelectedReasonId('');
    } else {
      setSelectedReasonId(item.id);
      setSelectedReasonText(item.reason);
    }
  };
  /** FUNCTION PRESS BUTTON */
  const onPressButton = () => {
    const data = { selectedReasonId, selectedReasonText };
    if (selectedReasonId) {
      console.log('MASUK IF',data);
      props.onPress(data);
    }
  };
  /** RENDER CONTENT ITEM */
  const renderContentItem = (item, index) => {
    let checked = false;
    if (selectedReasonId === item.id) {
      checked = true;
    }

    return (
      <TouchableOpacity
        key={index}
        disabled={isViewOnly}
        onPress={() => {
          selectReason(item);
        }}
      >
        <View style={[styles.boxContentItem]}>
          <View style={{ flex: 1 }}>
            <Text style={checked ? Fonts.type16 : Fonts.type8}>
              {item.reason}
            </Text>
          </View>
          <View style={styles.boxIconRight}>
            <View
              style={[
                styles.circleEmptyCheck,
                { borderColor: checked ? Color.mainColor : Color.fontBlack40 }
              ]}
            >
              {checked ? <View style={styles.circleChecked} /> : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  /** RENDER CONTENT */
  const renderContent = () => {
    return (
      <>
        <View>
          {props.data.map((item, index) => {
            return renderContentItem(item, index);
          })}
        </View>
        <ButtonSingle
          disabled={isButtonDisabled}
          title={'Pilih Alasan'}
          loading={false}
          borderRadius={4}
          onPress={() => onPressButton()}
        />
      </>
    );
  };
  /** MAIN */
  return (
    <ModalBottomWithClose
      open={props.open}
      content={renderContent()}
      title={'Alasan Tidak Ada Penagihan'}
      typeClose={'cancel'}
      close={props.close}
      buttonDisabled={isButtonDisabled}
    />
  );
};
const styles = StyleSheet.create({
  boxContentItem: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
    justifyContent: 'space-between',
    borderBottomColor: Color.fontBlack10,
    borderBottomWidth: 1
  },
  boxIconRight: {
    position: 'absolute',
    right: 20
  },
  circleEmptyCheck: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleChecked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Color.mainColor
  }
});
export default ModalBottomMerchantNoCollectionReason;
/**
 * ============================
 * NOTES
 * ============================
 * createdBy: ayu
 * createdDate: 20/09/2021
 */

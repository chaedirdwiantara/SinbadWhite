import {
  React,
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config';

export const TAB_INVOICE = 'invoice';
export const TAB_COLLECTION = 'collection';

function SfaTabView(props) {
  const activeTab = props.activeTab;

  /**
   * ======================
   * FUNCTIONAL
   * ======================
   */
  /** SEND DATA TO PARENT */
  const toParentChangeTab = section => {
    props.parentFunction({ type: 'section', data: section });
  };

  /** SAVE DATA TO STATE */
  const onChangeTabs = section => {
    toParentChangeTab(section);
  };
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === STYLE === */
  const styleTabs = section => {
    return activeTab === section
      ? [
          styles.boxTabItem,
          {
            borderBottomWidth: 2,
            borderBottomColor: Color.mainColor
          }
        ]
      : [
          styles.boxTabItem,
          {
            borderBottomWidth: 1,
            borderBottomColor: Color.fontBlack10
          }
        ];
  };

  /** === TAB INVOICE === */
  const renderSectionInvoice = () => {
    return activeTab === TAB_INVOICE ? (
      <View style={styleTabs(TAB_INVOICE)}>
        <Text
          style={
            activeTab === TAB_INVOICE
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          Tagihan
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styleTabs(TAB_INVOICE)}
        onPress={() => onChangeTabs(TAB_INVOICE)}
      >
        <Text
          style={
            activeTab === TAB_INVOICE
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type118p
          }
        >
          Tagihan
        </Text>
      </TouchableOpacity>
    );
  };

  /** === TAB COLLECTION === */
  const renderSectionCollection = () => {
    return activeTab === TAB_COLLECTION ? (
      <View style={styleTabs(TAB_COLLECTION)}>
        <Text
          style={
            activeTab === TAB_COLLECTION
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          Penagihan
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styleTabs(TAB_COLLECTION)}
        onPress={() => onChangeTabs(TAB_COLLECTION)}
      >
        <Text
          style={
            activeTab === TAB_COLLECTION
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type118p
          }
        >
          Penagihan
        </Text>
      </TouchableOpacity>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      <View style={styles.boxTabs}>
        {renderSectionInvoice()}
        {renderSectionCollection()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  boxTabs: {
    height: 44,
    flexDirection: 'row'
  },
  boxTabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SfaTabView;

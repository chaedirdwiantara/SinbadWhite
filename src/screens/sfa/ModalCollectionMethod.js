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
  moment,
  Modal,
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
  ModalBottomType1
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';

function SfaView(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    data: [
      {
        id: 1, 
        name: "Tunai",
        balance: 0
      },
      {
        id: 2, 
        name: "Cek",
        balance: 1000000
      },
      {
        id: 3, 
        name: "Giro",
        balance: 0
      },
      {
        id: 4, 
        name: "Transfer",
        balance: 0
      },
      {
        id: 5, 
        name: "Promo",
        balance: 0
      },
      {
        id: 6, 
        name: "Retur",
        balance: 0
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
  const renderHeader = () => {
    return(
      <View style={styles.headerContainer}>
        <View style={[styles.headerContent]}>
          <View style={[styles.headerBody]}>
            <TouchableOpacity onPress={props.close}>
              <View>
                <MaterialIcon
                  name="arrow-back"
                  size={24}
                  color={masterColor.fontBlack50}
                  style={{
                    marginBottom: 8,
                    marginLeft: 8,
                    alignContent: 'flex-start'
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-start', flex: 1, alignSelf:"center" }}>
            <Text style={[Fonts.textHeaderPage, {marginLeft: 16}]}>Metode Penagihan</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, styles.shadowLine]} />
      </View>
    )
  }

  const renderCollectionMethod = () => {
    return data.data.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => props.selectCollection(item)}>
            <View style={{margin: 16}}>
              <Text style={Fonts.type24}>{item.name}</Text>
              {
                item.balance > 0 
                ? <Text style={[Fonts.type22, {marginTop: 5}]}>Saldo: {MoneyFormat(item.balance)}</Text>
                : null
              }
            </View>
            <View style={GlobalStyle.lines} />
          </TouchableOpacity>
        </View>
      )
    })
  }

  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        {/* {renderHeader()} */}
        {renderCollectionMethod()}
      </View>
    );
  };

  

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <View style={{flex:1}}>
        <Modal
          style={{flex: 1}}
          isVisible={props.open}
          coverScreen={true}
          hasBackdrop={true}
          useNativeDriver={true}
          backdropOpacity={0.4}
          style={styles.mainContainer}
          onPress={props.close}
        >
          {renderHeader()}
          {renderContent()}
          {/* {
            this.props.oms.loadingOmsApplicablePaylater === false ?
              null
            :
              <View style={{flex:1, position:"absolute", height:"100%", top: 0, left: 0, right: 0, bottom: 0, backgroundColor:"black", opacity: 0.5}}>
                <LoadingPage/>
              </View>
          }  */}
        </Modal>
      </View>
  );
}
const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0
    },
    headerContainer: {
        backgroundColor: masterColor.backgroundWhite,
        height: 56,
        justifyContent: 'center'
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row'
    },
    headerBody: {
        marginHorizontal: 8,
        marginVertical: 16
    },
    contentContainer: {
        flex: 1,
        backgroundColor: masterColor.backgroundWhite,
    },
    shadowLine: {
      shadowColor: masterColor.shadow,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2
    }
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

import {
  React,
  Component,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from '../../../library/reactPackage'
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage'
import {
  ToastType1
} from '../../../library/component'
import * as ActionCreators from '../../../state/actions'
import NavigationService from '../../../navigation/NavigationService'
import { Fonts } from '../../../helpers'
import { Color } from '../../../config'

class MerchantDetailClassificationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** all data need */
      id: this.props.merchant.dataGetMerchantDetailV2.id,
      showToast: false,
      notifToast: ''
    };
  }

  componentDidUpdate(prevProps){
    /**
     * ====================================
     * STORE SEGMENTATION
     * ====================================
     */
    /** CHANGE STORE TYPE */
    if (
      prevProps.merchant.dataMerchantVolatile.storeType !== 
      this.props.merchant.dataMerchantVolatile.storeType
    ){
      const data = {
        id: this.state.id,
        params: {
          type: {
            typeId: this.props.merchant.dataMerchantVolatile.typeId
          }
        }
      };
      this.props.merchantEditProcess(data);
      this.showToast()
    }
    /** CHANGE STORE GROUP */
    if (
      prevProps.merchant.dataMerchantVolatile.storeGroup !== 
      this.props.merchant.dataMerchantVolatile.storeGroup
    ){
      const data = {
        id: this.state.id,
        params: {
          group: {
            groupId: this.props.merchant.dataMerchantVolatile.groupId
          }
        }
      };
      this.props.merchantEditProcess(data);
      this.showToast()
    }
    /** CHANGE STORE CLUSTER */
    if (
      prevProps.merchant.dataMerchantVolatile.storeCluster !== 
      this.props.merchant.dataMerchantVolatile.storeCluster
    ){
      const data = {
        id: this.state.id,
        params: {
          cluster: {
            clusterId: this.props.merchant.dataMerchantVolatile.clusterId
          }
        }
      };
      this.props.merchantEditProcess(data);
      this.showToast()
    }
    /** CHANGE STORE CHANNEL */
    if (
      prevProps.merchant.dataMerchantVolatile.storeChannel !== 
      this.props.merchant.dataMerchantVolatile.storeChannel
    ){
      const data = {
        id: this.state.id,
        params: {
          channel: {
            channelId: this.props.merchant.dataMerchantVolatile.channelId
          }
        }
      };
      this.props.merchantEditProcess(data);
      this.showToast()
    }

  }

  showToast(){
    this.setState({
      showToast: true,
      notifToast: 'Berhasil Update Data'
    })
    setTimeout(() => {
      this.setState({ showToast: false });
    }, 3000);
  }

   /** === GO TO LIST AND SEARCH PAGE (GLOBAL USED) === */
   goToDropdown(data) {
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      hide: data.hide ? data.hide : false,
      type: data.type
    });
  }

  /** RENDER CONTENT ITEM */
  renderContentSection(data) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 16,
          marginBottom: 28
        }}
      >
        <View style={{ flex: 7, flexDirection: 'column' }} >
          <View style={{flex: 1}}>
            <Text style={[Fonts.type9, { marginBottom: 6 }]}>{data.key}</Text>
          </View> 
          <View style={{flex: 1}}>
            <Text style={Fonts.type24}>{data.value ? data.value : '-'}</Text>
          </View>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column'}} >
          <TouchableOpacity
            onPress={() => this.goToDropdown({
              type: data.type,
              placeholder: data.placeholder
            })}
          >
            <Text style={[Fonts.type11, {marginLeft: 0}]}>Ubah</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

  /** RENDER CLASSIFICATION MERCHANT */
  renderClassificationMerchant() {
    return (
      <View style={{ marginTop: 16 }}>
        {this.renderContentSection({
          key: 'Tipe Toko',
          value: this.props.merchant.dataMerchantVolatile.storeType,
          type: 'storeType',
          placeholder: 'Masukan tipe toko'
        })}
        {this.renderContentSection({
          key: 'Group Toko',
          value: this.props.merchant.dataMerchantVolatile.storeGroup,
          type: 'storeGroup',
          placeholder: 'Masukan group toko'
        })}
        {this.renderContentSection({
          key: 'Cluster Toko',
          value: this.props.merchant.dataMerchantVolatile.storeCluster,
          type: 'storeCluster',
          placeholder: 'Masukan cluster toko'
        })}
        {this.renderContentSection({
          key: 'Channel Toko',
          value: this.props.merchant.dataMerchantVolatile.storeChannel,
          type: 'storeChannel',
          placeholder: 'Masukan channel toko'
        })}
      </View>
    );
  }

  renderToast() {
    return this.state.showToast ? (
      <ToastType1 martin={30} content={this.state.notifToast} />
    ) : (
      <View />
    )
  }
  
  render(){
    return(
      <View style={styles.mainContainer}>
        <ScrollView>
          {this.renderClassificationMerchant()}
        </ScrollView>
        {this.renderToast()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    backgroundColor: Color.backgroundWhite,
    marginBottom: 16,
    paddingVertical: 6
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

const mapStateToProps = ({ merchant, global }) => {
  return { merchant, global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetailClassificationView)
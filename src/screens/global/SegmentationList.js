import { EmptyData, LoadingPage, SearchBarType4, StatusBarRed } from '../../library/component';
import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from '../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import { Fonts, GlobalStyle } from '../../helpers';
import NavigationService from '../../navigation/NavigationService';


class SegmentationList extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchData: null
    }
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: () => (
        <View style={{ width: '100%', paddingRight: 16 }}>
          <SearchBarType4 placeholder={params?.placeholder || ''}/>
        </View>
      )
    };
  };

  componentDidUpdate(prevProps) {
    const search = this.props.global.search.toLowerCase()
    if (prevProps.global.search !== search) {
      if(search){
        let searchData = this.props.merchant.dataSalesSegmentation
        if(searchData){
          searchData = searchData.filter(el => {
            return (
              el.name.toLowerCase().includes(search) || 
              el.externalId.toLowerCase().includes(search)
            )
          })
        }
        this.setState({searchData})
      } else {
        this.setState({searchData: null})
      }
    }
  }
  componentDidMount(){
    /** RESET SALES SEGMENTATION DATA */
    this.props.resetGetSalesSegmentation()

    /** GET SALES SEGMENTATION DATA */
    const {params} = this.props.navigation.state
    let supplierId = null
    if (this.props.user.userSuppliers && this.props.user.userSuppliers.length > 0) {
      supplierId = this.props.user.userSuppliers[0].id
    }
    const body = {
      type: params?.type || 'Unknown Type',
      supplierId
    }
    if(params?.type === 'warehouses'){
      if (this.props.global.dataGetUrbanId && this.props.global.dataGetUrbanId.length > 0) {
        body.urbanId = '1' || this.props.global.dataGetUrbanId[0].id
      }
    }
    this.props.getSalesSegmentationProcess(body)
  }
  updateData(item, type){
    switch(type){
      case 'warehouses': {
        this.props.saveVolatileDataMerchant({
          warehouse: item.name,
          warehouseId: item.id
        })
        break
      }
      case 'types': {
        this.props.saveVolatileDataMerchant({
          storeType: item.name,
          typeId: item.id
        })
        break
      }
      case 'groups': {
        this.props.saveVolatileDataMerchant({
          storeGroup: item.name,
          groupId: item.id
        })
        break
      }
      case 'clusters': {
        this.props.saveVolatileDataMerchant({
          storeCluster: item.name,
          clusterId: item.id
        })
        break
      }
      case 'channels': {
        this.props.saveVolatileDataMerchant({
          storeChannel: item.name,
          channelId: item.id
        })
        break
      }
      default : break
    }
    NavigationService.goBack(this.props.navigation.state.key);
  }

  /** === MAIN === */
  render() {
    if(this.props.merchant.loadingGetSalesSegmentation){
      return (
        <View style={{flex: 1}}>
          <StatusBarRed />
          <LoadingPage />
        </View>
      )
    }
    const data = this.props.merchant.dataSalesSegmentation
    const {params} = this.props.navigation.state
    return (
      <View style={styles.mainContainer}>
        <StatusBarRed />
        { data && data?.length > 0
            ? <FlatList
                ItemSeparatorComponent={() => <View style={GlobalStyle.lines} />}
                contentContainerStyle={styles.flatListContainer}
                data={this.state.searchData || this.props.merchant.dataSalesSegmentation}
                renderItem={(item) => this.renderItem(item, params?.type)}
                keyExtractor={(item, index) => index.toString()}
              />
            : <EmptyData title={'Maaf, data tidak ditemukan'}/>
        }
      </View>
    )
  }
  /** === RENDER CONTENT ITEM === */
  renderItem({ item }, type) {
    return (
      <TouchableOpacity onPress={() => this.updateData(item, type)}> 
        <View style={{flex: 1, flexDirection: 'row', padding: 16}}>
          <Text style={[Fonts.type8, {color: 'orange'}]}>{item.externalId}</Text>
          <Text style={[Fonts.type8, {flex: 1, marginLeft: 24}]}>{item.name}</Text> 
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  flatListContainer: {
    paddingBottom: 26
  }
});

const mapStateToProps = ({user, merchant, global}) => {
  return {user, merchant, global};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(SegmentationList);

import { 
    React,
    Component,
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity
 } from '../../../library/reactPackage';
 import { 
     BackHandlerBackSpecific,
     StatusBarWhite,
     SearchBarType4,
     ButtonSingle,
     LoadingPage
  } from '../../../library/component';
  import {
      AntDesignIcon,
      MaterialIcon,
      bindActionCreators,
      connect
  } from '../../../library/thirdPartyPackage';
  import NavigationService from '../../../navigation/NavigationService'
  import masterColor from '../../../config/masterColor.json'
  import { Color, Fonts } from '../../../config'
  import GlobalFont from '../../../helpers/GlobalFont'
  import * as ActionCreators from '../../../state/actions'
  import EditStockRecordListView from './EditStockRecordListView'

  class MerchantEditStockView extends Component {
      constructor(props){
          super(props)
          this.state = {
              mockData: true,
              search: ''
          }
      }
          /** HEADER CONFIG */
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => (
                <View>
                  <Text style={GlobalFont.textHeaderPage}>Catatan Stok</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  onPress={() => console.log('Back Press')}
                >
                  <MaterialIcon
                    color={masterColor.fontBlack50}
                    name={'arrow-back'}
                    size={24}
                  />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => console.log('Add stock')}>
                    <View style={{ flexDirection: 'row', marginRight: 18}}>
                        <AntDesignIcon 
                            color={Color.mainColor}
                            name={'pluscircle'}
                            size={24}
                        />
                    </View>
                </TouchableOpacity>
                
            )
        }
    }
      /** FUNCTION */
      /** PARENT FUNCTION */
      parentFunction(data){
        switch (data.type) {
            case 'search':
                this.setState({ search: data.data })
                console.log(data.data)
                break;       
            default:
                break;
        }
    }
    // SAVE STOCK RECORD
    saveStockRecord(){
        console.log('Save Stock Record')
    }
    // RENDER CONTENT
    renderContent(){
        return this.state.mockData ? (
            this.renderData()
        ) : (
            <LoadingPage />
        )
    }
    /** RENDER VIEW */
    // RENDER CARD View
    renderCardView(){
        return(
            <View>
                <EditStockRecordListView />
            </View>
        )
    }
    // RENDER DATA
    renderData(){
        return(
            <View style={{backgroundColor: masterColor.backgroundWhite, flex: 1}}>
                {this.renderSearch()}
                {this.renderCardView()}
                {this.renderButtonSaveStock()}
            </View>
        )
    }
    // RENDER SEARCH VIEW
    renderSearch(){
        return(
            <View style={{ paddingVertical: 8 }}>
                    <SearchBarType4 
                        searchText={this.state.search}
                        placeholder={'Cari Produk disini'}
                        onRef={ref => (this.parentFunction = ref)}
                        parentFunction={this.parentFunction.bind(this)}
                    />
            </View>    
        )
    }
    // RENDER BUTTON SAVE STOCK
    renderButtonSaveStock() {
       return (
           <View style={styles.containerEditButton}>
               <ButtonSingle
                   title={'Simpan Catatan Stock'}
                   borderRadius={8}
                   onPress={() => this.saveStockRecord()}
               />
           </View>
          )
        }
      /** RENDER MODAL */
      /** MAIN RENDER */
      render(){
          return(
              <SafeAreaView style={styles.mainContainer}>
                  <BackHandlerBackSpecific 
                    navigation={this.props.navigation}
                    page={'MerchantStockView'}
                  />
                  <StatusBarWhite />
                  {this.renderContent()}
              </SafeAreaView>
          )
      }
  }

  const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: masterColor.fontBlack05
    },
    containerEditButton: {
        backgroundColor: masterColor.backgroundWhite, 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        zIndex: 1000,
        borderTopWidth: 1,
        borderColor: masterColor.fontBlack10
    }
})

  const mapStateToProps = ({ pdp, merchant }) => {
      return { pdp, merchant }
  }

  const mapDispatchToProps = dispatch => {
      return bindActionCreators(ActionCreators, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(MerchantEditStockView)
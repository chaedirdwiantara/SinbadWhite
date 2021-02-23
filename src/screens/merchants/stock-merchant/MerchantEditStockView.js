import { 
    React,
    Component,
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    BackHandler
 } from '../../../library/reactPackage';
 import { 
     BackHandlerBackSpecific,
     StatusBarWhite,
     SearchBarType4,
     ButtonSingle,
     LoadingPage,
     ModalConfirmationType3
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
  import ModalBottomProductList from './ModalBottomProductList'

  class MerchantEditStockView extends Component {
      constructor(props){
          super(props)
          this.state = {
              mockData: true,
              openModalBackConfirmation: false,
              openModalSaveConfirmation: false,
              openModalProductList: false,
              selectedProduct: [],
              search: ''
          }
      }
          /** HEADER CONFIG */
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            headerTitle: () => (
                <View>
                  <Text style={GlobalFont.textHeaderPage}>Catatan Stok</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  onPress={() => state.params.handleBackPressFromRN()}
                >
                  <MaterialIcon
                    color={masterColor.fontBlack50}
                    name={'arrow-back'}
                    size={24}
                  />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => state.params.handleOpenProductList()}>
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
    componentDidMount(){
        this.navigationFunction()
        this.getRecordStock()
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleHardwareBackPress)
    }
    componentDidUpdate(prevProps){
        // To Delete Catalogue
        if(prevProps.merchant.dataDeleteRecordStock !== this.props.merchant.dataDeleteRecordStock
            && this.props.merchant.dataDeleteRecordStock.hasOwnProperty('success')){
            if(this.props.merchant.dataDeleteRecordStock.success ){
                this.props.merchantDeleteStockRecordReset()
                this.getRecordStock(this.state.search)
            }
        }
        // To get Catalouge after add new Catalogue
        if(prevProps.merchant.dataAddRecordStock !== this.props.merchant.dataAddRecordStock){
            if(this.props.merchant.dataAddRecordStock.success){
                this.getRecordStock(this.state.search)
                this.setState({ openModalProductList: false })
            }
        }
    }
    /**
     * =======================
     * NAVIGATION FUNCTION
     * ======================
     */
    navigationFunction() {
        this.props.navigation.setParams({
            handleBackPressFromRN: () => this.handleBackPress(),
            handleOpenProductList: () => this.openModalProductList()
        });
        BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleHardwareBackPress
        );
    }

    
    /** === BACK BUTTON RN PRESS HANDLING === */
    handleBackPress = () => {
        this.setState({ openModalBackConfirmation: true });
    };
    /** === BACK BUTTON HARDWARE PRESS HANDLING === */
    handleHardwareBackPress = () => {
        this.setState({ openModalBackConfirmation: true });
        return true;
    };
    /** === OPEN MODAL PRODUCT LIST === */
    openModalProductList = () => {
        this.setState({ openModalProductList: true })
    }
    /** === OPEN MODAL SAVE STOCK */
    openModalSaveStock() {
        this.setState({ openModalSaveConfirmation: true })
    }
    /** GET RECORD LIST */
    getRecordStock(keyword){
        this.props.merchantGetStockRecordProcess({
            search: keyword || ''
        })
    }
    
    /** PARENT FUNCTION */
    parentFunction(data){
        switch (data.type) {
            case 'search':
                this.setState({ search: data.data })
                this.getRecordStock(data.data)
                break;
            case 'delete':
                console.log(data.data)
                this.props.merchantDeleteStockRecordProcess(data.data)
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
        return !this.props.merchant.loadingGetRecordStock 
            && !this.props.merchant.loadingDeleteRecordStock  ? (
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
                <EditStockRecordListView 
                    data={this.props.merchant.dataGetRecordStock}
                    onRef={ref => (this.parentFunction = ref)}
                    parentFunction={this.parentFunction.bind(this)}
                />
            </View>
        )
    }
    // RENDER DATA
    renderData(){
        return (
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
                   onPress={() => this.openModalSaveStock()}
               />
           </View>
          )
        }
      /** RENDER MODAL */
      /** RENDER MODAL BACK CONFIRMATION */
      renderModalBackConfirmation(){
        return this.state.openModalBackConfirmation ? (
            <ModalConfirmationType3
                statusBarWhite
                title={'Catatan Belum Tersimpan'}
                open={this.state.openModalBackConfirmation}
                leftText={'Keluar'}
                rightText={'Kembali'}
                content={'Anda belum menyimpan catatan stok saat ini konfirmasi penyimpanan catatan sebelum meninggalkan halaman ini'}
                type={'okeNotRed'}
                leftAction={() => {
                    console.log('Keluar')
                    this.setState({ openModalBackConfirmation: false })
                    // Some function to go back
                    NavigationService.goBack()
                }}
                rightAction={() => {
                    console.log('Kembali')
                    this.setState({ openModalBackConfirmation: false })
                }}
            />
        ) : (
            <View />
        )
      }
      /** RENDER MODAL SAVE CONFIRMATION */
      renderModalSaveConfirmation(){
          return this.state.openModalSaveConfirmation ? (
              <ModalConfirmationType3
                statusBarWhite
                title={'Simpan Catatan Stock'}
                open={this.state.openModalSaveConfirmation}
                leftText={'Hapus dan keluar'}
                rightText={'Ya, simpan'}
                type={'okeNotRed'}
                content={'Menyimpan perubahan record stock akan menghapus seluruh pengisian quesioner yang telah dilakukan \n \n Apakah anda ingin melanjutkan penyimpanan?'}
                leftAction={() => {
                    console.log('Hapus dan keluar')
                    NavigationService.goBack()
                    this.setState({ openModalSaveConfirmation: false })
                    // Some function to save
                }}
                rightAction={() => {
                    this.saveStockRecord()
                    this.setState({ openModalSaveConfirmation: false })
                }}
              />
          ) : (
              <View />
          )
      }
    // RENDER MODAL PRODUCT LIST
    renderModalProductList(){
        console.log(this.state.selectedProduct)
        return this.state.openModalProductList ? (
            <ModalBottomProductList 
                open={this.state.openModalProductList}
                close={() => {
                    this.setState({ openModalProductList: false })
                    this.props.getMSSCataloguesReset()
                }}
                onRef={ref => (this.parentFunction = ref)}
                parentFunction={this.parentFunction.bind(this)}
            />
        ) : (
            <View />
        )
    }
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
                  {/* MODAL */}
                  {this.renderModalBackConfirmation()}
                  {this.renderModalSaveConfirmation()}
                  {this.renderModalProductList()}
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
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

    /** FUNCTION */
    componentDidMount(){
        this.navigationFunction()
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleHardwareBackPress)
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
        console.log('Open Modal Product List')
        this.setState({ openModalProductList: true })
    }
    /** === OPEN MODAL SAVE STOCK */
    openModalSaveStock() {
        this.setState({ openModalSaveConfirmation: true })
        this.saveStockRecord()
    }
    
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
                    this.setState({ openModalSaveConfirmation: false })
                    // Some function to save
                }}
                rightAction={() => {
                    console.log('Ya, Simpan')
                    this.setState({ openModalSaveConfirmation: false })
                }}
              />
          ) : (
              <View />
          )
      }
    // RENDER MODAL PRODUCT LIST
    renderModalProductList(){
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
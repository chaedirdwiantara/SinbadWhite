import {
    React,
    Component,
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Dimensions
} from '../../../library/reactPackage'
import {
    BackHandlerBackSpecific,
    StatusBarWhite,
    EmptyData,
    ButtonFloatType1,
    SearchBarType4,
    ButtonSingle,
    LoadingPage
} from '../../../library/component'
import {
    bindActionCreators,
    connect
} from '../../../library/thirdPartyPackage'
import { Fonts } from '../../../helpers'
const { height } = Dimensions.get('window')
import NavigationService from '../../../navigation/NavigationService'
import masterColor from '../../../config/masterColor.json'
import * as ActionCreators from '../../../state/actions'
import ModalBottomProductList from './ModalBottomProductList'
import StockRecordListView from './StockRecordListView'

class MerchantStockView extends Component {
    constructor(props){
        super(props)
        this.state = {
            openModalProductList: false,
            search: '',
            heightList: 0.93 * height
        }
    }

    /**
     * ================
     * FUNCTION
     * ================
     */
    componentDidMount(){
        this.getRecordStock()
        this.props.merchantStockRecordStatus('')
    }

    componentWillUnmount(){
        this.props.merchantGetLogAllActivityProcess(
            this.props.merchant.selectedMerchant.journeyPlanSaleId
          );
    }

    componentDidUpdate(prevProps){
        if(this.props.merchant.merchantStockRecordStatus === 'EDIT-STOCK'){
            if(prevProps.merchant.dataGetRecordStock !== this.props.merchant.dataGetRecordStock){
                if(this.props.merchant.dataGetRecordStock.length > 0){
                    NavigationService.navigate('MerchantEditStockView')
                }
            }
        }
    }

    /** GET STOCK RECORD */
    getRecordStock(keyword){
        this.props.merchantGetStockRecordProcess({
            search: keyword || ''
        })
    }
    parentFunction(data){
        switch (data.type) {
            case 'search':
                this.props.merchantStockRecordStatus('SEARCH')
                this.setState({ search: data.data })
                this.getRecordStock(data.data)
                break;
            case 'productList':
                this.setState({ openModalProductList: data.data })
                break; 
            default:
                break;
        }
    }

    buttonEditStock(){
        const taskList = this.props.merchant.dataGetLogAllActivity
        if(taskList && taskList.find( task => task.activity === 'check_out')){
            return <View />
        } else {
            return this.renderButtonEditStock()
        }
        
    }

    buttonAddStock(){
        const taskList = this.props.merchant.dataGetLogAllActivity
        if(taskList && taskList.find( task => task.activity === 'check_out')){
            return <View />
        } else {
            return this.renderButtonAddStock()
        }
    }

    navigateToEditStock(){
        this.props.merchantStockRecordStatus('EDIT-STOCK')
        this.getRecordStock()
    }

    /**
     * =============
     * RENDER VIEW
     * =============
     */
    // Render Button
    renderButtonAddStock(){
        return (
            <View style={styles.containerFloatButton}>
                <ButtonFloatType1 
                    title={'Tambah Produk'}
                    push={() => {
                        this.props.merchantStockRecordStatus('NEW-STOCK')
                        this.setState({ openModalProductList: true })
                    }}
                />
            </View>
        )
    }
    // RENDER DATA
    renderData(){
        return(
            <View style={{backgroundColor: masterColor.fontBlack05, flex: 1}}>
                {this.renderSearch()}
                {this.renderCardView()}
                {this.buttonEditStock()}
                {/* {this.renderButtonEditStock()} */}
            </View>
        )
    }
    // RENDER EMPTY DATA
    renderDataEmpty(){
        return(
            <View style={styles.mainContainer}>
                <EmptyData 
                    title={'Tidak Ada Catatan Stok'}
                    description={
                        'Tambah produk untuk melakukan pencatatan stok'
                    }
                />
                {this.buttonAddStock()}
                {/* {this.renderButtonAddStock()} */}
            </View>
        )
    }
    // RENDER SEARCH VIEW
    renderSearch(){
        return(
            <View style={{ paddingVertical: 8, backgroundColor: masterColor.backgroundWhite }}>
                    <SearchBarType4 
                        searchText={this.state.search}
                        placeholder={'Cari Produk disini'}
                        onRef={ref => (this.parentFunction = ref)}
                        parentFunction={this.parentFunction.bind(this)}
                    />
            </View>    
        )
    }
    // RENDER CARD View
    renderCardView(){
        return(
            <View style={{
                backgroundColor: masterColor.fontBlack05,
                paddingTop: 8
                }}>
                <StockRecordListView 
                    data={this.props.merchant.dataGetRecordStock}
                />
            </View>
        )
    }
    // RENDER CONTENT
    renderContentBody(){
        return this.props.merchant.dataGetRecordStock.length > 0 
        || this.props.merchant.merchantStockRecordStatus === 'SEARCH' ? (
            this.renderData()
        ) : (
            this.renderDataEmpty()
        )
    }

    // RENDER
    renderContent(){
        return this.props.merchant.loadingGetRecordStock ? (
            <LoadingPage />
        ) : (
            this.renderContentBody()
        )
    }
    // Render Button
    renderButtonEditStock() {
        return (
            <View style={styles.containerEditButton}>
                <ButtonSingle
                    title={'Ubah Catatan Stock'}
                    borderRadius={8}
                    onPress={() => this.navigateToEditStock()}
                    loading={this.props.merchant.loadingGetRecordStock}
                />
            </View>
        )
    }
    /**
     * ==============
     * RENDER MODAL
     * ==============
     */
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
    render(){
        return(
            <SafeAreaView style={styles.mainContainer}>
                <StatusBarWhite />
                {this.renderContent()}
                {/* Render Modal */}
                {this.renderModalProductList()}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: masterColor.backgroundWhite
    },
    containerFloatButton: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 1000
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

export default connect(mapStateToProps, mapDispatchToProps)(MerchantStockView)
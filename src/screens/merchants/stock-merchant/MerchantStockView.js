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
    ButtonSingle
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
            mockData: true,
            openModalProductList: false,
            search: '',
            heightList: 0.93 * height
        }
    }

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
                    push={() => this.setState({ openModalProductList: true })}
                />
            </View>
        )
    }
    // RENDER DATA
    renderData(){
        return(
            <View style={{
                backgroundColor: masterColor.backgroundWhite, 
                flex: 1,
                }}>
                {this.renderSearch()}
                {this.renderCardView()}
                {this.renderButtonEditStock()}
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
    // RENDER CARD View
    renderCardView(){
        return(
            <View>
                <StockRecordListView />
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
                {this.renderButtonAddStock()}
            </View>
        )
    }
    // RENDER CONTENT
    renderContent(){
        return this.state.mockData ? (
            this.renderData()
        ) : (
            this.renderDataEmpty()
        )
    }
    // Render Button
    renderButtonEditStock() {
        return (
            <View style={styles.containerEditButton}>
                <ButtonSingle
                    title={'Ubah Catatan Stock'}
                    borderRadius={8}
                    onPress={() => NavigationService.navigate('MerchantEditStockView')}
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
            />
        ) : (
            <View />
        )
    }
    render(){
        return(
            <SafeAreaView style={styles.mainContainer}>
                <BackHandlerBackSpecific 
                    navigation={this.props.navigation}
                    page={'MerchantStockView'}
                />
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
        backgroundColor: masterColor.fontBlack05
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

const mapStateToProps = ({ pdp }) => {
    return { pdp }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantStockView)
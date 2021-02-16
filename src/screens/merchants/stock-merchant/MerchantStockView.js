import {
    React,
    Component,
    View,
    StyleSheet,
    Text,
    SafeAreaView
} from '../../../library/reactPackage'
import {
    BackHandlerBackSpecific,
    StatusBarWhite,
    EmptyData,
    ButtonFloatType1,
    SearchBarType4
} from '../../../library/component'
import {
    bindActionCreators,
    connect
} from '../../../library/thirdPartyPackage'
import { Fonts } from '../../../helpers'
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
            search: ''
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
            <View style={{paddingTop: 8, backgroundColor: masterColor.backgroundWhite}}>
                <SearchBarType4 
                    searchText={this.state.search}
                    placeholder={'Cari Produk disini'}
                    onRef={ref => (this.parentFunction = ref)}
                    parentFunction={this.parentFunction.bind(this)}
                />
                <View style={{
                    backgroundColor: masterColor.fontBlack05,
                    paddingTop: 8
                    }}>
                    <StockRecordListView />
                </View>
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
})

const mapStateToProps = ({ pdp }) => {
    return { pdp }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantStockView)
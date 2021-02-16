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
    ButtonFloatType1
} from '../../../library/component'
import {
    bindActionCreators,
    connect
} from '../../../library/thirdPartyPackage'
import masterColor from '../../../config/masterColor.json'
import * as ActionCreators from '../../../state/actions'
import ModalBottomProductList from './ModalBottomProductList'

class MerchantStockView extends Component {
    constructor(props){
        super(props)
        this.state = {
            mockData: false,
            openModalProductList: false
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
    renderData(){
        return(
            <View>
                <Text>
                    Data Not Found
                </Text>
            </View>
        )
    }
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
    renderContent(){
        return this.state.mockData ? (
            this.renderData()
        ) : (
            this.renderDataEmpty()
        )
    }

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
        backgroundColor: masterColor.backgroundWhite
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
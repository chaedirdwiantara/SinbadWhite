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
import masterColor from '../../../config/masterColor.json'

class MerchantStockView extends Component {
    constructor(props){
        super(props)
        this.state = {
            mockData: false
        }
    }
    renderButtonAddStock(){
        return (
            <View style={styles.containerFloatButton}>
                <ButtonFloatType1 
                    title={'Tambah Produk'}
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
    render(){
        return(
            <SafeAreaView style={styles.mainContainer}>
                <StatusBarWhite />
                {this.renderContent()}
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

export default MerchantStockView
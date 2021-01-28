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
    StatusBarWhite
} from '../../../library/component'
import masterColor from '../../../config/masterColor.json'

class MerchantStockView extends Component {
    constructor(props){
        super(props)
        this.state = {
            mockData: false
        }
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
            <View>
                <Text>
                    Data Not Found
                </Text>
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
            <SafeAreaView>
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
    }
})

export default MerchantStockView
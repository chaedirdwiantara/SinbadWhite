import {
    React,
    Component,
    View,
    StyleSheet,
    Text, 
    FlatList
} from '../../../library/reactPackage'
import { Fonts } from '../../../helpers'
import { Color } from '../../../config'

class StockRecordListView extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    // RENDER CARD DATA
    renderCardData({ item, index }){
        return(
            <View 
                style={styles.cardContent}
                key={index}
                >
                    <View style={{alignItems: 'baseline', flexDirection: 'row'}}>
                        <View>
                            <Text style={[Fonts.type10, {marginTop: 20}]}>
                                {item.catalogueCode}
                            </Text>
                        </View>                         
                        <View style={{
                                marginLeft: 8,
                                padding: 4, 
                                backgroundColor: Color.fontYellow10, 
                                borderRadius: 100,
                             }}>
                                    <Text style={Fonts.type108}>MSS</Text>
                        </View>
                    </View>
                
                <Text style={[Fonts.type59, {marginTop: 11}]}>
                    {item.name}
                </Text>
                <View style={{ 
                        marginVertical: 16, 
                        flexDirection: 'row', 
                        backgroundColor: Color.fontBlack05,
                        borderRadius: 6
                    }}>
                    <View style={{flex: 1, alignItems: 'center', marginVertical: 8}}>
                        <Text style={[Fonts.type96]}>
                            Shelf Produk
                        </Text>
                        <Text style={[Fonts.type10, { marginTop: 8 }]}>
                            {item.showedStock}
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', marginVertical: 8}}>
                        <Text style={[Fonts.type96]}>
                            Non-Shelf Produk
                        </Text>
                        <Text style={[Fonts.type10, { marginTop: 8 }]}>
                            {item.nonShowedStock}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    // RENDER CONTENT
    renderContent(){
        return (
            <FlatList
                contentContainerStyle={{ paddingBottom: 26 }}
                data={this.props.data}
                renderItem={this.renderCardData.bind(this)}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }

    // RENDER MAIN CONTENT
    render(){
        return (
            <View style={styles.mainContainer}>
                {this.renderContent()}
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        backgroundColor: Color.fontBlack05
      },
    flatListContainer: {
        paddingTop: 8,
        paddingBottom: 200
      },
    cardContent: {
        backgroundColor: Color.backgroundWhite,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        elevation: 3
    }
})

export default StockRecordListView
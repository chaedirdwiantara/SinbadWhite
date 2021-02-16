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
import masterColor from '../../../config/masterColor.json'

class StockRecordListView extends Component {
    constructor(props){
        super(props)
        this.state = {
            mockData: [
                {
                    id: 1,
                    catalogueCode: '1. SNB-CATALOGUE-22342',
                    name: 'SGM EKSPLORE SOY 1-5TH MADU 400GR',
                    showedStock: 400,
                    nonShowedStock: 10,
                    isExclusive: true
                },
                {
                    id: 2,
                    catalogueCode: '2. SNB-CATALOGUE-22321',
                    name: 'SGM EKSPLORE SOY 1-5TH FNL 1000GR',
                    showedStock: 10,
                    nonShowedStock: 400,
                    isExclusive: false
                },
                {
                    id: 3,
                    catalogueCode: '3. SNB-CATALOGUE-22342',
                    name: 'SGM EKSPLORE SOY 1-5TH MADU 400GR',
                    showedStock: 400,
                    nonShowedStock: 10,
                    isExclusive: true
                },
                {
                    id: 4,
                    catalogueCode: '4. SNB-CATALOGUE-22321',
                    name: 'SGM EKSPLORE SOY 1-5TH FNL 1000GR',
                    showedStock: 10,
                    nonShowedStock: 400,
                    isExclusive: false
                },
                {
                    id: 5,
                    catalogueCode: '5. SNB-CATALOGUE-22342',
                    name: 'SGM EKSPLORE SOY 1-5TH MADU 400GR',
                    showedStock: 400,
                    nonShowedStock: 10,
                    isExclusive: true
                },
                {
                    id: 6,
                    catalogueCode: '6. SNB-CATALOGUE-22321',
                    name: 'SGM EKSPLORE SOY 1-5TH FNL 1000GR',
                    showedStock: 10,
                    nonShowedStock: 400,
                    isExclusive: false
                }
            ]
        }
    }

    // RENDER CARD DATA
    renderCardData({ item, index }){
        return(
            <View 
                style={{
                    backgroundColor: masterColor.backgroundWhite,
                    marginHorizontal: 16,
                    marginVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    elevation: 3
                }}
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
                                backgroundColor: masterColor.fontYellow10, 
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
                        backgroundColor: masterColor.fontBlack05,
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
                contentContainerStyle={styles.flatListContainer}
                data={this.state.mockData}
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
        backgroundColor: Color.backgroundWhite
      },
    flatListContainer: {
        paddingBottom: 200
      },
})

export default StockRecordListView
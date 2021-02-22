import {
    React,
    Component,
    View,
    StyleSheet,
    Text, 
    FlatList,
    TextInput,
    TouchableOpacity
} from '../../../library/reactPackage'
import {
    MaterialIcon
} from '../../../library/thirdPartyPackage'
import { Fonts } from '../../../helpers'
import { Color } from '../../../config'

class EditStockRecordListView extends Component {
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
    /** FUNCTION */
    /** RENDER VIEW */
    /** RENDER MSS TYPE ICON */
    renderMSSType(){
        return(
            <View style={{
                marginLeft: 8,
                padding: 4, 
                backgroundColor: Color.fontYellow10, 
                borderRadius: 100,
             }}>
                    <Text style={Fonts.type108}>MSS</Text>
            </View>
        )
    }
    /** RENDER CARD DATA */
    renderCardData({item, index}){
        return(
            <View
                style={styles.cardContent}
                key={index}
            >
                <View style={{alignItems: 'baseline', flexDirection: 'row', marginHorizontal: 16}}>
                        <View>
                            <Text style={[Fonts.type10, {marginTop: 20,}]}>
                                {item.catalogueCode}
                            </Text>
                        </View>                         
                        {item.isMustSale ? this.renderMSSType() : <View />}
                    </View>
                
                <Text style={[Fonts.type59, {marginTop: 11, marginHorizontal: 16, marginBottom: 8}]}>
                    {item.name}
                </Text>
                {this.renderSeparator()}
                <View style={styles.cardBodyShelf}>
                    <View style={styles.shelfSection}>
                        <View style={{flex: 1}}>
                            <Text style={[Fonts.type96]}>Shelf Produk</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <View 
                                style={styles.inputBox}
                            > 
                            <TextInput 
                                    style={[Fonts.type24, styles.textInput]}
                                    value={item.showedStock.toString()}
                                    keyboardType='numeric'
                                    returnKeyType='done'
                                    enablesReturnKeyAutomatically
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.shelfSection}>
                        {this.renderSeparator()}
                    </View>
                    <View style={styles.shelfSection}>
                        <View style={{flex: 1}}>
                            <Text style={[Fonts.type96]}>Non-Shelf Produk</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={styles.inputBox}>
                                <TextInput 
                                    style={[Fonts.type24, styles.textInput]}
                                    value={item.nonShowedStock.toString()}
                                    keyboardType='numeric'
                                    returnKeyType='done'
                                    enablesReturnKeyAutomatically
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ position: 'absolute', marginTop: 16, right: 16}}>
                    <TouchableOpacity onPress={() => console.log('Delete Catalogue')}>
                        <MaterialIcon 
                            name={'delete'}
                            size={24}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

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

      /** RENDER SEPARATOR */
    renderSeparator() {
        return <View style={{
            flex: 1,
            height: 1,
            backgroundColor: Color.fontBlack10,
            marginVertical: 8
        }} />;
    }
    /** RENDER MODAL */

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
        borderRadius: 8,
        elevation: 3
    },
    inputBox: {
        borderRadius: 4, 
        width: 50, 
        height: 30, 
        borderWidth: 1, 
        alignSelf: 'flex-end',
        borderColor: Color.fontBlack10,
        justifyContent: 'center'
    },
    shelfSection: {
        alignItems: 'center', 
        flexDirection: 'row', 
        flex: 1
    },
    cardBodyShelf: {
        alignItems: 'center', 
        flex: 1, 
        flexDirection: 'column', 
        marginVertical: 16, 
        marginHorizontal: 16
    },
    textInput: {
        textAlign: 'center', 
        padding: 0, 
        height: '100%', 
        width: '100%', 
        alignItems: 'center' 
    }
})

export default EditStockRecordListView
import {
    React,
    Component,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Text
} from '../../../library/reactPackage'
import {
    bindActionCreators,
    MaterialIcon,
    connect
} from '../../../library/thirdPartyPackage'
import {
    SkeletonType1,
    LoadingLoadMore,
    Address,
    EmptyData
} from '../../../library/component'
import { Color } from '../../../config'
import { GlobalStyle, Fonts } from '../../../helpers'
import * as ActionCreators from '../../../state/actions'

class ModalBottomProductListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLoading: false,
            data: [
                {
                    id: 0,
                    name: 'SGM EKSPLORE SOY 1-5TH MADU 400GR GRD 2.0',
                    code: 'SNB-CATALOGUE-22342',
                    type: 'MSS'
                },
                {
                    id: 1,
                    name: 'SGM EKSPLORE SOY 1-5TH VAN 400GR GRD 2.0',
                    code: 'SNB-CATALOGUE-22446',
                    type: 'MSS'
                },
                {
                    id: 2,
                    name: 'SGM EKSPLORE SOY 1-5TH COK 400GR GRD 2.0',
                    code: 'SNB-CATALOGUE-22741',
                    type: 'MSS'
                },
                {
                    id: 3,
                    name: 'SUNLIGHT CUCI PIRING LEMON 1000GR GRD 2.0',
                    code: 'SNB-CATALOGUE-21430',
                    type: 'NON-MSS'
                },
                {
                    id: 4,
                    name: 'SUNLIGHT CUCI PIRING MANGGA 500GR GRD 2.0',
                    code: 'SNB-CATALOGUE-25430',
                    type: 'NON-MSS'
                }
            ]
        }
    }

    renderSkeleton(){
        return <SkeletonType1 />
    }

    renderData(){
        return this.state.data.length > 0
        ? this.renderContent()
        : this.renderEmpty()
    }

    renderEmpty(){
        return (
            <EmptyData 
                title={'List Produk Kosong'}
                description={'Maaf, Produk tidak tersedia di area anda'}
            />
        )
    }

    renderContent(){
        return (
            <View style={{ flex: 1 }}>
                <View style={GlobalStyle.lines}/>
                <FlatList
                    contentContainerStyle={styles.flatListContainer}
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        )
    }

    renderItem({ item, index }){
        return(
            <TouchableOpacity
                key={index}
                style={styles.boxItem}
            >
                <View 
                    style={{
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        flex: 1
                    }}
                >
                    <View style={{ marginBottom: 8 }}>
                        <Text style={[Fonts.type37]}>
                            {item.code} {item.type === 'MSS' ? this.renderMSSType() : <View />}
                        </Text>
                    </View>
                    <View>
                        <Text style={[Fonts.type57]}>
                            {item.name}
                        </Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <MaterialIcon 
                        name="check-circle"
                        size={24}
                        color={Color.fontBlack40}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    renderSeparator(){
        return <View style={[GlobalStyle.lines, { marginLeft: 9 }]}/>
    }

    renderMSSType(){
        return  <View style={{
                  height: 8, 
                  width: 8, 
                  backgroundColor: Color.fontYellow40, 
                  borderRadius: 100
                }} />
        
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                {this.state.dataLoading
                ? this.renderSkeleton()
                : this.renderData()}
                {/* For Loadmore */}
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
      paddingBottom: 26
    },
    boxItem: {
      flexDirection: 'row',
      paddingVertical: 13,
      paddingHorizontal: 16
    },
    boxImage: {
      height: 65,
      width: 65,
      borderRadius: 10
    }
  });

const mapStateToProps = ({ user, pdp }) => {
    return { user, pdp }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ModalBottomProductListView)
import {
    React,
    Component,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    Text
} from '../../../library/reactPackage'
import {
    bindActionCreators,
    connect,
    MaterialIcon,
    Modal
} from '../../../library/thirdPartyPackage'
import {
    StatusBarBlackOP40,
    SearchBarType4,
    TagListType3,
    SkeletonType2,
    ButtonSingle
} from '../../../library/component'
import { Color } from '../../../config'
import { Fonts } from '../../../helpers'
import * as ActionCreators from '../../../state/actions'
const { height } = Dimensions.get('window')
import ModalBottomProductListView from './ModalBottomProductListView'
import NavigationService from '../../../navigation/NavigationService'

class ModalBottomProductList extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            mssType: '',
            pageLimit: 10,
            heightList: 0.93 * height,
            selectedProduct: [],
            dataForSaveProduct: [],
            LoadingTags: false,
            tagsTypeList: [
                {
                    id: 0,
                    name: 'All',
                    type: 'ALL'
                },{
                    id: 1,
                    name: 'Produk MSS',
                    type: 'MSS'
                },
                {
                    id: 2,
                    name: 'Produk Non-MSS',
                    type: 'NON-MSS'
                }
            ],
            tagsType: 0,
        }
    }

    componentDidMount() {
        this.keyboardListener();
      }

    componentDidUpdate(prevProps) {
        if (prevProps.merchant.dataAddRecordStock !== this.props.merchant.dataAddRecordStock 
            && this.props.merchant.dataAddRecordStock.success === true) {
                this.props.parentFunction({ type: 'productList', data: false });
                NavigationService.navigate('MerchantEditStockView')
            }
    }

    componentWillUnmount() {
        this.keyboardRemove();
      }
    /**
     * ========================
     * FOR KEYBOARD
     * ========================
     */
    /** KEYBOARD LISTENER */
    keyboardListener() {
        this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardDidShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this.keyboardDidHide
        );
    }
    /** KEYBOARD SHOW */
    keyboardDidShow = () => {
        this.setState({ heightList: 0.2 * height });
    };
    /** KEYBOARD HIDE */
    keyboardDidHide = () => {
        this.setState({ heightList: 0.93 * height });
    };
    /** KEYBOARD REMOVE */
    keyboardRemove() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    // Parent Function to get Data from child
    parentFunction(data){
        // if(data.type === 'sku-tag') {
        //     this.props.getMSSCataloguesProcess({
        //         page,
        //         limit: this.state.pageLimit,
        //         mss: mssType,
        //         keyword: this.state.search
        //     })
        // }
        switch (data.type) {
            case 'stock':
                const selectedProduct = this.state.selectedProduct
                const dataForSaveProduct = this.state.dataForSaveProduct
                const indexSelectedProduct = selectedProduct.indexOf(data.data.id)
                const dataObject = {
                    id: parseInt(data.data.id, 10),
                    isMustSale: data.data.mss
                }
                if (indexSelectedProduct > -1){
                    selectedProduct.splice(indexSelectedProduct, 1)
                    dataForSaveProduct.splice(indexSelectedProduct, 1)
                } else {
                    selectedProduct.push(data.data.id)
                    dataForSaveProduct.push(dataObject)
                }
                this.setState({ selectedProduct, dataForSaveProduct })
                break;
            case 'search':
                this.setState({ search: data.data })
                console.log(data.data)
                this.props.getMSSCataloguesReset()
                this.props.getMSSCataloguesProcess({
                    page: 0,
                    limit: this.state.pageLimit,
                    keyword: data.data,
                    mss: this.state.mssType
                })
                break;
            case 'sku-tag':
                console.log(data.data)
                this.props.getMSSCataloguesReset()       
                this.mssType(data.data)
                break;        
            default:
                this.props.getMSSCataloguesReset()
                this.props.getMSSCataloguesProcess({
                    page: 0,
                    limit: this.state.pageLimit,
                    keyword: this.state.search,
                    mss: this.state.mssType
                })
                break;
        }
    }

    /** TO GROUP BY MSS TYPE */
    mssType(activeTags){
        switch (activeTags) {
            case 0:
                this.getMssCatalogues(0, '')
                break;
            case 1:
                this.getMssCatalogues(0, true)
                break;
            case 2:
                this.getMssCatalogues(0, false)
                break;
        
            default:
                break;
        }
    }

    /** FETCH API FOR MSS CATALOGUES */
    getMssCatalogues(page, mssType){
        this.setState({ mssType })
        this.props.getMSSCataloguesReset()
        this.props.getMSSCataloguesProcess({
            page,
            limit: this.state.pageLimit,
            mss: mssType,
            keyword: this.state.search
        })
    }

    /** ADD STOCK RECORD */
    addStockRecord(){
        this.props.merchantAddStockRecordProcess({catalogues: this.state.dataForSaveProduct})
    }
    /**
     * =================
     * RENDER VIEW
     * =================
     */
    // RENDER CONTENT
    renderContent(){
        return(
            <Modal
                isVisible={this.props.open}
                useNativeDriver={true}
                hasBackdrop={true}
                coverScreen={true}
                backdropColor={Color.fontBlack100}
                backdropOpacity={0.4}
                deviceHeight={height}
                style={styles.mainContainer}
            >
                <View style={[styles.contentContainer, { height: this.state.heightList }]}>
                    {this.renderContentTitle()}
                    {this.renderContentBody()}
                </View>
            </Modal>
        )
    }

    // RENDER MODAL TITLE
    renderContentTitle() {
        return (
          <View>
            <View style={styles.boxContentTitle}>
              <TouchableOpacity style={styles.boxClose} onPress={this.props.close}>
                <MaterialIcon
                  name="close"
                  color={Color.fontBlack50}
                  size={24}
                />
              </TouchableOpacity>
    
              <View>
                <Text style={Fonts.type7}>Daftar Produk</Text>
              </View>
            </View>
          </View>
        );
      }

    // RENDER CONTENT BODY
    renderContentBody(){
        return(
            <View style={styles.boxContentBody}>
                {this.renderContentSearchBar()}
                {this.renderContentTags()}
                {this.renderContentSKUList()}
                {this.renderButton()}
            </View>
        )
    }

    // RENDER SEARCH BAR
    renderContentSearchBar(){
        return (
            <View>
                <SearchBarType4
                    searchText={this.state.search}
                    placeholder={'Cari disini'}
                    onRef={ref => (this.parentFunction = ref)}
                    parentFunction={this.parentFunction.bind(this)}
                />
            </View>
        )
    }
    // RENDER TAGS SKELETON
    renderSkeletonTags(){
        return <SkeletonType2 />
    }

    // RENDER TAG
    renderTags(){
        return (
            <TagListType3
                selected={this.state.tagsType}
                onRef={ref => (this.parentFunction = ref)}
                parentFunction={this.parentFunction.bind(this)}
                data={this.state.tagsTypeList}
            />
        )
    }

    // RENDER CONTENT TAGS
    renderContentTags(){
        return this.state.LoadingTags 
            ? this.renderSkeletonTags() 
            : this.renderTags()
    }

    // Render SKU List
    renderContentSKUList(){
        return (
            <View style={{ flex: 1 }}>
                <ModalBottomProductListView
                    mssType={this.state.mssType}
                    search={this.state.search}
                    selectedProduct={this.state.selectedProduct}
                    onRef={ref => (this.parentFunction = ref)}
                    parentFunction={this.parentFunction.bind(this)}
                />
            </View>
        )
    }

    // Render Button
    renderButton() {
        return (
            <ButtonSingle
                title={'Tambah ke Catatan'}
                borderRadius={4}
                onPress={() => this.addStockRecord()}
            />
        )
    }
    
    // RENDER MAIN RENDER
    render(){
        return (
            <View>
                <StatusBarBlackOP40 />
                {this.renderContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
    },
    contentContainer: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: Color.backgroundWhite,
      flexDirection: 'column',
      position: 'absolute',
      width: '100%',
      bottom: 0,
      zIndex: 1000
    },
    boxContentBody: {
      flex: 1,
      paddingTop: 10
    },
    boxContentTitle: {
      marginTop: 18,
      justifyContent: 'center',
      flexDirection: 'row'
    },
    boxClose: {
      position: 'absolute',
      height: '100%',
      justifyContent: 'center',
      left: 16
    }
  });

const mapStateToProps = ({ pdp, merchant }) => {
    return { pdp, merchant }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBottomProductList)
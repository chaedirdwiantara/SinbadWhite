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

class ModalBottomProductList extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            heightList: 0.93 * height,
            selectedProduct: [],
            dataForSaveStock: [],
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
            skuIndex: 0
        }
    }

    parentFunction(data){

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

    renderContentSKUList(){
        return (
            <View style={{ flex: 1 }}>
                <ModalBottomProductListView
                    productIndex={this.state.skuIndex}
                    search={this.state.search}
                    selectedProduct={this.state.selectedProduct}
                    onRef={ref => (this.parentFunction = ref)}
                    parentFunction={this.parentFunction.bind(this)}
                />
            </View>
        )
    }

    renderButton() {
        return (
            <ButtonSingle
                title={'Tambah ke Catatan'}
                borderRadius={4}
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

const mapStateToProps = ({ pdp }) => {
    return { pdp }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBottomProductList)
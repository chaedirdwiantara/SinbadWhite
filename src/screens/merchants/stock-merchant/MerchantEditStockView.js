import { 
    React,
    Component,
    View,
    StyleSheet,
    Text,
    SafeAreaView
 } from '../../../library/reactPackage';
 import { 
     BackHandlerBackSpecific,
     StatusBarWhite,
     SearchBarType4,
     ButtonSingle,
     LoadingPage
  } from '../../../library/component';
  import {
      bindActionCreators,
      connect
  } from '../../../library/thirdPartyPackage';
  import NavigationService from '../../../navigation/NavigationService'
  import masterColor from '../../../config/masterColor.json'
  import * as ActionCreators from '../../../state/actions'

  class MerchantEditStockView extends Component {
      constructor(props){
          super(props)
          this.state = {
              mockData: true,
              search: ''
          }
      }
      /** FUNCTION */
      /** PARENT FUNCTION */
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
    // SAVE STOCK RECORD
    saveStockRecord(){
        console.log('Save Stock Record')
    }
    // RENDER CONTENT
    renderContent(){
        return this.state.mockData ? (
            this.renderData()
        ) : (
            <LoadingPage />
        )
    }
    /** RENDER VIEW */
    // RENDER CARD View
    renderCardView(){
        return(
            <View style={{
                backgroundColor: masterColor.fontBlack05,
                paddingTop: 8,
                flex: 1
                }}>
                <Text>
                    The Card should be here!
                </Text>
            </View>
        )
    }
    // RENDER DATA
    renderData(){
        return(
            <View style={{backgroundColor: masterColor.backgroundWhite, flex: 1}}>
                {this.renderSearch()}
                {this.renderCardView()}
                {this.renderButtonSaveStock()}
            </View>
        )
    }
    // RENDER SEARCH VIEW
    renderSearch(){
        return(
            <View style={{ paddingVertical: 8 }}>
                    <SearchBarType4 
                        searchText={this.state.search}
                        placeholder={'Cari Produk disini'}
                        onRef={ref => (this.parentFunction = ref)}
                        parentFunction={this.parentFunction.bind(this)}
                    />
            </View>    
        )
    }
    // RENDER BUTTON SAVE STOCK
    renderButtonSaveStock() {
       return (
           <View style={styles.containerEditButton}>
               <ButtonSingle
                   title={'Simpan Catatan Stock'}
                   borderRadius={8}
                   onPress={() => this.saveStockRecord()}
               />
           </View>
          )
        }
      /** RENDER MODAL */
      /** MAIN RENDER */
      render(){
          return(
              <SafeAreaView style={styles.mainContainer}>
                  <BackHandlerBackSpecific 
                    navigation={this.props.navigation}
                    page={'MerchantStockView'}
                  />
                  <StatusBarWhite />
                  {this.renderContent()}
              </SafeAreaView>
          )
      }
  }

  const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: masterColor.fontBlack05
    },
    containerEditButton: {
        backgroundColor: masterColor.backgroundWhite, 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        zIndex: 1000,
        borderTopWidth: 1,
        borderColor: masterColor.fontBlack10
    }
})

  const mapStateToProps = ({ pdp, merchant }) => {
      return { pdp, merchant }
  }

  const mapDispatchToProps = dispatch => {
      return bindActionCreators(ActionCreators, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(MerchantEditStockView)
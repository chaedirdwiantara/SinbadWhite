import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Keyboard
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarWhite,
  ProgressBarType1,
  DropdownType1
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';
import ModalFailedCreateStore from '../../global/ModalFailedCreateStore'

class AddMerchantStep4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** error */
      errorAddMerchant: false,
      supplierId:
        this.props.user.userSuppliers.length === 1
          ? this.props.user.userSuppliers[0].supplier.id
          : '',
      modalFailedCreateStore: false
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    /** IF ADD MERCHANT SUCCESS */
    if (
      prevProps.merchant.dataAddMerchant !== this.props.merchant.dataAddMerchant
    ) {
        if (this.props.merchant.dataAddMerchant !== null) {
          switch (this.props.global.pageAddMerchantFrom) {
            case 'MerchantView':
              this.props.merchantGetReset();
              this.props.merchantGetProcess({
                type: 'direct',
                page: 0,
                loading: true,
                portfolioId: '',
                search: ''
              });
              break;
            case 'JourneyView':
              this.props.journeyPlanGetReset();
              this.props.journeyPlanGetProcess({ page: 0, loading: true });
              this.props.getJourneyPlanReportProcess(
                this.props.user.userSuppliers.map(item => item.supplierId)
              );
              break;
  
            default:
              break;
          }
          NavigationService.navigate(this.props.global.pageAddMerchantFrom);
        }      
    }
    /** IF ERROR ADD MERCHANT */
    if (
      prevProps.merchant.errorAddMerchant !==
      this.props.merchant.errorAddMerchant
    ) {
      if (this.props.merchant.errorAddMerchant !== null) {
        if(this.props.merchant.errorAddMerchant.data.errorCode === "ERR-AREA-MAPPING"){
        // this.props.volatileResetMerchant()
          this.setState({
            modalFailedCreateStore: true 
          });
        } else {
            this.setState({ openErrorAddMerchant: true });         
        }
        
      }
    }
  }
  parentFunction(data){
    switch (data.type) {
      case 'goToAreaMapping':
        this.setState({modalFailedCreateStore: false})
        NavigationService.navigate('ProfileAreaMapping')
        break;    
      default:
        break;
    }
  }
  /** SEND DATA ADD MERCHANT */
  finalStep() {
    this.setState({ addStoreProcess: true });
    Keyboard.dismiss();
    const warehouse = this.props.merchant.dataGetWarehouse
    const data = this.props.merchant.dataMerchantVolatile
    this.props.merchantAddProcess({
      storeId: data.storeId,
      externalId: data.externalId,
      name: data.name,
      address: data.address,
      longitude: data.longitude,
      latitude: data.latitude,
      noteAddress: data.noteAddress,
      urbanId: data.urbanId,
      status: 'active',
      warehouseId: warehouse.total === 0 || warehouse.total === 1 ? null : data.warehouseId,
      user: {
        fullName: data.fullName,
        idNo: data.idNo,
        taxNo: data.taxNo,
        phone: data.phone,
        status: 'active',
        roles: [1]
      },
      supplier: {
        supplierId: this.state.supplierId
      },
      type: {
        typeId: data.typeId
      },
      group: {
        groupId: data.groupId
      },
      cluster: {
        clusterId: data.clusterId
      },
      channel: {
        channelId: data.channelId
      }
    });
    setTimeout(() => {
      this.setState({ addStoreProcess: false });
    }, 100);
  }
  /** GO TO DROPDOWN LIST */
  goToDropdown(data) {
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      type: data.type
    });
  }
  /** GO TO MAPS */
  goToMaps() {
    NavigationService.navigate('MapsView');
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */
  /** === RENDER STEP HEADER === */
  renderProgressHeader() {
    return (
      <View style={{ paddingTop: 20 }}>
        <ProgressBarType1
          totalStep={4}
          currentStep={4}
          title={'Langkah melengkapi profil'}
        />
      </View>
    );
  }
  /** STORE TYPE */
  renderStoreType(){
    return (
      <DropdownType1 
        title={'Tipe Toko'}
        placeholder={'Masukan tipe toko'}
        selectedDropdownText={this.props.merchant.dataMerchantVolatile.storeType}
        openDropdown={() => this.goToDropdown({
          type: 'storeType',
          placeholder: 'Masukan tipe toko'
        })}
      />
    )
  }
  /** STORE GROUP */
  renderStoreGroup(){
    return(
      <DropdownType1 
        title={'Group Toko'}
        placeholder={'Masukan group toko'}
        selectedDropdownText={this.props.merchant.dataMerchantVolatile.storeGroup}
        openDropdown={() => this.goToDropdown({
          type: 'storeGroup',
          placeholder: 'Masukan group toko'
        })}
      />
    )
  }
  /** STORE CLUSTER */
  renderStoreCluster(){
    return(
      <DropdownType1 
        title={'Cluster Toko'}
        placeholder={'Masukan cluster toko'}
        selectedDropdownText={this.props.merchant.dataMerchantVolatile.storeCluster}
        openDropdown={() => this.goToDropdown({
          type: 'storeCluster',
          placeholder: 'Masukan cluster toko'
        })}
      />
    )
  }
  /** STORE CHANNEL */
  renderStoreChannel(){
    return(
      <DropdownType1 
        title={'Channel Toko'}
        placeholder={'Masukan channel toko'}
        selectedDropdownText={this.props.merchant.dataMerchantVolatile.storeChannel}
        openDropdown={() => this.goToDropdown({
          type: 'storeChannel',
          placeholder: 'Masukan channel toko'
        })}
      />
    )
  }
  /** RENDER MODAL FAILED CREATE STORE */
  renderModalFailed(){
    return(
      <ModalFailedCreateStore
        open={this.state.modalFailedCreateStore}
        close={() => {
          this.setState({modalFailedCreateStore: false})
          NavigationService.navigate(this.props.global.pageAddMerchantFrom )
          }}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
      />
    )
  }
  /** main content */
  renderContent() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {this.renderStoreType()}
        {this.renderStoreGroup()}
        {this.renderStoreCluster()}
        {this.renderStoreChannel()}
        <View style={{ paddingBottom: 50 }} />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        title={'Lanjutkan'}
        loading={
          this.props.merchant.loadingAddMerchant || this.state.addStoreProcess
        }
        disabled={this.props.merchant.loadingAddMerchant || this.state.addStoreProcess}
        borderRadius={4}
        onPress={() => this.finalStep()}
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <ScrollView>
          {this.renderProgressHeader()}
          {this.renderContent()}
        </ScrollView>
        {this.renderButton()}
        {this.renderModalFailed()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ auth, global, merchant, user }) => {
  return { auth, global, merchant, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantStep4);

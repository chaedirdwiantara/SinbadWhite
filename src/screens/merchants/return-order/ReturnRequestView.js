import {
  React,
  Component,
  View,
  Text,
  StyleSheet
} from '../../../library/reactPackage';
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage';
import { LoadingPage } from '../../../library/component';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import ReturnRequestListView from './ReturnRequestListView';
import ModalManualInputQty from './ModalManualInputQty';

class ReturnRequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      openModalManualInputQty: false,
      selectedData: null,
      localData: {
        orderCode: 'S01000452400341847316',
        returnParcelDraft: [
          {
            catalogueId: 1,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 90000,
            maxQty: 80
          },
          {
            catalogueId: 2,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 10000,
            maxQty: 10
          },
          {
            catalogueId: 3,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 90000,
            maxQty: 20
          },
          {
            catalogueId: 4,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 10000,
            maxQty: 30
          },
          {
            catalogueId: 5,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 90000,
            maxQty: 11
          },
          {
            catalogueId: 6,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 10000,
            maxQty: 17
          }
        ]
      }
    };
  }
  static navigationOptions = ({ navigation }) => {
    let orderCode = '';
    if (navigation.state.params) {
      orderCode = navigation.state.params.orderCode;
    }
    return {
      headerTitle: () => (
        <View>
          <Text style={[Fonts.type35, { color: Color.fontBlack80 }]}>
            {orderCode}
          </Text>
        </View>
      )
    };
  };

  componentDidMount() {
    this.convertListToLocalState();
    setTimeout(() => this.setState({ loading: false }), 500);
  }

  convertListToLocalState() {
    const productArray = [];
    this.state.localData.returnParcelDraft.map((item, index) => {
      item.qty = 0;
      productArray.push(item);
    });
    const data = {
      orderCode: this.state.localData.orderCode,
      returnParcelDraft: productArray
    };
    this.setState({ localData: data });
  }

  parentFunction(data) {
    switch (data.type) {
      case 'ManualInput':
        console.log('Manual Input', data);
        this.setState({
          openModalManualInputQty: true,
          selectedData: data.data
        });
        break;
      case 'ChangeQty':
        console.log('Change Qty', data);
        this.updateQty(data.data);
        this.setState({ openModalManualInputQty: false });
        break;

      default:
        break;
    }
  }

  updateQty(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = listCatalogue.returnParcelDraft.findIndex(
      item => parseInt(item.catalogueId, 10) === parseInt(data.catalogueId, 10)
    );
    listCatalogue.returnParcelDraft[indexCatalogue].qty = data.qty;
    this.setState({ localData: listCatalogue });
  }

  renderListData() {
    return (
      <View style={styles.mainContainer}>
        <ReturnRequestListView
          data={this.state.localData}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }

  renderLoadingPage() {
    return <LoadingPage />;
  }

  renderContent() {
    return this.state.loading
      ? this.renderLoadingPage()
      : this.renderListData();
  }

  /**
   * ===================
   * MODAL
   * ===================
   */
  renderModalManualInputQty() {
    return this.state.openModalManualInputQty ? (
      <ModalManualInputQty
        open={this.state.openModalManualInputQty}
        close={() => this.setState({ openModalManualInputQty: false })}
        data={this.state.selectedData}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        title={'Jumlah Retur'}
      />
    ) : (
      <View />
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderContent()}
        {/* MODAL */}
        {this.renderModalManualInputQty()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReturnRequestView);

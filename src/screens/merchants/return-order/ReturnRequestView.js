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

class ReturnRequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mockData: {
        orderCode: 'S01000452400341847316',
        returnParcelDraft: [
          {
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://seller-sandbox.sinbad.web.id/assets/images/logos/sinbad.svg',
            price: 90000,
            maxQty: 80
          },
          {
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://seller-sandbox.sinbad.web.id/assets/images/logos/sinbad.svg',
            price: 10000,
            maxQty: 80
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
  renderListData() {
    return <ReturnRequestListView data={this.state.mockData} />;
  }

  renderLoadingPage() {
    return <LoadingPage />;
  }

  renderContent() {
    return this.state.loading
      ? this.renderLoadingPage()
      : this.renderListData();
  }
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
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

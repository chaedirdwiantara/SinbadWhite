import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput
} from '../../../library/reactPackage';
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage';
import { EmptyData } from '../../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import CustomOrderButton from './CustomOrderButton';

class ReturnRequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toParentFunction(data) {
    this.props.parentFunction(data);
  }

  parentFunction(data) {
    return null;
  }

  parentFunctionFromOrderButton(data) {
    this.toParentFunction(data);
  }
  checkPrice(data) {
    const price = Math.floor(data.price * data.qty);
    return price;
  }
  renderData() {
    return this.props.data.returnParcelDraft.length > 0 ? (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={this.renderSeparator}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem.bind(this)}
          data={this.props.data.returnParcelDraft}
        />
      </View>
    ) : (
      this.renderEmpty()
    );
  }

  renderItem({ item, index }) {
    return (
      <View
        key={index}
        style={[styles.cardContainer, GlobalStyle.shadowForBox]}
      >
        <View style={styles.boxContent}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginHorizontal: 16,
              marginTop: 16
            }}
          >
            <View>
              <Image
                defaultSource={require('../../../assets/images/sinbad_image/sinbadopacity.png')}
                source={{ uri: item.imageUrl }}
                style={[GlobalStyle.image80ContainRadius4, { borderRadius: 5 }]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 21 }}>
                <Text
                  style={[
                    Fonts.fontH11SemiBold,
                    { flex: 1, flexWrap: 'wrap', color: Color.fontBlack80 }
                  ]}
                >
                  {item.catalogueName}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}
              >
                <View>
                  <Text style={[Fonts.fontH10Bold, { color: Color.fontRed50 }]}>
                    {MoneyFormat(this.checkPrice(item))}
                  </Text>
                </View>
                <View>
                  <CustomOrderButton
                    showKeyboard={this.state.showKeyboard}
                    item={item}
                    onRef={ref => (this.parentFunctionFromOrderButton = ref)}
                    parentFunctionFromOrderButton={this.parentFunctionFromOrderButton.bind(
                      this
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={GlobalStyle.lines} />
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              margin: 16,
              justifyContent: 'space-between'
            }}
          >
            <View>
              <Text style={[Fonts.fontH12Medium, { color: Color.fontBlack80 }]}>
                Harga Retur
              </Text>
            </View>
            <View>
              <Text style={[Fonts.fontH10Bold, { color: Color.fontBlack40 }]}>
                Price
              </Text>
            </View>
          </View>
          <View style={GlobalStyle.lines} />
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              margin: 16,
              justifyContent: 'space-between'
            }}
          >
            <View>
              <Text style={[Fonts.fontH12Medium, { color: Color.fontBlack80 }]}>
                Alasan Retur
              </Text>
            </View>
            <View>
              <Text style={[Fonts.fontH12Medium, { color: Color.fontBlack40 }]}>
                Return Reason
              </Text>
            </View>
          </View>
          <View style={GlobalStyle.lines} />
          <View
            style={{
              flex: 1,
              margin: 16
            }}
          >
            <TextInput
              style={[
                Fonts.fontH12Medium,
                {
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 4,
                  borderColor: Color.fontBlack10,
                  color: Color.fontBlack60
                }
              ]}
              placeholder={'Tambah catatan untuk barang ini'}
              textAlignVertical="top"
            />
            <Text
              style={[
                Fonts.fontC2Medium,
                {
                  alignSelf: 'flex-end',
                  marginTop: 8,
                  color: Color.fontBlack40
                }
              ]}
            >
              0/255 Karakter
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderSeparator() {
    return <View style={{ marginBottom: 12 }} />;
  }

  renderEmpty() {
    return <EmptyData title={'Tidak ada pesanan'} description={''} />;
  }

  renderContent() {
    return <View>{this.renderData()}</View>;
  }
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Color.backgroundWhite
  },
  cardContainer: {
    backgroundColor: Color.backgroundWhite,
    borderRadius: 8
  },
  boxContent: {
    flex: 1,
    borderRadius: 16
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

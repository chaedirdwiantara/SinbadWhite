import {
  React,
  Component,
  View,
  Text,
  height,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image
} from '../../../library/reactPackage';
import { Modal, MaterialIcon } from '../../../library/thirdPartyPackage';
import { StatusBarBlackOP40, ButtonSingle } from '../../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../../helpers';
import { Color } from '../../../config';

class ModalReturnSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.data.price
    };
  }
  calculateReturnPrice() {
    let grandTotalPrice = 0;
    this.props.data.map(item => {
      grandTotalPrice += item.qty * item.price;
    });
    return grandTotalPrice;
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <View style={GlobalStyle.linesSwipeModal} />
        </View>
        <View style={styles.boxContentTitle}>
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
              }
            ]}
          >
            <Text style={Fonts.type7}>{this.props.title}</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginTop: 16, marginBottom: 4 }]} />
      </View>
    );
  }
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>
        {this.renderBody()}
        {this.renderButton()}
      </View>
    );
  }

  renderBody() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {this.renderSummary()}
        <View style={{ height: 4, backgroundColor: Color.fontBlack10 }} />
        {this.renderOrderLines()}
      </View>
    );
  }

  renderSummary() {
    console.log('Return Lines', this.props.data);
    return (
      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 8
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
            Total Jumlah Retur
          </Text>
          <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
            {this.props.data.reduce(
              (prevQty, currentQty) => prevQty + currentQty.qty,
              0
            )}{' '}
            Qty
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 8
          }}
        >
          <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
            Total Produk Retur
          </Text>
          <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
            {this.props.data.length} SKU
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
            Total Dana Retur
          </Text>
          <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
            {MoneyFormat(this.calculateReturnPrice())}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 25
          }}
        >
          <Text style={(Fonts.fontH12Medium, { color: Color.fontBlack80 })}>
            Barang sudah dibawa
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }}
            onPress={() =>
              this.props.parentFunction({
                type: 'openModalConfirmation'
              })
            }
          >
            <Text style={[Fonts.fontB3Medium, { color: Color.fontBlack80 }]}>
              {this.props.returnInfo === null
                ? 'Belum dipilih'
                : this.props.returnInfo === true
                ? 'Ya'
                : 'Tidak'}
            </Text>
            <MaterialIcon
              name="chevron-right"
              size={18}
              color={Color.fontBlack80}
            />
          </TouchableOpacity>
        </View>
        {this.renderInfo()}
      </View>
    );
  }

  renderOrderLines() {
    return <View>{this.renderData()}</View>;
  }
  renderSeparator() {
    return <View style={{ marginBottom: 12 }} />;
  }

  renderData() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={this.renderSeparator}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem.bind(this)}
          data={this.props.data}
        />
      </View>
    );
  }

  renderInfo() {
    return this.props.showInfo ? (
      <View
        style={{
          padding: 12,
          backgroundColor: Color.fontYellow10,
          borderRadius: 4,
          marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <MaterialIcon name="info" size={18} color={Color.fontYellow60} />
        <Text
          style={[
            Fonts.fontB3Medium,
            { color: Color.fontYellow60, marginLeft: 8 }
          ]}
        >
          Mohon infokan barang sudah dibawa atau belum.
        </Text>
      </View>
    ) : (
      <View />
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
              flex: 1,
              marginHorizontal: 16,
              marginVertical: 21
            }}
          >
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <Image
                defaultSource={require('../../../assets/images/sinbad_image/sinbadopacity.png')}
                source={{ uri: item.imageUrl }}
                style={[GlobalStyle.image46, { borderRadius: 5 }]}
              />
              <Text
                style={[
                  Fonts.fontH11SemiBold,
                  { flex: 1, flexWrap: 'wrap', color: Color.fontBlack80 }
                ]}
              >
                {item.catalogueName}
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                marginVertical: 6
              }}
            >
              <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
                Barang dikembalikan
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {item.qty} Qty
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                marginVertical: 6
              }}
            >
              <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
                Pengembalian Dana
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {MoneyFormat(item.qty * item.price)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                marginVertical: 6
              }}
            >
              <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
                Alasan Retur
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {item.returnReason.reason}
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
            <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
              Catatan
            </Text>
            <Text
              style={[
                Fonts.fontC1SemiBold,
                { color: Color.fontBlack80, marginTop: 8 }
              ]}
            >
              {item.note === '' ? '-' : item.note}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderButton() {
    return (
      <View
        style={[
          GlobalStyle.shadowForBox10,
          {
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 8,
            paddingVertical: 16
          }
        ]}
      >
        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <TouchableOpacity
            style={{
              padding: 12,
              borderColor: Color.fontRed50,
              borderRadius: 8,
              borderWidth: 1
            }}
            onPress={() =>
              this.props.parentFunction({
                type: 'ConfirmationCancel',
                data: {
                  price: parseInt(this.state.price, 10),
                  catalogueId: this.props.data.catalogueId
                }
              })
            }
          >
            <Text style={Fonts.textButtonSmallWhiteActive}>Batalkan</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: Color.fontRed50,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: Color.fontRed50
            }}
            onPress={() =>
              this.props.parentFunction({
                type: 'ConfirmationContinue',
                data: {
                  price: parseInt(this.state.price, 10),
                  catalogueId: this.props.data.catalogueId
                }
              })
            }
          >
            <Text style={Fonts.textButtonSmallRedActive}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  renderContent() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        swipeDirection={['down']}
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        deviceHeight={height}
        style={styles.mainContainer}
        onBackButtonPress={this.props.close}
        onBackdropPress={this.props.close}
      >
        <View style={styles.contentContainer}>
          {this.renderContentTitle()}
          {this.renderContentBody()}
        </View>
      </Modal>
    );
  }
  render() {
    return (
      <View>
        <StatusBarBlackOP40 />
        {this.renderContent()}
      </View>
    );
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
    maxHeight: 0.8 * height,
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1
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
  },
  input: {
    padding: 0,
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    marginLeft: 16
  },
  /** FOR INPUT  */
  inputList: {
    flex: 1,
    borderWidth: 1,
    borderColor: Color.fontBlack40,
    borderRadius: 4,
    backgroundColor: Color.backgroundWhite,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    backgroundColor: Color.backgroundWhite,
    borderRadius: 8
  },
  boxContent: {
    flex: 1,
    borderRadius: 16
  },
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Color.backgroundWhite
  }
});

export default ModalReturnSummary;

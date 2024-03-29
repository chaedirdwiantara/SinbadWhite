import {
  React,
  Component,
  View,
  Text,
  height,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from '../../../library/reactPackage';
import { Modal, MaterialIcon } from '../../../library/thirdPartyPackage';
import { StatusBarBlackOP40, ButtonSingle } from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';

class ModalManualInputQty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: this.props.data.qty
    };
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
          <TouchableOpacity
            style={[{ flex: 1, marginLeft: 16 }]}
            onPress={this.props.close}
          >
            <MaterialIcon name={'close'} size={24} color={Color.fontBlack100} />
          </TouchableOpacity>
          <View style={[{ flex: 1 }]}>
            <Text style={Fonts.type7}>{this.props.title}</Text>
          </View>
          <TouchableOpacity
            style={[{ alignItems: 'flex-end', flex: 1, marginRight: 16 }]}
            onPress={() => this.setState({ qty: 0 })}
            disabled={parseInt(this.state.qty, 10) === 0}
          >
            <Text
              style={
                (Fonts.fontH9Medium,
                {
                  color:
                    parseInt(this.state.qty, 10) === 0
                      ? Color.fontRed10
                      : Color.fontRed50
                })
              }
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[GlobalStyle.lines, { marginVertical: 16 }]} />
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
          margin: 16,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View style={styles.inputList}>
          <TextInput
            returnKeyType="done"
            value={this.state.qty.toString()}
            style={[
              Fonts.type24,
              styles.input,
              {
                color:
                  parseInt(this.state.qty, 10) === 0
                    ? Color.fontBlack60
                    : Color.fontBlack80
              }
            ]}
            keyboardType="numeric"
            maxLength={6}
            enablesReturnKeyAutomatically
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onChangeText={qty => {
              if (qty === '' || qty === 0) {
                this.setState({ qty: 0 });
              } else {
                const cleanNumber = qty.replace(/^0+|[^0-9]/g, '');
                if (
                  parseInt(cleanNumber, 10) >
                  parseInt(this.props.data.maxQty, 10)
                ) {
                  this.setState({ qty: this.props.data.maxQty });
                } else {
                  this.setState({ qty: cleanNumber });
                }
              }
            }}
          />
        </View>
        <View
          style={[styles.inputList, { alignItems: 'center', borderWidth: 0 }]}
        >
          <Text style={[Fonts.fontH12Medium, { color: Color.fontBlack80 }]}>
            Maks Retur{' '}
            <Text style={{ fontWeight: 'bold' }}>{this.props.data.maxQty}</Text>{' '}
            Barang
          </Text>
        </View>
      </View>
    );
  }

  renderButton() {
    return (
      <View style={[GlobalStyle.shadowForBox10, { flex: 1 }]}>
        <ButtonSingle
          title={'Terapkan Retur'}
          borderRadius={8}
          onPress={() =>
            this.props.parentFunction({
              type: 'ChangeQty',
              data: {
                qty: parseInt(this.state.qty, 10),
                catalogueId: this.props.data.catalogueId
              }
            })
          }
          disabled={parseInt(this.state.qty, 10) === 0}
        />
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
    textAlign: 'center'
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
  }
});

export default ModalManualInputQty;

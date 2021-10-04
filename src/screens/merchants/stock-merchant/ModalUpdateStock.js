import {
  React,
  Component,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  height,
  TextInput
} from '../../../library/reactPackage';
import { StatusBarBlackOP40, ButtonSingle } from '../../../library/component';
import { Modal, MaterialIcon } from '../../../library/thirdPartyPackage';
import { Color } from '../../../config';
import { GlobalStyle, Fonts } from '../../../helpers';

class ModalUpdateStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pcs: this.props.data.data.qty.pcs,
      box: this.props.data.data.qty.box,
      loadingAddStock: false
    };
  }

  /**
   * =================
   * RENDER VIEW
   * =================
   */
  // RENDER CONTENT
  renderContent() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        deviceHeight={height}
        style={styles.mainContainer}
        onBackButtonPress={this.props.onBackButtonPress}
        onBackdropPress={this.props.onBackdropPress}
      >
        <View
          style={[styles.contentContainer, { height: this.state.heightList }]}
        >
          {this.renderContentTitle()}
          {this.renderContentBody()}
          {this.renderButton()}
        </View>
      </Modal>
    );
  }
  // RENDER MODAL TITLE
  renderContentTitle() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <View style={GlobalStyle.linesSwipeModal} />
        </View>
        <View style={styles.boxContentTitle}>
          <TouchableOpacity style={styles.boxClose} onPress={this.props.close}>
            <MaterialIcon name="close" color={Color.fontBlack50} size={24} />
          </TouchableOpacity>

          <View>
            <Text style={Fonts.type7}>{this.props.title}</Text>
          </View>
        </View>
        <View style={GlobalStyle.lines} />
      </View>
    );
  }

  // RENDER CONTENT BODY
  renderContentBody() {
    return (
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 8 }}>
          <Text style={[Fonts.H12Medium, { color: Color.fontBlack80 }]}>
            Jumlah per pcs
          </Text>
        </View>
        <View
          style={{
            borderColor: Color.fontBlack60,
            borderWidth: 1,
            borderRadius: 4,
            height: 40,
            marginBottom: 16
          }}
        >
          <TextInput
            style={[Fonts.H12Medium, { color: Color.fontBlack100 }]}
            value={this.state.pcs === 0 ? null : this.state.pcs.toString()}
            placeholder={'pcs'}
            keyboardType="numeric"
            returnKeyType="done"
            enablesReturnKeyAutomatically
            maxLength={3}
            onChangeText={qty => {
              const pcs = qty.replace(/^0-9]\\+(?!$)/g, '');
              this.setState({ pcs });
            }}
          />
        </View>
        <View style={{ marginBottom: 8 }}>
          <Text style={[Fonts.H12Medium, { color: Color.fontBlack80 }]}>
            Jumlah per box
          </Text>
        </View>
        <View
          style={{
            borderColor: Color.fontBlack60,
            borderWidth: 1,
            borderRadius: 4,
            height: 40,
            marginBottom: 10
          }}
        >
          <TextInput
            style={[Fonts.H12Medium, { color: Color.fontBlack100 }]}
            value={this.state.box === 0 ? null : this.state.box.toString()}
            placeholder={'box'}
            keyboardType="numeric"
            returnKeyType="done"
            enablesReturnKeyAutomatically
            maxLength={3}
            onChangeText={qty => {
              const box = qty.replace(/^0-9]\\+(?!$)/g, '');
              console.log('Update Box', box);
              this.setState({ box });
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}
        >
          <MaterialIcon
            name={'info-outline'}
            size={18}
            color={Color.fontBlack70}
          />
          <Text style={Fonts.H11Normal}>
            {' '}
            1 box terdiri dari {this.props.data.data.packagedQty}pcs
          </Text>
        </View>
      </View>
    );
  }

  checkButtonDisabled() {
    if (
      parseInt(this.state.pcs, 10) ===
        parseInt(this.props.data.data.qty.pcs, 10) &&
      parseInt(this.state.box, 10) ===
        parseInt(this.props.data.data.qty.box, 10)
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Render Button
  renderButton() {
    return (
      <View style={{ borderTopWidth: 1, borderColor: Color.fontBlack10 }}>
        <ButtonSingle
          title={'Konfirmasi'}
          borderRadius={4}
          disabled={this.checkButtonDisabled()}
          onPress={() =>
            this.props.parentFunction({
              type: 'edit',
              data: this.props.data,
              updatedQty: {
                pcs: this.state.pcs,
                box: this.state.box
              },
              stockId: this.props.data.data.stockId
            })
          }
          loading={this.state.loadingAddStock}
        />
      </View>
    );
  }

  /** MAIN RENDER */
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
    flexDirection: 'row',
    marginBottom: 12
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  }
});

export default ModalUpdateStock;

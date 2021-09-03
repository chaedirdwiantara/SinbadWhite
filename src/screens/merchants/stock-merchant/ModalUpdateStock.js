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
      pcs: 0,
      box: 0
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
            style={Fonts.H12Medium}
            placeholder={'pcs'}
            keyboardType="numeric"
            returnKeyType="done"
            enablesReturnKeyAutomatically
            maxLength={4}
            onChange={qty => {
              let pcs = qty.replace(/\W|\\+(?!$)/g, '');
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
            style={Fonts.H12Medium}
            placeholder={'box'}
            keyboardType="numeric"
            returnKeyType="done"
            enablesReturnKeyAutomatically
            maxLength={4}
            onChange={qty => {
              let box = qty.replace(/\W|\\+(?!$)/g, '');
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
          <Text style={Fonts.H11Normal}> 1 box terdiri dari 24pcs</Text>
        </View>
      </View>
    );
  }

  // Render Button
  renderButton() {
    return (
      <View style={{ borderTopWidth: 1, borderColor: Color.fontBlack10 }}>
        <ButtonSingle
          title={'Konfirmasi'}
          borderRadius={4}
          onPress={() => console.log('Konfirmasi Update Stock')}
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

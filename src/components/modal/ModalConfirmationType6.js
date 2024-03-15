import {
  React,
  Component,
  View,
  StyleSheet,
  ModalPopUp,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import { connect, Modal } from '../../library/thirdPartyPackage';
import { StatusBarRedOP50, StatusBarBlackOP40 } from '../../library/component';
import { Fonts } from '../../helpers';
import { Color } from '../../config';

class ModalConfirmationType5 extends Component {
  constructor(props) {
    super(props);
  }
  /** MAIN RENDER */
  render() {
    return (
      <Modal
        isVisible={this.props.open}
        onBackButtonPress={this.props.onBackButtonPress}
        onBackdropPress={this.props.onBackdropPress}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        swipeDirection={['up']}
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        style={styles.mainContainer}
      >
        {this.props.statusBarWhite ? (
          <StatusBarBlackOP40 />
        ) : (
          <StatusBarRedOP50 />
        )}
        <View style={styles.mainContainer}>
          <View style={styles.card}>
            <View style={styles.boxCard}>
              <View style={styles.containerTitle}>
                <Text style={Fonts.modalConfirmationType5Title}>
                  {this.props.title}
                </Text>
              </View>
              <View style={[styles.contentContainer, { textAlign: 'center' }]}>
                <Text
                  style={[
                    Fonts.modalConfirmationType5Content,
                    { textAlign: 'center' }
                  ]}
                >
                  {this.props.content}
                </Text>
              </View>
              <View style={[styles.buttonContainer]}>
                <TouchableOpacity style={styles.boxRed} onPress={this.props.ok}>
                  <Text style={Fonts.modalConfirmationType5Button}>
                    {this.props.okText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    justifyContent: 'center',
    flex: 1
  },
  card: {
    backgroundColor: Color.backgroundWhite,
    borderRadius: 12,
    marginHorizontal: '18%'
  },
  boxCard: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  contentSubContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  boxRed: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: Color.mainColor
  },
  boxGrey: {
    width: '47%',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: Color.fontBlack40
  },
  modalContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  }
});

export default connect()(ModalConfirmationType5);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Tatas
 * createdDate: 15/10/2021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 *
 *
 */

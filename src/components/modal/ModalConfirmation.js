import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity
} from 'react-native';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import { StatusBarRedOP40 } from '../StatusBarGlobal';
import Fonts from '../../helpers/GlobalFont';
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalConfirmation extends Component {
  constructor(props) {
    super(props);
  }
  /** MAIN RENDER */
  render() {
    return (
      <Modal
        visible={this.props.open}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBarRedOP40 />
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.boxCard}>
              <View style={styles.containerTitle}>
                <Text style={Fonts.type43}>Konfirmasi</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={[Fonts.type17, { textAlign: 'center' }]}>
                  {this.props.content}
                </Text>
              </View>
              {this.props.subContent ? (
                <View style={styles.contentSubContainer}>
                  <Text style={Fonts.type44}>{this.props.subContent}</Text>
                </View>
              ) : (
                <View />
              )}
              {this.props.type === 'okeNotRed' ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.boxGrey}
                    onPress={this.props.ok}
                  >
                    <Text style={Fonts.type45}>Ya</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.boxRed}
                    onPress={this.props.cancel}
                  >
                    <Text style={Fonts.type45}>Tidak</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.boxRed}
                    onPress={this.props.ok}
                  >
                    <Text style={Fonts.type45}>Ya</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.boxGrey}
                    onPress={this.props.cancel}
                  >
                    <Text style={Fonts.type45}>Tidak</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'relative',
    height: '100%',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
    height: 0.25 * height,
    borderRadius: 20,
    marginHorizontal: '18%'
  },
  boxCard: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: '5%',
    height: '100%'
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%'
  },
  contentSubContainer: {
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  boxRed: {
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 13,
    width: '45%',
    backgroundColor: masterColor.mainColor
  },
  boxGrey: {
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
    paddingVertical: 13,
    width: '45%',
    backgroundColor: masterColor.fontBlack40
  }
});

export default connect()(ModalConfirmation);

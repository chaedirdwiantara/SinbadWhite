import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Fonts from '../../utils/Fonts';
import * as ActionCreators from '../../state/actions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalBottomPaymentType extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.omsGetPaymentProcess({
      parcelId: this.props.parcelId
    });
  }

  renderListPaymentTypeContent(item) {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          height: 0.09 * height
        }}
      >
        <View style={{ width: '10%', justifyContent: 'center' }}>
          <Image
            source={{
              uri: item.paymentType.iconUrl
            }}
            style={
              !item.availableStatus
                ? [styles.icons, { opacity: 0.5 }]
                : styles.icons
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <Text
              style={
                !item.availableStatus
                  ? [styles.title, { opacity: 0.5 }]
                  : styles.title
              }
            >
              {item.paymentType.name}
            </Text>
          </View>
          <View>
            <Text
              style={
                !item.availableStatus
                  ? [styles.description, { opacity: 0.5 }]
                  : styles.description
              }
            >
              {item.paymentType.description}
            </Text>
          </View>
        </View>
        <View style={{ width: '5%', justifyContent: 'center' }}>
          <MaterialIcons
            name="navigate-next"
            size={24}
            style={!item.availableStatus ? { opacity: 0.5 } : {}}
          />
        </View>
      </View>
    );
  }

  renderListPaymentType() {
    return this.props.oms.dataOmsGetPayment.map((item, index) => {
      return (
        <View key={index}>
          {!item.availableStatus ? (
            <View>{this.renderListPaymentTypeContent(item)}</View>
          ) : (
            <TouchableOpacity
              onPress={() => this.props.selectPaymentType(item)}
            >
              {this.renderListPaymentTypeContent(item)}
            </TouchableOpacity>
          )}

          <View style={styles.lines} />
        </View>
      );
    });
  }

  renderSkeleton() {
    const paymentTypeSkeleton = [];
    for (let i = 0; i < 3; i++) {
      paymentTypeSkeleton.push(
        <View key={i}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              height: 0.09 * height
            }}
          >
            <View style={{ width: '10%', justifyContent: 'center' }}>
              <SkeletonPlaceholder>
                <View style={{ justifyContent: 'center' }}>
                  <View style={{ width: 24, height: 24, borderRadius: 50 }} />
                </View>
              </SkeletonPlaceholder>
            </View>
            <View style={{ flex: 1 }}>
              <SkeletonPlaceholder>
                <View style={{ justifyContent: 'center', height: '100%' }}>
                  <View
                    style={{
                      height: RFPercentage(1.7),
                      width: '50%',
                      borderRadius: 10
                    }}
                  />
                  <View
                    style={{
                      height: RFPercentage(1.7),
                      width: '90%',
                      borderRadius: 10,
                      marginTop: 8
                    }}
                  />
                  <View
                    style={{
                      height: RFPercentage(1.7),
                      width: '80%',
                      borderRadius: 10,
                      marginTop: 5
                    }}
                  />
                </View>
              </SkeletonPlaceholder>
            </View>
          </View>
          <View style={styles.lines} />
        </View>
      );
    }
    return <View>{paymentTypeSkeleton}</View>;
  }

  render() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        backdropColor="black"
        deviceHeight={height}
        backdropOpacity={0.4}
        style={styles.modalPosition}
      >
        <StatusBar
          backgroundColor="rgba(144, 39, 44, 1)"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: 60 }}>
            <View style={styles.closeContainer}>
              <TouchableOpacity
                onPress={this.props.close}
                style={styles.closeBox}
              >
                <Ionicons
                  name="ios-arrow-back"
                  size={24}
                  color={masterColor.fontBlack50}
                />
              </TouchableOpacity>
              <Text style={styles.titleModalBottom}>Tipe Pembayaran</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            {!this.props.oms.loadingOmsGetPayment &&
            this.props.oms.dataOmsGetPayment !== null ? (
              <ScrollView>{this.renderListPaymentType()}</ScrollView>
            ) : (
              this.renderSkeleton()
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 0.6 * height,
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000,
    paddingBottom: 0.01 * height
  },
  modalPosition: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainer: {
    flex: 1
  },
  lines: {
    marginLeft: 10,
    borderTopWidth: 1,
    marginVertical: 10,
    borderColor: '#f2f2f2'
  },
  /**close */
  titleModalBottom: {
    marginTop: 0.03 * height,
    marginBottom: 0.03 * height,
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.8),
    color: '#333333'
  },
  title: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#333333',
    marginBottom: 5
  },
  description: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#333333',
    lineHeight: 16
  },
  closeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    width: '15%',
    height: '100%'
  },
  icons: {
    width: 24,
    height: 24
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomPaymentType);

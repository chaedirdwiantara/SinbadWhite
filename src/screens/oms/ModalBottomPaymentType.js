import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import { StatusBarRedOP50 } from '../../components/StatusBarGlobal';
import GlobalStyles from '../../helpers/GlobalStyle';
import SkeletonType8 from '../../components/skeleton/SkeletonType8';
import Fonts from '../../helpers/GlobalFont';

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
          alignItems: 'center',
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
          <View style={{ marginBottom: 5 }}>
            <Text
              style={
                !item.availableStatus
                  ? [Fonts.type16, { opacity: 0.5 }]
                  : Fonts.type16
              }
            >
              {item.paymentType.name}
            </Text>
          </View>
          <View>
            <Text
              style={
                !item.availableStatus
                  ? [Fonts.type17, { opacity: 0.5 }]
                  : Fonts.type17
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

          <View
            style={[GlobalStyles.lines, { marginLeft: 16, marginVertical: 10 }]}
          />
        </View>
      );
    });
  }

  renderSkeleton() {
    return <SkeletonType8 />;
  }
  /** MAIN */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          {!this.props.oms.loadingOmsGetPayment &&
          this.props.oms.dataOmsGetPayment !== null ? (
            <ScrollView>{this.renderListPaymentType()}</ScrollView>
          ) : (
            this.renderSkeleton()
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  container: {
    height: 0.4 * height
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomPaymentType);

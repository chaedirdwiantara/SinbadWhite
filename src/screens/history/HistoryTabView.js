import {
  React,
  Component,
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from '../../library/reactPackage'
import {
  connect
} from '../../library/thirdPartyPackage'
import { Fonts } from '../../helpers'
import masterColor from '../../config/masterColor';

class HistoryTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'payment'
    };
  }
  /**
   * ======================
   * FUNCTIONAL
   * ======================
   */
  /** SEND DATA TO PARENT */
  toParentChangeTab(section) {
    this.props.parentFunction({ type: 'section', data: section });
  }
  /** SAVE DATA TO STATE */
  changeTabs(section) {
    this.setState({ activeTab: section });
    this.toParentChangeTab(section);
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === STYLE === */
  styleTabs(section) {
    return this.state.activeTab === section
      ? [
          styles.boxTabItem,
          {
            borderBottomWidth: 2,
            borderBottomColor: masterColor.mainColor
          }
        ]
      : [
          styles.boxTabItem,
          {
            borderBottomWidth: 1,
            borderBottomColor: masterColor.fontBlack10
          }
        ];
  }
  /** === SECTION LIST === */
  renderSectionPayment() {
    return this.state.activeTab === 'payment' ? (
      <View style={this.styleTabs('payment')}>
        <Text
          style={
            this.state.activeTab === 'payment'
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          Tagihan
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={this.styleTabs('payment')}
        onPress={() => this.changeTabs('payment')}
      >
        <Text
          style={
            this.state.activeTab === 'payment'
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          Tagihan
        </Text>
      </TouchableOpacity>
    );
  }
  /** === SECTION MAP === */
  renderSectionOrder() {
    return this.state.activeTab === 'order' ? (
      <View style={this.styleTabs('order')}>
        <Text
          style={
            this.state.activeTab === 'order'
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          Order
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={this.styleTabs('order')}
        onPress={() => this.changeTabs('order')}
      >
        <Text
          style={
            this.state.activeTab === 'order'
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          Order
        </Text>
      </TouchableOpacity>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return (
      <View style={styles.boxTabs}>
        {this.renderSectionPayment()}
        {this.renderSectionOrder()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxTabs: {
    height: 44,
    flexDirection: 'row'
  },
  boxTabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(HistoryTabView);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 06072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/

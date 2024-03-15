import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  MaterialIcon,
  connect
} from '../../library/thirdPartyPackage';
import { Color } from '../../config';
import { GlobalStyle, Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';

class ModalFilterListDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterList: [
        'Semua Toko',
        'Toko PJP',
        'Toko Non-PJP',
        'Sudah Dikunjungi',
        'Belum Dikunjungi'
      ]
    };
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === RENDER ITEM === */
  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        key={index}
        style={styles.boxContainer}
        onPress={() => this.props.onPress(item)}
      >
        <View style={styles.boxItem}>
          <Text style={Fonts.type16}>{item}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          {this.props.selectedFilter === item ? (
            <MaterialIcon
              name="radio-button-checked"
              color={Color.mainColor}
              size={24}
            />
          ) : (
            <MaterialIcon
              name="radio-button-unchecked"
              color={Color.fontBlack40}
              size={24}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={[GlobalStyle.lines, { marginLeft: 9 }]} />;
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.filterList}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.backgroundWhite
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16
  },
  boxItem: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flex: 1
  },
  boxImage: {
    height: 65,
    width: 65,
    borderRadius: 10
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalFilterListDataView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 09082021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> add modal filter on journey map view.
 */

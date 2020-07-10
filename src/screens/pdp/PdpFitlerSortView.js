import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  MaterialIcon
} from '../../library/thirdPartyPackage'
import {
  StatusBarRedOP50,
  ButtonSingle
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
import { Color } from '../../config'

class PdpFilterSortView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['Harga Tinggi ke Rendah', 'Harga Rendah ke Tinggi'],
      sortIndex: this.props.sortIndex
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  toParentFunction() {
    let sort = '';
    let sortBy = '';
    switch (this.state.sortIndex) {
      case 0:
        sortBy = 'retail_buying_price';
        sort = 'desc';
        break;
      case 1:
        sortBy = 'retail_buying_price';
        sort = 'asc';
        break;
      case null:
        sortBy = 'name';
        sort = 'asc';
        break;
      default:
        break;
    }
    this.props.parentFunction({
      type: 'sortSelected',
      data: {
        sortIndex: this.state.sortIndex,
        sort,
        sortBy
      }
    });
  }

  checkSort(index) {
    if (index === this.state.sortIndex) {
      this.setState({ sortIndex: null });
    } else {
      this.setState({ sortIndex: index });
    }
  }
  /** RENDER CONTENT */
  renderContent() {
    return this.state.data.map((item, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => this.checkSort(index)}>
          <View style={styles.boxContentItem}>
            <View style={{ flex: 1 }}>
              <Text style={Fonts.type8}>{item}</Text>
            </View>
            <View style={styles.boxIconRight}>
              {this.state.sortIndex === index ? (
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
          </View>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        </TouchableOpacity>
      );
    });
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={false}
        title={'Terapkan'}
        borderRadius={4}
        onPress={() => this.toParentFunction()}
      />
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        {this.renderContent()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  boxContentItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boxIconRight: {
    position: 'absolute',
    right: 20
  }
});

export default PdpFilterSortView;

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 07072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/

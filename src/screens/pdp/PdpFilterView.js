import {
  React,
  Component,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image
} from '../../library/reactPackage'
import {
  connect,
  bindActionCreators
} from '../../library/thirdPartyPackage'
import { GlobalStyle, Fonts } from '../../helpers'
import { Color } from '../../config'
import * as ActionCreators from '../../state/actions';

class PdpFilterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: 'grid'
    };
  }
  /** === FUNCTIONAL === */
  toParentFunction(data) {
    this.props.parentFunction(data);
    if (data.type === 'layout') {
      this.setState({ layout: data.data });
    }
  }
  /** === RENDER SORT === */
  renderSort() {
    return (
      <TouchableOpacity onPress={() => this.toParentFunction({ type: 'sort' })}>
        {this.props.sort === null ? (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/icons/pdp/short.png')}
              style={styles.imageIcon}
            />
            <Text style={[Fonts.type40, { textAlign: 'center' }]}>Urutkan</Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/icons/pdp/short-red.png')}
              style={styles.imageIcon}
            />
            <Text style={[Fonts.type28, { textAlign: 'center' }]}>Urutkan</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
  /** === RENDER FILTER === */
  renderFilter() {
    return (
      <TouchableOpacity
        onPress={() => this.toParentFunction({ type: 'filter' })}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/icons/pdp/filter.png')}
            style={styles.imageIcon}
          />
          <Text style={[Fonts.type40, { textAlign: 'center' }]}>Filter</Text>
        </View>
      </TouchableOpacity>
    );
  }
  /** === RENDER CATEGORY === */
  renderCategory() {
    return (
      <TouchableOpacity
        onPress={() => this.toParentFunction({ type: 'category' })}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/icons/pdp/category.png')}
            style={styles.imageIcon}
          />
          <Text style={[Fonts.type40, { textAlign: 'center' }]}>Kategori</Text>
        </View>
      </TouchableOpacity>
    );
  }
  /** === LAYOUT === */
  renderLayout() {
    let iconFilter = null;
    if (this.state.layout === 'grid') {
      iconFilter = (
        <TouchableOpacity
          onPress={() =>
            this.toParentFunction({ type: 'layout', data: 'list' })
          }
        >
          <Image
            source={require('../../assets/icons/pdp/grid.png')}
            style={styles.imageIcon}
          />
          <Text style={[Fonts.type40, { textAlign: 'center' }]}>Grid</Text>
        </TouchableOpacity>
      );
    } else if (this.state.layout === 'list') {
      iconFilter = (
        <TouchableOpacity
          onPress={() =>
            this.toParentFunction({ type: 'layout', data: 'line' })
          }
        >
          <Image
            source={require('../../assets/icons/pdp/viewlist-float.png')}
            style={styles.imageIcon}
          />
          <Text style={[Fonts.type40, { textAlign: 'center' }]}>List</Text>
        </TouchableOpacity>
      );
    } else if (this.state.layout === 'line') {
      iconFilter = (
        <TouchableOpacity
          onPress={() =>
            this.toParentFunction({ type: 'layout', data: 'grid' })
          }
        >
          <Image
            source={require('../../assets/icons/pdp/line.png')}
            style={styles.imageIcon}
          />
          <Text style={[Fonts.type40, { textAlign: 'center' }]}>Line</Text>
        </TouchableOpacity>
      );
    }
    return <View style={{ alignItems: 'center' }}>{iconFilter}</View>;
  }
  /** === MAIN === */
  render() {
    return (
      <View style={[styles.mainContainer, GlobalStyle.shadowForBox10]}>
        <View style={styles.boxContent}>{this.renderSort()}</View>
        {/* <View style={styles.boxContent}>{this.renderFilter()}</View> */}
        <View style={styles.boxContent}>{this.renderLayout()}</View>
        {/* <View style={styles.boxContent}>{this.renderCategory()}</View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.backgroundWhite,
    height: 55,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  boxContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageIcon: {
    height: 24,
    width: 24
  }
});

const mapStateToProps = ({ pdp }) => {
  return { pdp };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PdpFilterView);

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

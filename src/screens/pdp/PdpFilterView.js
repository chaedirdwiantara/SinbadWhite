import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
// import SortBottom from '../../components/SortBottom';
// import FilterBottom from '../../components/FilterBottom';

const { width, height } = Dimensions.get('window');

class PdpFilterView extends Component {
  constructor(props) {
    super(props);
  }

  renderSort() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.openSort()}
          style={styles.boxContent}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/pdp/short.png')}
              style={styles.imageIcon}
            />
            <Text style={[Fonts.type40, { textAlign: 'center' }]}>Urutkan</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderLayout() {
    let iconFilter = null;
    if (this.props.pdp.pdpDisplay === 'grid') {
      iconFilter = (
        <TouchableOpacity onPress={() => this.props.pdpChangeDisplay('list')}>
          <Image
            source={require('../../assets/images/pdp/grid.png')}
            style={styles.imageIcon}
          />
          <Text style={[Fonts.type40, { textAlign: 'center' }]}>Grid</Text>
        </TouchableOpacity>
      );
    } else if (this.props.pdp.pdpDisplay === 'list') {
      iconFilter = (
        <TouchableOpacity onPress={() => this.props.pdpChangeDisplay('line')}>
          <Image
            source={require('../../assets/images/pdp/viewlist-float.png')}
            style={styles.imageIcon}
          />
          <Text style={[Fonts.type40, { textAlign: 'center' }]}>List</Text>
        </TouchableOpacity>
      );
    } else if (this.props.pdp.pdpDisplay === 'line') {
      iconFilter = (
        <TouchableOpacity onPress={() => this.props.pdpChangeDisplay('grid')}>
          <Image
            source={require('../../assets/images/pdp/line.png')}
            style={styles.imageIcon}
          />
          <Text style={[Fonts.type40, { textAlign: 'center' }]}>Line</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        <View style={styles.boxContent}>{iconFilter}</View>
      </View>
    );
  }

  renderFilter() {
    return (
      <View>
        <TouchableOpacity
          style={styles.boxContent}
          onPress={() => this.openFilter()}
        >
          <View>
            <Image
              source={require('../../assets/images/pdp/filter.png')}
              style={styles.imageIcon}
            />
            <Text style={[Fonts.type40, { textAlign: 'center' }]}>Filter</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.boxFilter}>
          <View style={styles.boxContent}>{this.renderSort()}</View>
          <View style={styles.boxContent}>{this.renderFilter()}</View>
          <View style={styles.boxContent}>{this.renderLayout()}</View>

          {/* <TouchableOpacity
            style={styles.boxContent}
            onPress={() => moveToProductCategory(this.props.componentId)}
          >
            <Image
              source={require('../../assets/icons/category.png')}
              style={styles.imageIcon}
            />
            <Text style={styles.textIcon}>Kategori</Text>
          </TouchableOpacity> */}
        </View>
        {/* {this.state.sortButton ? (
          <SortBottom
            title="Urutkan"
            openSort={this.state.sortButton}
            sortContent={this.state.sortContent}
            onRef={ref => (this.checkSortFromChild = ref)}
            checkSortFromChild={this.checkSort.bind(this)}
            close={() => this.setState({ sortButton: false })}
            sortChecked={this.state.sortCheck}
          />
          <View />
        ) : (
          <View />
        )} */}

        {/* {this.state.filterButton ? (
          <FilterBottom
            onRef={ref => (this.filterFromChild = ref)}
            filterFromChild={this.doFilter.bind(this)}
            openFilter={this.state.filterButton}
            close={() => this.setState({ filterButton: false })}
            dataLabel={
              this.props.product.dataKeywordProductList.length === 0
                ? []
                : this.props.product.dataKeywordProductList
            }
            dataFilter={this.props.product.dataProductFilter}
            price
            label={this.props.product.dataKeywordProductList.length > 0}
          />
          <View />
        ) : (
          <View />
        )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  boxFilter: {
    zIndex: 1,
    flexDirection: 'row',
    width,
    paddingHorizontal: '10%',
    height: 55,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    margin: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22
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
  // textIcon: {
  //   textAlign: 'center',
  //   color: '#828282',
  //   fontSize: 10,
  //   fontFamily: Fonts.MontserratSemiBold
  // }
});

const mapStateToProps = ({ pdp }) => {
  return { pdp };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PdpFilterView);

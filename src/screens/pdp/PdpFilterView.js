import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

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
      <View style={[styles.mainContainer, GlobalStyle.shadowForBox10]}>
        <View style={styles.boxContent}>{this.renderSort()}</View>
        <View style={styles.boxContent}>{this.renderFilter()}</View>
        <View style={styles.boxContent}>{this.renderLayout()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: masterColor.backgroundWhite,
    height: 55,
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

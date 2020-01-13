import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarRedOP50 } from '../../components/StatusBarGlobal';
import ButtonSingle from '../../components/button/ButtonSingle';

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
                <MaterialIcons
                  name="radio-button-checked"
                  color={masterColor.mainColor}
                  size={24}
                />
              ) : (
                <MaterialIcons
                  name="radio-button-unchecked"
                  color={masterColor.fontBlack40}
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
    backgroundColor: masterColor.backgroundWhite
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

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarBlackOP40 } from '../../components/StatusBarGlobal';
import ButtonSingle from '../../components/button/ButtonSingle';

class HistoryFilterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: this.props.portfolio,
      dateGte: this.props.dateGte,
      dateLte: this.props.dateLte
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  parentFunction(data) {
    this.props.parentFunction(data);
  }

  clearFilter() {
    this.setState({
      portfolio: [],
      dateGte: '',
      dateLte: ''
    });
    this.props.parentFunction({
      type: 'doFilter',
      data: {
        portfolio: [],
        dateFilter: {
          dateGte: this.state.dateGte,
          dateLte: this.state.dateLte
        }
      }
    });
  }

  modifyPorfolio() {
    let portfolio = '';
    this.state.portfolio.map((item, index) => {
      const name = this.props.merchant.dataGetPortfolio.find(
        itemPortfolio => itemPortfolio.id === item
      ).name;
      portfolio =
        portfolio +
        name +
        (index + 1 === this.state.portfolio.length ? '' : ', ');
    });
    return portfolio;
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER CONTENT PORTFOLIO */
  renderPortfolio() {
    return (
      <TouchableOpacity
        onPress={() => this.parentFunction({ type: 'portfolio' })}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <View>
            <Text style={[Fonts.type42, { marginBottom: 5 }]}>Portfolio</Text>
            {this.state.portfolio.length > 0 ? (
              <Text style={Fonts.type23}>{this.modifyPorfolio()}</Text>
            ) : (
              <Text style={Fonts.type23}>(Semua)</Text>
            )}
          </View>
          <View style={{ justifyContent: 'center' }}>
            <MaterialIcons
              name="chevron-right"
              color={masterColor.fontBlack40}
              size={24}
            />
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
      </TouchableOpacity>
    );
  }
  /** RENDER CONTENT PORTFOLIO */
  renderDate() {
    return (
      <TouchableOpacity onPress={() => this.parentFunction({ type: 'date' })}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <View>
            <Text style={[Fonts.type42, { marginBottom: 5 }]}>
              Tanggal Order{' '}
            </Text>
            <Text style={Fonts.type23}>(Semua)</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <MaterialIcons
              name="chevron-right"
              color={masterColor.fontBlack40}
              size={24}
            />
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
      </TouchableOpacity>
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View>
        <View style={styles.boxSubTitle}>
          <Text style={Fonts.type61}>Pilih filter sesuai preferensi Anda</Text>
          <TouchableOpacity onPress={() => this.clearFilter()}>
            <Text style={Fonts.type62}>Hapus</Text>
          </TouchableOpacity>
        </View>
        {this.renderPortfolio()}
        {this.renderDate()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.state.portfolio.length === 0 &&
          (this.state.dateGte === '' || this.state.dateLte === '')
        }
        title={'Terapkan'}
        borderRadius={4}
        onPress={() =>
          this.parentFunction({
            type: 'doFilter',
            data: {
              portfolio: this.state.portfolio,
              dateFilter: {
                dateGte: this.state.dateGte,
                dateLte: this.state.dateLte
              }
            }
          })
        }
      />
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarBlackOP40 />
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
  boxSubTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 5
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(HistoryFilterView);

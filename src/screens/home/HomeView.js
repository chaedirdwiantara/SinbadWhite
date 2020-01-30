import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import Fonts from '../../helpers/GlobalFont';
import GlobalStyles from '../../helpers/GlobalStyle';
import { StatusBarWhite } from '../../components/StatusBarGlobal';
import BackHandlerCloseApp from '../../components/BackHandlerCloseApp';

const { width } = Dimensions.get('window');

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          title1: 'Journey',
          title2: 'Plan',
          image: require('../../assets/images/menu/journey_plan.png'),
          goTo: 'journey_plan'
        },
        {
          title1: 'List',
          title2: 'Toko',
          image: require('../../assets/images/menu/list_toko.png'),
          goTo: 'list_toko'
        },
        {
          title1: 'Dashboard',
          title2: '',
          image: require('../../assets/images/menu/dashboard.png'),
          goTo: 'dashboard'
        }
      ]
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.props.navigation.setParams({
      fullName: this.props.user.fullName,
      imageUrl: this.props.user.imageUrl
    });
  }
  /** === GO TO PAGE === */
  goToPage(item) {
    switch (item.goTo) {
      case 'dashboard':
        NavigationService.navigate('DashboardView');
        break;
      case 'list_toko':
        NavigationService.navigate('MerchantView');
        break;
      case 'journey_plan':
        NavigationService.navigate('JourneyView');
        break;
      default:
        break;
    }
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => NavigationService.navigate('NotificationView')}
        >
          <MaterialIcon
            color={masterColor.fontBlack40}
            name={'notifications'}
            size={24}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View style={styles.headerLeftBox}>
          {navigation.state.params ? (
            navigation.state.params.imageUrl !== null ? (
              <View>
                <Image
                  source={{ uri: navigation.state.params.imageUrl }}
                  style={styles.circleImage}
                />
              </View>
            ) : (
              <View>
                <MaterialIcon
                  name="account-circle"
                  color={masterColor.mainColor}
                  size={30}
                />
              </View>
            )
          ) : (
            <View>
              <MaterialIcon
                name="account-circle"
                color={masterColor.mainColor}
                size={30}
              />
            </View>
          )}

          <View style={{ marginLeft: 12 }}>
            <Text style={Fonts.type5}>
              Hello{' '}
              {navigation.state.params
                ? navigation.state.params.fullName.length >= 20
                  ? navigation.state.params.fullName.substring(0, 20) + '...'
                  : navigation.state.params.fullName
                : ''}{' '}
              !
            </Text>
          </View>
        </View>
      )
    };
  };
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === RENDER BANNER === */
  renderBanner() {
    return (
      <View style={{ paddingVertical: 10 }}>
        <View style={styles.boxBanner}>
          <Image
            source={require('../../assets/images/sinbad_image/Sinbad-Agent-Apps.png')}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: undefined,
              aspectRatio: 7 / 3
            }}
          />
        </View>
      </View>
    );
  }
  /** === RENDER MENU === */
  renderMenu() {
    return (
      <View style={{ paddingVertical: 10 }}>
        <FlatList
          numColumns={4}
          showsHorizontalScrollIndicator={false}
          data={this.state.menu}
          renderItem={this.renderMenuItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  /** === RENDER MENU ITEM === */
  renderMenuItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.menuBoxPerItem}
        key={index}
        onPress={() => this.goToPage(item)}
      >
        <Image source={item.image} style={styles.menuCircleImage} />
        <View style={styles.menuTitleBox}>
          <Text style={Fonts.type8}>{item.title1}</Text>
          <Text style={Fonts.type8}>{item.title2}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  /** === RENDER LAST ACTIVITY === */
  renderLastActivity() {
    return (
      <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
        <View>
          <Text style={Fonts.type7}>Last Actvity</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 16 }}>
          <View style={GlobalStyles.lines} />
        </View>
      </View>
    );
  }
  /** === RENDER LAST ACTIVITY ITEM === */
  renderLastActivityItem() {
    return (
      <View>
        <Text>last activity content</Text>
      </View>
    );
  }
  /** === RENDER ITEM MAIN === */
  renderItem({ item, index }) {
    return (
      <View style={styles.mainContainer} key={index}>
        {this.renderBanner()}
        {this.renderMenu()}
        {/* {this.renderLastActivity()} */}
        {/* {this.renderLastActivityItem()} */}
      </View>
    );
  }
  /** === RENDER MAIN DATA === */
  renderData() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator
          data={[1]}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(data, index) => index.toString()}
        />
      </View>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <SafeAreaView>
        <BackHandlerCloseApp navigation={this.props.navigation} />
        <StatusBarWhite />
        {this.renderData()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftBox: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    paddingLeft: 16
  },
  mainContainer: {
    paddingHorizontal: 16
  },
  boxBanner: {
    // backgroundColor: masterColor.mainColor,
    width: '100%',
    borderRadius: 15
    // paddingHorizontal: 20,
    // paddingVertical: 37
  },
  circleImage: {
    height: 30,
    width: 30,
    borderRadius: 30
  },
  menuCircleImage: {
    marginBottom: 6,
    marginHorizontal: 16,
    height: 50,
    width: 50,
    borderRadius: 50
  },
  menuTitleBox: {
    alignItems: 'center'
  },
  menuBoxPerItem: {
    alignItems: 'center',
    marginRight: 5
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

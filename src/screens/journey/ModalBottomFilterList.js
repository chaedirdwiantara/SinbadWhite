import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  Modal
} from '../../library/thirdPartyPackage';
import {
  StatusBarBlackOP40,
  ModalBottomErrorRespons,
  ButtonSingle
} from '../../library/component';
import { Color } from '../../config';
import { Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import ModalFilterListDataView from './ModalBottomFilterListDataView';
const { height } = Dimensions.get('window');

class ModalBottomFilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalErrorGlobal: false,
      filter: this.props.filter
    };
  }
  /**
   * =================
   * FUNCTIONAL
   * ==================
   */
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    /** ERROR RESPONSE */
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <View>
        <View style={styles.boxContentTitle}>
          <View>
            <Text style={Fonts.type7}>Lihat Toko</Text>
          </View>
          <TouchableOpacity style={styles.boxClose} onPress={this.props.close}>
            <MaterialIcon name="close" color={Color.fontBlack50} size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return !this.props.journey.loadingloadingGetJourneyPlanMapData ? (
      <ButtonSingle
        title={'Terapkan'}
        borderRadius={4}
        onPress={() => this.props.save(this.state.filter)}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>
        <ModalFilterListDataView
          selectedFilter={this.state.filter}
          onPress={item => this.setState({ filter: item })}
        />
        {this.renderButton()}
      </View>
    );
  }
  /** === RENDER STATUS BAR === */
  renderContent() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        deviceHeight={height}
        style={styles.mainContainer}
      >
        <View style={styles.contentContainer}>
          {this.renderContentTitle()}
          {this.renderContentBody()}
        </View>
      </Modal>
    );
  }
  /** RENDER MODAL ERROR RESPONSE */
  renderModalErrorResponse() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        statusBarType={'transparent'}
        open={this.state.openModalErrorGlobal}
        onPress={() => this.setState({ openModalErrorGlobal: false })}
      />
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View>
        <StatusBarBlackOP40 />
        {this.renderContent()}
        {this.renderModalErrorResponse()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1,
    paddingTop: 10
  },
  boxContentTitle: {
    marginTop: 18,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ user, merchant, journey }) => {
  return { user, merchant, journey };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomFilterList);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 09082021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> add modal bottom filter list.
 */

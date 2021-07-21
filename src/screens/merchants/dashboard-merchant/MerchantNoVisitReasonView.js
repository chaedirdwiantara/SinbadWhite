import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  ButtonSingle,
  LoadingPage,
  InputType3,
  ModalBottomErrorRespons
} from '../../../library/component';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';

class MerchantNoVisitReasonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalError: false,
      selectedReason: '',
      reason: ''
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.props.merchantGetNoVisitReasonProcess();
  }
  componentDidUpdate(prevProps) {
    /** error get list of reason not visit */
    if (
      prevProps.merchant.errorGetNoVisitReason !==
      this.props.merchant.errorGetNoVisitReason
    ) {
      if (this.props.merchant.errorGetNoVisitReason !== null) {
        this.setState({ openModalError: true });
      }
    }
  }
  /** REASON SELECT */
  selectReason(id) {
    if (id === this.state.selectedReason) {
      this.setState({ selectedReason: '' });
    } else {
      this.setState({ selectedReason: id });
    }
  }
  /** NEXT SCREEN TO TAKE A PHOTO */
  takePhoto() {
    Keyboard.dismiss();
    NavigationService.navigate('MerchantNoVisitPicture', {
      storeName: this.props.merchant.selectedMerchant.name,
      notes: {
        noVisitReasonId: this.state.selectedReason,
        noVisitReasonNote: this.state.reason
      }
    });
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER CONTENT ITEM */
  renderContentItem(item, index) {
    let checked = false;
    if (this.state.selectedReason === item.id) {
      checked = true;
    }

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.selectReason(item.id);
        }}
      >
        <View
          style={[
            styles.boxContentItem,
            { borderColor: checked ? Color.fontRed10 : Color.fontWhite }
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={checked ? Fonts.type8 : Fonts.type9}>
              {item.reason}
            </Text>
          </View>
          <View style={styles.boxIconRight}>
            <View
              style={[
                styles.circleEmptyCheck,
                { borderColor: checked ? Color.mainColor : Color.fontBlack40 }
              ]}
            >
              {checked ? <View style={styles.circleChecked} /> : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.props.merchant.dataGetNoVisitReason.map((item, index) => {
          return this.renderContentItem(item, index);
        })}
      </View>
    );
  }
  /** RENDER CONTENT REASON */
  renderContentReason() {
    return (
      <View style={styles.contentReasonContainer}>
        <InputType3
          title={'Catatan'}
          value={this.state.reason}
          placeholder={'Silahkan isi catatan untuk alasan yang dipilih'}
          keyboardType={'default'}
          text={text => this.setState({ reason: text })}
          error={false}
          errorText={''}
          maxLength={140}
          backgroundColor={Color.backgroundWhite}
        />
        <View style={styles.maxCharacters}>
          <Text style={Fonts.type12}>{`${
            this.state.reason.length
          }/140 karakter`}</Text>
        </View>
      </View>
    );
  }
  /** RENDER DATA */
  renderData() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {this.renderContent()}
          {this.renderContentReason()}
        </ScrollView>
        {this.renderButton()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.state.selectedReason === '' ||
          this.state.reason === '' ||
          this.props.merchant.loadingPostActivity
        }
        title={'Ambil Foto'}
        loading={this.props.merchant.loadingPostActivity}
        borderRadius={4}
        onPress={() => this.takePhoto()}
      />
    );
  }
  /** RENDER MODAL ERROR RESPONSE */
  renderModalErrorResponse() {
    return this.state.openModalError ? (
      <ModalBottomErrorRespons
        statusBarType={'transparent'}
        open={this.state.openModalError}
        onPress={() => this.setState({ openModalError: false })}
      />
    ) : (
      <View />
    );
  }
  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {!this.props.merchant.loadingGetNoVisitReason &&
        this.props.merchant.dataGetNoVisitReason !== null ? (
          this.renderData()
        ) : (
          <LoadingPage />
        )}
        {/* modal */}
        {this.renderModalErrorResponse()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    backgroundColor: Color.fontBlack05,
    paddingVertical: 16
  },
  boxContentItem: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
    justifyContent: 'space-between'
  },
  boxIconRight: {
    position: 'absolute',
    right: 20
  },
  circleChecked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Color.mainColor
  },
  circleEmptyCheck: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentReasonContainer: {
    marginTop: 20
  },
  maxCharacters: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantNoVisitReasonView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 21072021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> create new screen no visit reason.
 * -> add modal error when failed get list of reason not visit.
 */

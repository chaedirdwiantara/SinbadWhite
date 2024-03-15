import { React, Component, View, StyleSheet } from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import { InputType4, ButtonSingle } from '../../library/component';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';

class ProfileDataNameEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.user.fullName
    };
  }

  checkButtonDisabled() {
    if (this.state.fullName !== this.props.user.fullName) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.profile.dataEditProfile !== this.props.profile.dataEditProfile
    ) {
      if (this.props.profile.dataEditProfile !== null) {
        NavigationService.goBack(this.props.navigation.state.key);
      }
    }
  }

  edit() {
    this.props.profileEditProcess({
      agentId: this.props.user.id,
      params: {
        fullName: this.state.fullName
      }
    });
  }

  renderContent() {
    return (
      <View style={{ marginTop: 16, flex: 1 }}>
        <InputType4
          title={'Nama'}
          value={this.state.fullName}
          placeholder={'Nama'}
          keyboardType={'default'}
          text={fullName => this.setState({ fullName })}
        />
      </View>
    );
  }

  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.checkButtonDisabled() || this.props.profile.loadingEditProfile
        }
        loading={this.props.profile.loadingEditProfile}
        title={'Simpan'}
        borderRadius={4}
        onPress={() => this.edit()}
      />
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
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
  contentContainer: {
    backgroundColor: Color.backgroundWhite,
    marginBottom: 16,
    paddingVertical: 6
  }
});

const mapStateToProps = ({ profile, user }) => {
  return { profile, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDataNameEdit);

import {
  React,
  Component,
  View,
  StyleSheet
} from '../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage'
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import ComingSoon from '../../components/empty_state/ComingSoon';

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        <ComingSoon />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ChatView);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 06072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/

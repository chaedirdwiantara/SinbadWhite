import {
  React,
  Component,
  View,
  Text
} from '../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage'
import * as ActionCreators from '../../state/actions';

class LogDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Detail Log</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(LogDetailView);

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

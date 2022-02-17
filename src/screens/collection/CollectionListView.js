import { React, Component, Text } from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
class CollectionListView extends Component {
  render() {
    return (
      <>
        <Text>Collection List</Text>
      </>
    );
  }
}
const mapStateToProps = ({ user, auth, salesmanKpi, permanent }) => {
  return { user, auth, salesmanKpi, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionListView);

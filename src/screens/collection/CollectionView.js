import { React, Component, Text } from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import { SearchBarType8 } from '../../library/component';
import * as ActionCreators from '../../state/actions';
class CollectionView extends Component {
  renderHeader() {
    return (
      <SearchBarType8
        placeholder="Cari nama/ID Toko disini"
        fetchFn={searchKeyword => console.log(searchKeyword)}
      />
    );
  }
  render() {
    return (
      <>
        {this.renderHeader()}
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
)(CollectionView);

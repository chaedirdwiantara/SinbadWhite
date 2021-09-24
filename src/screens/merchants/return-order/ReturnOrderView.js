import {
  React,
  Component,
  View,
  Text,
  StyleSheet
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import { StatusBarWhite, SearchBarType5 } from '../../../library/component';
import masterColor from '../../../config/masterColor.json';
import * as ActionCreators from '../../../state/actions';

class ReturnOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    /** Call Return Order */
  }

  parentFunction(data) {
    console.log(data);
  }

  renderSearchBar() {
    return (
      <View>
        <SearchBarType5
          placeholder={'Nama produk / ID faktur'}
          searchText={this.state.searchText}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }

  renderContent() {
    return <View>{this.renderSearchBar()}</View>;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderContent()}
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

const mapStateToProps = ({ history, user, merchant }) => {
  return { history, user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReturnOrderView);

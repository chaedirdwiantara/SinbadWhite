import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';

class ExampleHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Home');
  }

  render() {
    return (
      <View>
        <Text>Example Home</Text>
        <TouchableOpacity onPress={() => NavigationService.navigate('Detail')}>
          <Text>To Next Page Ya</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ example }) => {
  return { example };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ExampleHome);

import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';

class ExampleView extends Component {
  componentDidMount() {
    console.log('View');
  }
  render() {
    return (
      <View>
        <Text>Example Page</Text>
        <TouchableOpacity onPress={() => NavigationService.navigate('Home')}>
          <Text>To Home Page lala</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(ExampleView);

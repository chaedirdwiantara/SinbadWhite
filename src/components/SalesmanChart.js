import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { LoadingPage } from '../library/component';
import { Fonts } from '../helpers';

const LoadingView = () => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'rgba(250,250,250 ,0.8)'
      }}
    >
      <LoadingPage />
    </View>
  );
};

class SalesmanGraph extends React.Component {
  componentWillUnmount() {
    this.props.onExit();
  }

  _onPostMessage = e => {
    let data = e.nativeEvent.data;

    /* eslint-disable indent */
    switch (data) {
      case 'FINISH':
        this.props.onExit();
        break;

      case 'EXIT':
        this.props.onExit();
        break;
    }
    /* eslint-enable indent */
  };

  render() {
    /* eslint-disable indent */
    return (
      <React.Fragment>
        {this.props.isVisible ? (
          <View>
            <Text style={[Fonts.type7]}>{this.props.title}</Text>
            <View
              style={[
                this.props.style,
                {
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 2,
                  borderWidth: 0,
                  borderRadius: 7,
                  marginHorizontal: 0,
                  marginVertical: 5,
                  padding: 2,
                  height: 250
                }
              ]}
            >
              <WebView
                source={{
                  uri: this.props.uri,
                  headers: { Authorization: 'Bearer ' + this.props.token }
                }}
                containerStyle={{
                  borderRadius: 7
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={true}
                scrollEnabled={false}
                renderLoading={() => <LoadingView />}
                onMessage={this._onPostMessage}
              />
            </View>
          </View>
        ) : null}
      </React.Fragment>
    );
    /* eslint-enable indent */
  }
}

SalesmanGraph.propTypes = {
  onShow: PropTypes.func,
  onExit: PropTypes.func,
  style: PropTypes.object,
  isVisible: PropTypes.bool,
  token: PropTypes.string,
  uri: PropTypes.string,
  title: PropTypes.string
};

SalesmanGraph.defaultProps = {
  onShow: () => null,
  onExit: () => null,
  style: {},
  isVisible: false,
  token: '',
  uri: '',
  title: 'Title Chart'
};

export default SalesmanGraph;

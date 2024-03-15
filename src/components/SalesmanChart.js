import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { LoadingPage } from '../library/component';
import { Fonts } from '../helpers';

const LoadingView = ({ solid }) => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        zIndex: 2,
        position: 'absolute',
        backgroundColor: solid ? '#FFFFFF' : 'rgba(250,250,250 ,0.8)'
      }}
    >
      <LoadingPage />
    </View>
  );
};

class SalesmanGraph extends React.Component {
  state = {
    load: true
  };

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
            <Text
              style={[
                Fonts.type7,
                {
                  marginLeft: 10
                }
              ]}
            >
              {this.props.title}
            </Text>
            <View
              style={[
                this.props.style,
                {
                  height: 250
                }
              ]}
            >
              <View
                style={{
                  zIndex: -1,
                  width: '100%',
                  height: '100%'
                }}
              >
                {this.state.load ? <LoadingView /> : null}
                <WebView
                  source={{
                    uri: this.props.uri,
                    headers: { Authorization: 'Bearer ' + this.props.token }
                  }}
                  style={{
                    zIndex: 1
                  }}
                  containerStyle={{
                    borderRadius: 7
                  }}
                  onError={e => {
                    if (e.nativeEvent.code < 0) {
                      console.log(e.nativeEvent);
                    }
                  }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  scalesPageToFit={true}
                  scrollEnabled={false}
                  startInLoadingState
                  onLoadEnd={() => {
                    setTimeout(() => {
                      this.setState({
                        load: false
                      });
                    }, 2000);
                  }}
                  onLoadStart={() => {
                    this.setState({
                      load: true
                    });
                  }}
                  renderError={() => <LoadingView solid />}
                  renderLoading={() => <LoadingView />}
                  onMessage={this._onPostMessage}
                />
              </View>
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

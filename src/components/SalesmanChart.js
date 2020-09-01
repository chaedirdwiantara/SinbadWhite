import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

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
        {
          this.props.isVisible ? <View style={this.props.style}>
                                     <WebView
                                       source={{ uri: this.props.uri, headers: { Authorization: 'Bearer ' + this.props.token } }}
                                       javaScriptEnabled={true}
                                       domStorageEnabled={true}
                                       scalesPageToFit={true}
                                       scrollEnabled={false}
                                       onMessage={this._onPostMessage}
                                     />
                                   </View> : null
        }
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
};

SalesmanGraph.defaultProps = {
  onShow: () => null,
  onExit: () => null,
  style: {},
  isVisible: false,
  token: '',
  uri: '',
};

export default SalesmanGraph;

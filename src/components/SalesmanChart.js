import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SalesmanGraph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };

    this._checkFlag = null;
    this._isRequesting = false;
  }

  componentWillUnmount() {
    this.props.onExit();
  }

  _onPostMessage = e => {
    let data = e.nativeEvent.data;

    /* eslint-disable indent */
    switch (data) {
      case 'FINISH':
        // navigation.goBack()
        this.props.onExit();
        this.setState({ isVisible: false });
        break;

      case 'EXIT':
        // navigation.goBack()
        this.props.onExit();
        this.setState({ isVisible: false });
        break;
    }
    /* eslint-enable indent */
  };

  render() {
    const { token } = this.props;

    /* eslint-disable indent */
    return (
      <React.Fragment>
        {
          this.props.isVisible ? <View style={this.props.style}>
                                     <WebView
                                       source={{ uri: 'https://kong-dev.sinbad.web.id/supplier/salesmankpi' + `/v1/mobile/page/graph?graphContentType=${this.props.graphContentType}`, headers: { Authorization: 'Bearer ' + token } }}
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
  graphContentType: PropTypes.string,
};

SalesmanGraph.defaultProps = {
  onShow: () => null,
  onExit: () => null,
  style: {},
  isVisible: false,
  token: '',
  graphContentType: '',
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesmanGraph);

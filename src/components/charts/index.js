import React from 'react';
import PropTypes from 'prop-types';
import { ECharts } from 'react-native-echarts-wrapper';

const defaultOption = {
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line'
    },
    {
      data: [],
      type: 'line'
    }
  ]
};

class Charts extends React.Component {
  render() {
    return (
      <ECharts
        option={this.props.data.option}
        {...this.props}
      />
    );
  }
}

Charts.propTypes = {
  data: PropTypes.object
};

Charts.defaultProps = {
  data: {
    option: defaultOption
  }
};

export default Charts;

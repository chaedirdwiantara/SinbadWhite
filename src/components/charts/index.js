import React from 'react';
import PropTypes from 'prop-types';
import { ECharts } from 'react-native-echarts-wrapper';

const defaultOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [100, 100, 100, 100, 100, 100, 100],
      type: 'line'
    },
    {
      data: [200, 200, 200, 200, 200, 200, 200],
      type: 'line'
    },
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

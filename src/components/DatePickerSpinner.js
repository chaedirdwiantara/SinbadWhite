import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import moment from 'moment';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { Button } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Fonts from '../utils/Fonts';
import ButtonSingle from './button/ButtonSingle';

const { height } = Dimensions.get('window');

const monthsData = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];
const yearsData = [
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028'
];

class DatePickerSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDaysIndex: 0,
      selectedMonthsIndex: 0,
      selectedYearsIndex: 0,
      dayData: []
    };
  }

  componentDidMount() {
    this.modifyDefaultDays();
    this.modifyDateBySelectedDate();
  }

  onItemSelectedDays = selectedDaysIndex => {
    this.setState({ selectedDaysIndex });
  };

  onItemSelectedMonths = selectedMonthsIndex => {
    const dayData = [];
    const totalDays = moment(
      `${yearsData[this.state.selectedYearsIndex]}-${
        monthsData[selectedMonthsIndex]
      }`,
      'YYYY-MMM'
    ).daysInMonth();
    for (let i = 0; i < totalDays; i++) {
      dayData.push(i < 9 ? `0${(i + 1).toString()}` : (i + 1).toString());
    }
    this.setState({ dayData, selectedMonthsIndex });
  };

  onItemSelectedYears = selectedYearsIndex => {
    const dayData = [];
    const totalDays = moment(
      `${yearsData[selectedYearsIndex]}-${
        monthsData[this.state.selectedMonthsIndex]
      }`,
      'YYYY-MMM'
    ).daysInMonth();
    for (let i = 0; i < totalDays; i++) {
      dayData.push(i < 9 ? `0${(i + 1).toString()}` : (i + 1).toString());
    }
    this.setState({ dayData, selectedYearsIndex });
  };

  joinSelectedItem() {
    const joinDate = `${yearsData[this.state.selectedYearsIndex]}-${
      this.state.selectedMonthsIndex < 9
        ? `0${(this.state.selectedMonthsIndex + 1).toString()}`
        : (this.state.selectedMonthsIndex + 1).toString()
    }-${
      this.state.selectedDaysIndex < 9
        ? `0${(this.state.selectedDaysIndex + 1).toString()}`
        : (this.state.selectedDaysIndex + 1).toString()
    }`;
    this.props.parentFunction({ type: 'datePicker', data: joinDate });
  }

  /**
   * ====================================
   * FUNCTION COMPONENT DID MOUNT START
   * ====================================
   */
  /** ==== if date already selected ==== */
  modifyDateBySelectedDate() {
    if (this.props.date === '') {
      const year = moment(new Date()).year();
      const month = moment(new Date()).month();
      const day = moment(new Date()).date();
      this.setState({
        selectedDaysIndex: day - 1,
        selectedMonthsIndex: month,
        selectedYearsIndex: yearsData.indexOf(year.toString())
      });
    } else {
      const year = moment(this.props.date).year();
      const month = moment(this.props.date).month();
      const day = moment(this.props.date).date();
      this.setState({
        selectedDaysIndex: day - 1,
        selectedMonthsIndex: month,
        selectedYearsIndex: yearsData.indexOf(year.toString())
      });
    }
  }
  /** ===== modify default day ========== */
  modifyDefaultDays() {
    const dayData = [];
    for (let i = 0; i < 31; i++) {
      dayData.push(i < 9 ? `0${(i + 1).toString()}` : (i + 1).toString());
    }
    this.setState({ dayData });
  }
  /**
   * ====================================
   * FUNCTION COMPONENT DID MOUNT END
   * ====================================
   */

  renderContentDays() {
    return (
      <View style={[styles.boxContentItem, { width: '20%' }]}>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.titleContentItem}>Tanggal</Text>
        </View>
        <View>
          <WheelPicker
            selectedItem={this.state.selectedDaysIndex}
            data={this.state.dayData}
            onItemSelected={this.onItemSelectedDays}
          />
        </View>
      </View>
    );
  }

  renderContentMonths() {
    return (
      <View style={[styles.boxContentItem, { flex: 1, zIndex: 1000 }]}>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.titleContentItem}>Bulan</Text>
        </View>
        <View>
          <WheelPicker
            selectedItem={this.state.selectedMonthsIndex}
            data={monthsData}
            onItemSelected={this.onItemSelectedMonths}
          />
        </View>
      </View>
    );
  }

  renderContentYears() {
    return (
      <View style={[styles.boxContentItem, { width: '20%' }]}>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.titleContentItem}>Tahun</Text>
        </View>
        <View>
          <WheelPicker
            selectedItem={this.state.selectedYearsIndex}
            data={yearsData}
            onItemSelected={this.onItemSelectedYears}
          />
        </View>
      </View>
    );
  }

  renderContent() {
    return (
      <View style={styles.boxContent}>
        {this.renderContentDays()}
        {this.renderContentMonths()}
        {this.renderContentYears()}
      </View>
    );
  }

  renderButton() {
    return (
      <ButtonSingle
        disabled={false}
        title={'Pilih Tanggal'}
        borderRadius={4}
        onPress={() => this.joinSelectedItem()}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
        <View>{this.renderButton()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  boxContent: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  boxContentItem: {
    alignItems: 'center'
  },
  modalPosition: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  closeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    width: '15%',
    height: '100%'
  },
  icons: {
    width: 24,
    height: 24
  },
  /** text */
  titleModalBottom: {
    marginTop: 0.03 * height,
    marginBottom: 0.03 * height,
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.8),
    color: '#333333'
  },
  titleContentItem: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.6),
    color: '#4f4f4f'
  },
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff'
  },
  titleButton: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 12,
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#f0444c',
    borderRadius: 10,
    width: 278,
    height: 42
  }
});

export default DatePickerSpinner;

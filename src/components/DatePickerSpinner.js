import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../library/reactPackage';
import { moment, WheelPicker } from '../library/thirdPartyPackage';
import { ButtonSingle } from '../library/component';
import { Fonts } from '../helpers';

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

const monthsDataEng = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
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

  /** MONTH TO INDEX */
  monthToIndex(index) {
    if (index < 9) {
      return `${'0' + (index + 1).toString()}`;
    }
    return (index + 1).toString();
  }

  onItemSelectedMonths = selectedMonthsIndex => {
    const dayData = [];
    const totalDays = moment(
      `${yearsData[this.state.selectedYearsIndex]}-${this.monthToIndex(
        this.state.selectedMonthsIndex
      )}`,
      'YYYY-MM'
    )
      .locale('en')
      .daysInMonth();
    for (let i = 0; i < totalDays; i++) {
      dayData.push(i < 9 ? `0${(i + 1).toString()}` : (i + 1).toString());
    }
    this.setState({ dayData, selectedMonthsIndex });
  };

  onItemSelectedYears = selectedYearsIndex => {
    const dayData = [];
    const totalDays = moment(
      `${yearsData[this.state.selectedYearsIndex]}-${this.monthToIndex(
        this.state.selectedMonthsIndex
      )}`,
      'YYYY-MM'
    )
      .locale('en')
      .daysInMonth();
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
          <Text style={Fonts.type16}>Tanggal</Text>
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
          <Text style={Fonts.type16}>Bulan</Text>
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
          <Text style={Fonts.type16}>Tahun</Text>
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
  }
});

export default DatePickerSpinner;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 24062020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */

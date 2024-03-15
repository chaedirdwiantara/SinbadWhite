import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../library/reactPackage';
import { WheelPicker } from '../library/thirdPartyPackage';
import { ButtonSingle } from '../library/component';
import { Fonts } from '../helpers';

const monthData = [
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

const currentDate = new Date();

class DatePickerSpinnerWithMinMaxDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDaysIndex: this.props.dateSelected,
      selectedMonthsIndex: this.props.monthSelected,
      selectedYearsIndex: this.props.yearSelected,
      dayData: [],
      monthsData: [],
      yearsData: [],
      minDate:
        this.props.minDate !== undefined
          ? this.props.minDate
          : new Date(currentDate.getFullYear() - 2, 1, 1),
      maxDate:
        this.props.maxDate !== undefined
          ? this.props.maxDate
          : new Date(
              currentDate.getFullYear() + 2,
              currentDate.getMonth(),
              currentDate.getDate()
            )
    };
  }

  componentDidMount() {
    this.modifyYearData();
    this.modifyMonthData();
    this.modifyDayData();
  }

  onItemSelectedDays = selectedDaysIndex => {
    this.setState({
      selectedDaysIndex
    });
  };

  onItemSelectedMonths = selectedMonthsIndex => {
    const {
      selectedYearsIndex,
      monthsData,
      selectedDaysIndex,
      yearsData,
      dayData
    } = this.state;
    const selectedMonth = monthData.indexOf(monthsData[selectedMonthsIndex]);
    const lastDayPick = new Date(
      yearsData[selectedYearsIndex],
      selectedMonth + 1,
      0
    );

    if (parseInt(dayData[selectedDaysIndex]) > lastDayPick.getDate()) {
      const indexSelected = dayData.indexOf(lastDayPick.getDate().toString());
      this.setState({
        selectedDaysIndex: indexSelected
      });
    }
    this.setState({
      selectedMonthsIndex
    });

    this.modifyDayData(this.getSelectedDate());
  };

  onItemSelectedYears = selectedYearsIndex => {
    this.setState({
      selectedYearsIndex
    });
    this.modifyDayData(this.getSelectedDate());
    this.modifyMonthData(this.getSelectedDate());
  };

  joinSelectedItem() {
    const {
      selectedYearsIndex,
      selectedMonthsIndex,
      selectedDaysIndex,
      monthsData,
      yearsData,
      dayData
    } = this.state;

    const indexMonthSelected = monthData.indexOf(
      monthsData[selectedMonthsIndex]
    );
    const selectedDate = new Date(
      yearsData[selectedYearsIndex],
      indexMonthSelected,
      dayData[selectedDaysIndex]
    );
    this.props.onSelect(selectedDate);
    if (this.props.close) {
      this.props.close();
    }
  }

  getSelectedDate() {
    const {
      selectedYearsIndex,
      selectedMonthsIndex,
      selectedDaysIndex,
      monthsData,
      yearsData
    } = this.state;

    const indexMonthSelected = monthData.indexOf(
      monthsData[selectedMonthsIndex]
    );
    const selectedDate = new Date(
      yearsData[selectedYearsIndex],
      indexMonthSelected,
      selectedDaysIndex + 1
    );

    return selectedDate;
  }

  /**
   * ====================================
   * FUNCTION COMPONENT DID MOUNT START
   * ====================================
   */

  /** ==== if date already selected ==== */
  // modifyDateBySelectedDate() {
  //
  // }

  /** ===== modify default data ========== */
  modifyDayData(date = null) {
    if (date === null) {
      this.setState({
        selectedDaysIndex: currentDate.getDate() - 1,
        isDoneInitData: true
      });
    }
    if (!date) {
      date = currentDate;
    }

    const { minDate, maxDate } = this.state;
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let dayData = [];
    if (
      minDate.getMonth() === date.getMonth() &&
      minDate.getFullYear() === date.getFullYear()
    ) {
      firstDay = minDate;
    }

    if (
      maxDate.getMonth() === lastDay.getMonth() &&
      maxDate.getFullYear() === lastDay.getFullYear()
    ) {
      lastDay = new Date(
        new Date(
          maxDate.getFullYear(),
          maxDate.getMonth() - 1,
          maxDate.getDate()
        )
      );
    }
    let i;

    if (
      currentDate.getDate() <= maxDate.getDate() &&
      currentDate.getMonth() <= maxDate.getMonth() &&
      currentDate.getFullYear() >= maxDate.getFullYear()
    ) {
      if (
        date.getMonth() === maxDate.getMonth() &&
        currentDate.getFullYear() <= maxDate.getFullYear()
      ) {
        // eslint-disable-next-line for-direction
        for (i = parseInt(maxDate.getDate()) - 1; i >= 0; i--) {
          dayData.push(i < 9 ? `0${(i + 1).toString()}` : (i + 1).toString());
        }
      } else {
        for (i = parseInt(lastDay.getDate()) - 1; i >= 0; i--) {
          dayData.push(i < 9 ? `0${(i + 1).toString()}` : (i + 1).toString());
        }
      }
      dayData.reverse();
    } else {
      for (
        i = parseInt(firstDay.getDate()) - 1;
        i < parseInt(lastDay.getDate());
        i++
      ) {
        dayData.push(i < 9 ? `0${(i + 1).toString()}` : (i + 1).toString());
      }
    }
    this.setState({ dayData });
  }

  modifyMonthData(date = null) {
    if (date == null) {
      date = currentDate;
    }
    let firstMonth = this.state.minDate.getMonth() + 1;
    let lastMonth = this.state.maxDate.getMonth() + 1;
    const monthsData = [];

    if (this.state.minDate.getFullYear() !== date.getFullYear()) {
      firstMonth = 1;
    }

    if (this.state.maxDate.getFullYear() !== date.getFullYear()) {
      lastMonth = 12;
    }

    for (
      let i = firstMonth < 1 ? firstMonth : firstMonth - 1;
      i < lastMonth;
      i++
    ) {
      monthsData.push(monthData[i]);
    }

    const indexMonth = monthsData.indexOf(monthData[currentDate.getMonth()]);
    this.setState({
      selectedMonthsIndex: indexMonth
    });

    this.setState({ monthsData });
  }

  modifyYearData(date = null) {
    const yearsData = [];
    let i = this.state.minDate.getFullYear();
    while (i <= this.state.maxDate.getFullYear()) {
      yearsData.push(i.toString());
      i++;
    }

    if (date === null) {
      const indexYear = yearsData.indexOf(currentDate.getFullYear().toString());
      this.setState({
        selectedYearsIndex: indexYear
      });
    }
    this.setState({ yearsData });
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
          <Text style={Fonts.type16}>Tanggal </Text>
        </View>
        <View>
          <WheelPicker
            selectedItem={this.state.selectedDaysIndex}
            initPosition={this.state.selectedDaysIndex}
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
            initPosition={this.state.selectedMonthsIndex}
            data={this.state.monthsData}
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
            initPosition={this.state.selectedYearsIndex}
            selectedItem={this.state.selectedYearsIndex}
            data={this.state.yearsData}
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
        loading={this.props.loading}
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

export default DatePickerSpinnerWithMinMaxDate;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Farhan
 * createdDate: 21102020
 * updatedBy:
 * updatedDate:
 *
 *
 *
 */

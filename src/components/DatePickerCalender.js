import { React, Text } from '../library/reactPackage';
import { Calendar } from '../library/thirdPartyPackage';
import masterColor from '../config/masterColor.json';
import { monthsDataID } from '../helpers';

/**
 * DatePickerCalender
 * @property {string} currentDate - YYYY-MM-DD
 * @property {string} minDate - YYYY-MM-DD
 * @property {string} maxDate - YYYY-MM-DD
 * @property {string} selectedDate - YYYY-MM-DD
 * @property {function} onDayPress - return ```{
    year: number;
    month: number;
    day: number;
    timestamp: number;
    dateString: string;
}```
 * @returns
 */
const DatePickerCalender = ({
  currentDate,
  minDate,
  maxDate,
  selectedDate,
  onDayPress
}) => {
  return (
    <Calendar
      current={currentDate}
      minDate={minDate}
      maxDate={maxDate}
      monthFormat={'MMMM yyyy'}
      firstDay={1}
      onDayPress={day => {
        onDayPress(day);
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: '#F0444C',
          disableTouchEvent: true
        }
      }}
      disableAllTouchEventsForDisabledDays={true}
      renderHeader={date => {
        return (
          <Text>
            {monthsDataID[date.getMonth()]} {date.getFullYear()}
          </Text>
        );
      }}
      theme={{
        selectedDayBackgroundColor: masterColor.fontRed50,
        selectedDayTextColor: masterColor.fontWhite,
        todayTextColor: masterColor.fontRed50,
        arrowColor: masterColor.fontBlack100
      }}
    />
  );
};

export default DatePickerCalender;

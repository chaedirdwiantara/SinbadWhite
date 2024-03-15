/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity
} from '../../../library/reactPackage';
import { MaterialIcon, moment } from '../../../library/thirdPartyPackage';
import {
  ButtonSingle,
  ModalBottomType4,
  DatePickerCalender
} from '../../../library/component';
import { Fonts, GlobalStyle } from '../../../helpers';
import masterColor from '../../../config/masterColor.json';
import { toLocalTime } from '../../../helpers/TimeHelper';
import NavigationService from '../../../navigation/NavigationService';

const MerchantPromisePayView = props => {
  const {
    selectedReason,
    promisePayList,
    onSavePromisePayDate
  } = props.navigation.state.params;

  const tomorrow = moment(tomorrow)
    .add(1, 'days')
    .locale('id')
    .format('YYYY-MM-DD');
  const maxDatePromisePay = moment(tomorrow)
    .add(6, 'days')
    .locale('id')
    .format('YYYY-MM-DD');

  // STATE
  const [selectedDate, setSelectedDate] = useState(null);
  const [promiseDateCount, setPromiseDateCount] = useState(3);
  const [promisePayDate, setPromisePayDate] = useState(null);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isModalPromisePayDateOpen, setIsModalPromisePayDateOpen] = useState(
    false
  );
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);

  /**
   * *********************************
   * FUNCTION
   * *********************************
   */
  const formatDate = date => (date ? toLocalTime(date, 'DD/MM/YYYY') : '-');
  const openModalPromisePayDate = () => {
    setIsModalPromisePayDateOpen(true);
  };
  const onSubmit = () => {
    setIsSaveButtonLoading(true);
    setIsSaveButtonDisabled(true);
    onSavePromisePayDate({
      ...selectedReason,
      promisePayDate
    });
    NavigationService.goBack();
  };

  /**
   * *********************************
   * HOOKS
   * *********************************
   */
  useEffect(() => {
    setPromiseDateCount(promisePayList ? promisePayList.length + 1 : 1);
  }, []);

  /** CHECK INPUT */
  useEffect(() => {
    if (promisePayDate) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }
  }, [promisePayDate]);

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  const renderInfoBox = () => {
    return (
      <View style={styles.infoBox}>
        <MaterialIcon
          name="info"
          color={masterColor.fontBlue40}
          size={18}
          style={{ paddingRight: 12 }}
        />
        <Text style={[Fonts.type108, { paddingRight: 16 }]}>
          Janji bayar bisa dilakukan 3 kali per faktur dengan tenggat maksimal 7
          hari per perjanjian.
        </Text>
      </View>
    );
  };

  /** RENDER PROMISE PAY LIST */
  const renderPromisePayList = () => {
    return (
      <View>
        {promisePayList &&
          promisePayList.map((obj, i) => {
            return (
              <View key={i}>
                <View
                  style={{
                    marginVertical: 24
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text style={Fonts.type10}>Janji Bayar {obj.count}</Text>
                    <View
                      style={{
                        marginTop: 11,
                        borderRadius: 4,
                        backgroundColor: masterColor.fontRed10OP10
                      }}
                    >
                      <Text
                        style={[
                          Fonts.type14,
                          { paddingHorizontal: 8, paddingVertical: 4 }
                        ]}
                      >
                        Belum diayar
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: -4
                    }}
                  >
                    <MaterialIcon
                      name="event"
                      color={masterColor.placeholder}
                      size={16}
                    />
                    <Text
                      style={[
                        Fonts.type17,
                        { marginLeft: 11, color: masterColor.placeholder }
                      ]}
                    >
                      {formatDate(obj.date)}
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyle.lines} />
              </View>
            );
          })}
      </View>
    );
  };

  /** RENDER TRANSFER DATE */
  const renderInputPromisePayDate = () => {
    const color = promisePayDate
      ? masterColor.fontBlack100
      : masterColor.fontBlack20;
    return (
      <View style={{ marginTop: 24 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: masterColor.fontRed50 }}>* </Text>
          <Text style={[Fonts.type10]}>
            Tanggal Janji Bayar {promiseDateCount}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.modalBox}
          onPress={() => openModalPromisePayDate()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcon
              name="event"
              color={masterColor.fontBlack100}
              size={16}
            />

            <Text style={[Fonts.type17, { marginLeft: 11, color }]}>
              {promisePayDate ? formatDate(promisePayDate) : 'dd/mm/yyyy'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyle.lines]} />
      </View>
    );
  };

  /** RENDER SAVE BUTTON */
  const renderSaveButton = () => {
    return (
      <>
        <View style={[GlobalStyle.lines]} />
        <ButtonSingle
          loading={isSaveButtonLoading}
          disabled={isSaveButtonDisabled}
          title={'Simpan Alasan'}
          borderRadius={4}
          onPress={() => onSubmit()}
        />
      </>
    );
  };

  const renderPromiseDateCalender = () => {
    return (
      <DatePickerCalender
        current={tomorrow}
        minDate={tomorrow}
        maxDate={maxDatePromisePay}
        selectedDate={selectedDate}
        onDayPress={day => {
          setSelectedDate(day.dateString);
          setPromisePayDate(day.dateString);
          setIsModalPromisePayDateOpen(false);
        }}
      />
    );
  };

  const renderModalPromisePayDate = () => {
    return (
      <ModalBottomType4
        typeClose={'cancel'}
        open={isModalPromisePayDateOpen}
        title={'Pilih Tanggal Janji Bayar ' + promiseDateCount}
        close={() => setIsModalPromisePayDateOpen(false)}
        content={renderPromiseDateCalender()}
      />
    );
  };

  /** RENDER CONTENT */
  const renderContent = () => {
    return (
      <>
        {renderInfoBox()}
        {renderPromisePayList()}
        {renderInputPromisePayDate()}
      </>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.contentContainer}>{renderContent()}</View>
        {renderSaveButton()}
      </SafeAreaView>
      {renderModalPromisePayDate()}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16
  },
  infoBox: {
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: masterColor.fontBlue100OP10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16
  },
  modalBox: {
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default MerchantPromisePayView;

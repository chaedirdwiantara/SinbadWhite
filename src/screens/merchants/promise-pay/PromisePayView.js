/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
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
  ModalBottomErrorRespons,
  ModalBottomType4,
  DatePickerCalender
} from '../../../library/component';
import { Fonts, GlobalStyle } from '../../../helpers';
import masterColor from '../../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { toLocalTime } from '../../../helpers/TimeHelper';

const PromisePayView = props => {
  const dispatch = useDispatch();
  const promisePayList = props.navigation.state.params.promisePayList;
  const maxDatePromisePay = moment()
    .add(7, 'days')
    .locale('id')
    .format('YYYY-MM-DD');
  const currentDate = moment()
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
  const [modalBottomError, setModalBottomError] = useState(false);

  // SELECTOR
  const {
    loadingMerchantPromisePay,
    dataMerchantPromisePay,
    errorMerchantPromisePay
  } = useSelector(state => state.merchant);

  // USEREF ERROR
  const prevErrorMerchantPromisePayRef = useRef(errorMerchantPromisePay);

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
    setIsSaveButtonDisabled(true);
    alert('ON SUBMIT: ' + promisePayDate);
    // const data = {};
    // dispatch(merchantPostPromisePayProcess(data));
  };

  /**
   * *********************************
   * HOOKS
   * *********************************
   */
  useEffect(() => {
    setPromiseDateCount(promisePayList.length + 1);
  }, []);

  /** CHECK INPUT */
  useEffect(() => {
    if (promisePayDate) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(false);
    }
  }, [promisePayDate]);

  /** USE EFFECT PREV DATA ERROR  */
  useEffect(() => {
    prevErrorMerchantPromisePayRef.current = errorMerchantPromisePay;
  }, []);
  const prevErrorMerchantPromisePay = prevErrorMerchantPromisePayRef.current;

  /** USE EFFECT HANDLE MODAL ERROR POST PROMISE PAY */
  useEffect(() => {
    if (prevErrorMerchantPromisePay !== errorMerchantPromisePay) {
      if (errorMerchantPromisePay) {
        setModalBottomError(true);
      }
    }
  }, [errorMerchantPromisePay]);

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
        <Text style={[Fonts.type108]}>
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
          <Text style={{ color: masterColor.fontRed }}>* </Text>
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
          loading={loadingMerchantPromisePay}
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
        current={currentDate}
        minDate={currentDate}
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

  /** RENDER MODAL ERROR */
  const renderModalError = () => {
    return (
      <View>
        {modalBottomError ? (
          <ModalBottomErrorRespons
            statusBarType={'transparent'}
            open={modalBottomError}
            onPress={() => setModalBottomError(false)}
          />
        ) : (
          <View />
        )}
      </View>
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
      {renderModalError()}
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

export default PromisePayView;

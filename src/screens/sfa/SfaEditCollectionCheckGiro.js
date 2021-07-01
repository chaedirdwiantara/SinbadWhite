import {
  React,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from '../../library/reactPackage';
import { useState, useEffect } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import {
  InputType5,
  DatePickerSpinnerWithMinMaxDate,
  ModalBottomType4
} from '../../library/component';
import masterColor from '../../config/masterColor.json';
import ModalBankAccount from './ModalBankAccount';
import ModalListMaterai from './ModalListMaterai';
import {
  MaterialIcon,
  MaterialCommunityIcons,
  moment
} from '../../library/thirdPartyPackage';
import { useSelector } from 'react-redux';
const SfaEditCollectionCheckGiro = props => {
  //DATA PAYMENT CASH
  const paymentCollectionMethod =
    props.data.paymentCollection.paymentCollectionMethod;
  const paymentCollectionTypeId =
    paymentCollectionMethod.paymentCollectionType.id;
  const paymentCollection = props.data.paymentCollection

  const [paidAmount, setPaidAmount] = useState(
    props.data.paymentCollection.paidByCollectionMethod
  );
  const [reference, setReference] = useState(paymentCollectionMethod.reference);
  const [balanceValue, setBalanceValue] = useState(
    paymentCollectionMethod.amount
  );
  const [openModalDueDate, setOpenModalDueDate] = useState(false);
  const [openModalPublishDate, setOpenModalPublishDate] = useState(false);
  const [issuedDate, setIssuedDate] = useState(paymentCollectionMethod.date);
  const [invalidDate, setInvalidDate] = useState(
    paymentCollectionMethod.dueDate
  );
  const [isDisable, setIsDisable] = useState(!props.isPrimary);
  const [openModalBank, setOpenModalBank] = useState(false);
  const [dataBank, setDataBank] = useState(paymentCollectionMethod.bankFrom);
  const [dataStamp, setDataStamp] = useState(paymentCollectionMethod.stamp);
  const { selectedMerchant } = useSelector(state => state.merchant);
  const [checkMaterai, setCheckMaterai] = useState(
    paymentCollectionMethod.stamp ? true : false
  );
  const [openModalListMaterai, setOpenModalListMaterai] = useState(false);
  const [outstanding, setOutstanding] = useState(props.data.outstanding + props.data.paymentCollection.paidByCollectionMethod)
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
//function to make sure collection !> balance || colection !>outstanding
useEffect(() => {
  if (parseInt(paidAmount) > parseInt(outstanding)) {
    if (outstanding< balanceValue) {
      setPaidAmount(parseInt(outstanding));
      props.onChangePaidAmount(parseInt(outstanding));
    } else {
      setPaidAmount(parseInt(balanceValue));
      props.onChangePaidAmount(parseInt(balanceValue));
    }
  } else if (parseInt(paidAmount) > parseInt(balanceValue)) {
    if (outstanding< balanceValue) {
      setPaidAmount(parseInt(outstanding))
      props.onChangePaidAmount(parseInt(outstanding));
    } else {
      setPaidAmount(parseInt(balanceValue));
      props.onChangePaidAmount(parseInt(balanceValue));
    }
  } else {
    setPaidAmount(parseInt(paidAmount));
    props.onChangePaidAmount(parseInt(paidAmount));
  }
}, [paidAmount, balanceValue]);

useEffect(()=> {
if (checkMaterai === false){
  setDataStamp()
  props.onChangeDataStamp()
}
}, [checkMaterai])

  const textBillingCash = text => {
    if (
      parseInt(text.replace(/[Rp.]+/g, '')) > parseInt(outstanding)
    ) {
      if (props.data.outstanding + paidAmount < balanceValue) {
        setPaidAmount(parseInt(outstanding ));
        props.onChangePaidAmount(parseInt(outstanding));
      } else {
        setPaidAmount(parseInt(balanceValue));
        props.onChangePaidAmount(parseInt(balanceValue));
      }
    } else if (parseInt(text.replace(/[Rp.]+/g, '')) > parseInt(balanceValue)) {
      if (props.remainingBilling < balanceValue) {
        setPaidAmount(parseInt(outstanding));
        props.onChangePaidAmount(parseInt(outstanding));
      } else {
        setPaidAmount(parseInt(balanceValue));
        props.onChangePaidAmount(parseInt(balanceValue));
      }
    }
    else {
      setPaidAmount(parseInt(text.replace(/[Rp.]+/g, '')));
      props.onChangePaidAmount(parseInt(text.replace(/[Rp.]+/g, '')));
    }
  };

  const dataBalance = text => {
    const balanceInt = parseInt(text.replace(/[Rp.]+/g, ''));
    setBalanceValue(balanceInt);
    props.onChangeBalanceValue(balanceInt);
    props.isChanged(true);
  };
  const dataDueDate = date => {
    setInvalidDate(date);
    props.onChangeDueDate(date);
    props.isChanged(true);
  };
  const dataIssuedDate = date => {
    setIssuedDate(date);
    props.onChangeIssuedDate(date);
    props.isChanged(true);
  };
  const openDueDate = () => {
    setOpenModalDueDate(true);
  };
  const openPublishDate = () => {
    setOpenModalPublishDate(true);
  };

  const selectedBank = data => {
    setDataBank(data);
    setOpenModalBank(false);
    props.onChangeDataBank(data);
    props.isChanged(true);
  };

  const functionMaterai = () => {
    setCheckMaterai(!checkMaterai);
    if (checkMaterai === false) {
      setDataStamp();
      props.onChangeDataStamp();
      props.isChanged(true);
    }
  };

  const selectedStamp = data => {
    setDataStamp(data);
    props.onChangeDataStamp(data);
    props.isChanged(true);
    setOpenModalListMaterai(false);
  };

  const dataReference = data => {
    setReference(data);
    props.onChangeReference(data);
    props.isChanged(true);
  };
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  /** MODAL STAMP */
  const renderModalListMaterai = () => {
    return (
      <View>
        {openModalListMaterai ? (
          <ModalListMaterai
            open={openModalListMaterai}
            close={() => setOpenModalListMaterai(false)}
            onRef={ref => (selectCollection = ref)}
            selectStamp={selectedStamp.bind(this)}
            supplierId={selectedMerchant.supplierId}
            storeId={selectedMerchant.storeId}
            paymentCollectionTypeId={paymentCollectionTypeId}
          />
        ) : null}
      </View>
    );
  };
  /** MODAL BANK ACCOUNT */
  const renderModalBank = () => {
    return (
      <View>
        {openModalBank ? (
          <ModalBankAccount
            open={openModalBank}
            close={() => setOpenModalBank(false)}
            onRef={ref => (selectCollection = ref)}
            selectCollection={selectedBank.bind(this)}
            supplierId={selectedMerchant.supplierId}
            storeId={selectedMerchant.storeId}
            paymentCollectionTypeId={paymentCollectionTypeId}
          />
        ) : null}
      </View>
    );
  };

  const renderDueDate = () => {
    const minDate = new Date(new Date().setDate(new Date().getDate() + 1));
    const today = new Date();
    return (
      <ModalBottomType4
        typeClose={'Tutup'}
        open={openModalDueDate}
        title={'Tanggal Jatuh Tempo'}
        close={() => setOpenModalDueDate(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
              onSelect={date => dataDueDate(date)}
              close={() => setOpenModalDueDate(false)}
              minDate={minDate}
              dateSelected={today.getDate() + 1}
              monthSelected={today.getMonth() + 1}
              yearSelected={today.getFullYear()}
            />
          </View>
        }
      />
    );
  };
  const renderPublishDate = () => {
    return (
      <ModalBottomType4
        typeClose={'Tutup'}
        open={openModalPublishDate}
        title={'Tanggal Terbit'}
        close={() => setOpenModalPublishDate(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
              onSelect={date => dataIssuedDate(date)}
              close={() => setOpenModalPublishDate(false)}
              maxDate={new Date()}
            />
          </View>
        }
      />
    );
  };

  const renderContent = () => {
    return (
      <>
        <View style={styles.inputBox}>
          <InputType5
            title={`*Nomor Referensi`}
            placeholder={paymentCollectionMethod.reference}
            value={reference}
            editable={props.isPrimary}
            onChangeText={text => dataReference(text)}
            tooltip={true}
            tooltipText={
              'Dapat berupa Nomor Cek, Giro, Transfer atau Kuitansi'
            }
          />
        </View>
        <View style={{ paddingVertical: 16 }}>
          <Text style={Fonts.type10}>{'*Sumber Bank'}</Text>
          <View>
            <TouchableOpacity
              style={styles.boxMenu}
              onPress={() => setOpenModalBank(true)}
              disabled={!props.isPrimary}
            >
              <Text
                style={[
                  Fonts.type17,
                  {
                    opacity: props.isPrimary ? null : 0.5
                  }
                ]}
              >
                {dataBank.displayName ? dataBank.displayName : dataBank.name}
              </Text>
              <View style={{ position: 'absolute', right: 16 }}>
                <MaterialIcon
                  name="chevron-right"
                  color={masterColor.fontBlack40}
                  size={24}
                />
              </View>
            </TouchableOpacity>
            <View style={[GlobalStyle.lines]} />
          </View>
        </View>
        <View style={{ paddingVertical: 16 }}>
          <Text style={Fonts.type10}>{'*Tanggal Terbit'}</Text>
          <TouchableOpacity
            style={styles.boxMenu}
            onPress={() => openPublishDate()}
            disabled={isDisable}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcon
                name="date-range"
                color={masterColor.mainColor}
                size={16}
              />

              <Text
                style={[
                  Fonts.type17,
                  {
                    opacity: props.isPrimary ? null : 0.5,
                    marginLeft: 11
                  }
                ]}
              >
                {moment(issuedDate).format('DD/MM/YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines]} />
        </View>
        <View style={{ paddingTop: 16 }}>
          <Text style={Fonts.type10}>{'*Tanggal Jatuh Tempo'}</Text>
          <TouchableOpacity
            style={styles.boxMenu}
            onPress={() => openDueDate()}
            disabled={isDisable}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcon
                name="date-range"
                color={masterColor.mainColor}
                size={16}
              />

              <Text
                style={[
                  Fonts.type17,
                  {
                    opacity: props.isPrimary ? null : 0.5,
                    marginLeft: 11
                  }
                ]}
              >
                {moment(invalidDate).format('DD/MM/YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines]} />
        </View>
        <View style={{ paddingTop: 16 }}>
          <Text style={Fonts.type10}>
            {`*Nilai ${paymentCollectionMethod.paymentCollectionType.name}`}
          </Text>
          <View
            style={[
              styles.boxInput,
              { flexDirection: 'row', alignItems: 'center' }
            ]}
          >
            <TextInputMask
              type={'money'}
              options={{
                precision: 0,
                separator: ',',
                delimiter: '.',
                unit: 'Rp ',
                suffixUnit: ''
              }}
              value={balanceValue}
              onChangeText={text => dataBalance(text)}
              style={[
                Fonts.type17,
                {
                  opacity: isDisable ? 0.5 : null,
                  width: '95%',
                  borderBottomColor: masterColor.fontBlack50
                }
              ]}
              editable={!isDisable}
            />
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <View>
            <Text style={Fonts.type10}>*Jumlah Penagihan</Text>
          </View>
          <View
            style={[
              styles.boxInput,
              { flexDirection: 'row', alignItems: 'center' }
            ]}
          >
            <TextInputMask
              type={'money'}
              options={{
                precision: 0,
                separator: ',',
                delimiter: '.',
                unit: 'Rp ',
                suffixUnit: ''
              }}
              value={paidAmount}
              onChangeText={text => textBillingCash(text)}
              style={[
                Fonts.type17,
                {
                  width: '95%',
                  borderBottomColor: masterColor.fontBlack10
                }
              ]}
            />
          </View>
        </View>
        {
          props.isPrimary ? (
            <View style={{ marginTop: 16 }}>
              <Text style={[Fonts.type10]}>Nilai Materai</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16
                }}
              >
                <TouchableOpacity
                  onPress={() => functionMaterai()}
                  style={{ flex: 1 }}
                >
                  {checkMaterai ? (
                    <MaterialCommunityIcons
                      color={masterColor.mainColor}
                      name="checkbox-marked"
                      size={24}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      color={masterColor.fontBlack40}
                      name="checkbox-blank-outline"
                      size={24}
                    />
                  )}
                </TouchableOpacity>
                <View style={{ flex: 8 }}>
                  <TouchableOpacity
                    onPress={() => setOpenModalListMaterai(true)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    disabled={!checkMaterai}
                  >
                    <Text style={[Fonts.type17]}>
                      {!checkMaterai
                        ? 'Pilih Nilai Materai'
                        : dataStamp
                        ? dataStamp.name
                        : 'Pilih Nilai Materai'}
                    </Text>
                    <View>
                      <MaterialIcon
                        name="chevron-right"
                        color={masterColor.fontBlack40}
                        size={24}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={[GlobalStyle.lines, { marginTop: 8 }]} />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.inputBox}>
              <InputType5
                title={`Nilai Materai`}
                placeholder={dataStamp.name}
                editable={false}
              />
            </View>
          )}
      </>
    );
  };
  return (
    <>
      {renderContent()}
      {renderDueDate()}
      {renderPublishDate()}
      {renderModalBank()}
      {renderModalListMaterai()}
    </>
  );
};

const styles = StyleSheet.create({
  boxInput: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderBottomColor: masterColor.fontBlack10
  },
  boxMenu: {
    // paddingHorizontal: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputBox: { marginTop: 16, marginLeft: -16 }
});
export default SfaEditCollectionCheckGiro;

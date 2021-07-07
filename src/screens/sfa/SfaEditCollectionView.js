import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from '../../library/reactPackage';
import {
  InputType5,
  ButtonSingle,
  ModalConfirmation,
  LoadingPage
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  TRANSFER,
  TUNAI,
  PROMO,
  CEK,
  GIRO
} from '../../constants/collectionConstants';
import SfaEditCollectionCash from './SfaEditCollectionCash';
import SfaEditCollectionTransfer from './SfaEditCollectionTransfer';
import SfaEditCollectionPromo from './SfaEditCollectionPromo';
import SfaEditCollectionCheckGiro from './SfaEditCollectionCheckGiro';
import {
  sfaEditCollectionProcess,
  sfaGetCollectionDetailProcess
} from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import ModalBottomFailPayment from '../../components/error/ModalBottomFailPayment';
import {
  MaterialIcon
} from '../../library/thirdPartyPackage';
const SfaEditCollectionView = props => {
  const {
    dataSfaGetDetail,
    dataSfaGetCollectionDetail,
    loadingSfaEditCollection,
    loadingSfaGetCollectionDetail,
    dataSfaEditCollection,
    errorSfaEditCollection
  } = useSelector(state => state.sfa);
  const [isPrimary, setIsPrimary] = useState(
    dataSfaGetCollectionDetail
      ? dataSfaGetCollectionDetail.paymentCollection.isPrimary
      : false
  );
  const { id } = useSelector(state => state.user);
  const detailSfa = props.navigation.state.params.dataDetail;
  const [newDataDetailSfa, setNewDataDetailSfa] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [openModalEditConfirmation, setOpenModalEditConfirmation] = useState(
    false
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [
    openModalErrorEditCollection,
    setOpenModalErrorEditCollection
  ] = useState(false);
  const [openModalBackEdit, setOpenModalBackEdit] = useState(false)

  //DATA PAYMENT TRANSFER & PROMO
  const [referenceCode, setReferenceCode] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.reference
  );
  const [bankSource, setBankSource] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.bankFrom
  );
  const [bankAccount, setBankAccount] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.bankToAccount
  );
  const [transferDate, setTransferDate] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.date
  );
  const [transferValue, setTransferValue] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.amount
  );
  const [billingValue, setBillingValue] = useState(
    detailSfa.paymentCollection.paidByCollectionMethod
  );
  const [transferImage, setTransferImage] = useState(detailSfa.image);
  //DATA PAYMENT PROMO
  const [principal, setPrincipal] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.principal
  );
  const [promoValue, setPromoValue] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.amount
  );
  const [promoImage, setPromoImage] = useState(detailSfa.image);

  //DATA CHECK AND GIRO
  const [issuedDate, setIssuedDate] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.date
  );
  const [invalidDate, setInvalidDate] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.dueDate
  );
  const [dataBank, setDataBank] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.bankFrom
  );
  const [dataStamp, setDataStamp] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.stamp
  );
  const [paidAmount, setPaidAmount] = useState(
    detailSfa.paymentCollection.paidByCollectionMethod
  );
  const [reference, setReference] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.reference
  );
  const [balanceValue, setBalanceValue] = useState(
    detailSfa.paymentCollection.paymentCollectionMethod.amount
  );
  const [isMateraiCheck, setIsMateraiCheck] = useState(detailSfa.paymentCollection.paymentCollectionMethod.stamp ? true : false);

  //Update Data Total Penagihan
  const [totalBilling, setTotalBilling] = useState(
    (detailSfa.paymentCollection.paymentCollectionMethod.stamp ? detailSfa.paymentCollection.paymentCollectionMethod.stamp.nominal : 0) + detailSfa.paymentCollection.paidByCollectionMethod
  )

  //DATA USE REF
  const prevDataSfaEditCollectionRef = useRef(dataSfaEditCollection);
  const prevErrorSfaEditCollectionRef = useRef(errorSfaEditCollection);

  //USEDISPATCH
  const dispatch = useDispatch();
  //USE EFFECT PREV DATA
  useEffect(() => {
    prevDataSfaEditCollectionRef.current = dataSfaEditCollection;
  }, []);
  const prevDataSfaEditCollection = prevDataSfaEditCollectionRef.current;
  useEffect(() => {
    prevErrorSfaEditCollectionRef.current = errorSfaEditCollection;
  }, []);
  const prevErrorSfaEditCollection = prevErrorSfaEditCollectionRef.current;

  useEffect(() => {
    const paymentCollectionId = detailSfa.paymentCollection.id;
    if (prevDataSfaEditCollection !== dataSfaEditCollection) {
      if (dataSfaEditCollection) {
        dispatch(sfaGetCollectionDetailProcess(paymentCollectionId));
        NavigationService.navigate('SfaCollectionDetailView', {
          paymentCollectionId: paymentCollectionId
        });
      }
    }
  }, [dataSfaEditCollection]);

  useEffect(() => {
    if (prevErrorSfaEditCollection !== errorSfaEditCollection) {
      if (errorSfaEditCollection) {
        setOpenModalErrorEditCollection(true);
      }
    }
  }, [errorSfaEditCollection]);

  /* ========================
   * HEADER MODIFY
   * ========================
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={[styles.headerContent]}>
          <View style={[styles.headerBody, { alignItems: 'flex-start' }]}>
            <TouchableOpacity onPress={() => handleBackHeader()}>
              <View>
                <MaterialIcon
                  name="arrow-back"
                  size={24}
                  color={masterColor.fontBlack50}
                  style={{
                    marginBottom: 8,
                    marginLeft: 8,
                    alignContent: 'flex-start'
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: 'center', flex: 1, marginLeft: 25 }}>
            <Text style={Fonts.type5}>Ubah Transaksi</Text>
          </View>

        </View>
        <View style={[GlobalStyle.lines, styles.headerLine]} />
      </View>
    );
  };

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  //handleBack
  const handleBackEdit = () => {
    NavigationService.goBack()
  }

  const handleBackHeader = () => {
    if (isChanged === true) {
      setOpenModalBackEdit(true)
    } else {
      handleBackEdit()
    }
  }

  const saveEditCollection = () => {
    const paymentCollectionType =
      detailSfa.paymentCollection.paymentCollectionMethod.paymentCollectionType;
    const userId = parseInt(id);
    const paymentCollectionId = detailSfa.paymentCollection.id;
    if (paymentCollectionType.name === TRANSFER) {
      const data = {
        userSellerId: userId,
        paymentCollectionId: paymentCollectionId,
        paymentCollectionTypeId: paymentCollectionType.id,
        paymentAmount: billingValue,
        referenceCode: referenceCode,
        bankId: bankSource.id,
        bankToAccountId: bankAccount.id,
        paymentDate: transferDate,
        paymentCollectionMethodAmount: transferValue,
        filename: transferImage ? transferImage.fileName ? transferImage.fileName : null : null,
        type: transferImage ? transferImage.fileType ? transferImage.fileType : null :null,
        image: transferImage ? transferImage.fileData ? transferImage.fileData : null : null
      };
      dispatch(sfaEditCollectionProcess(data));
    } else if (paymentCollectionType.name === PROMO) {
      const data = {
        userSellerId: userId,
        paymentCollectionId: paymentCollectionId,
        paymentCollectionTypeId: paymentCollectionType.id,
        paymentAmount: billingValue,
        referenceCode: referenceCode,
        promoCode: detailSfa.paymentCollection.paymentCollectionMethod.promoNo,
        principalId: principal.id,
        paymentCollectionMethodAmount: promoValue,
        filename: promoImage ? promoImage.fileName ? promoImage.fileName : null : null,
        type: promoImage ? promoImage.fileType ? promoImage.fileType : null :null,
        image: promoImage ? promoImage.fileData ? promoImage.fileData : null : null
      };
      dispatch(sfaEditCollectionProcess(data));
    } else if (paymentCollectionType.name === TUNAI) {
      const data = {
        userSellerId: userId,
        paymentCollectionId: paymentCollectionId,
        paymentAmount: paidAmount,
        paymentCollectionTypeId: paymentCollectionType.id
      };
      dispatch(sfaEditCollectionProcess(data));
    } else if (paymentCollectionType.name === CEK || GIRO) {
      const data = {
        userSellerId: userId,
        paymentCollectionId: paymentCollectionId,
        paymentCollectionTypeId: paymentCollectionType.id,
        paymentAmount: paidAmount,
        referenceCode: reference,
        bankId: dataBank.id,
        issuedDate: issuedDate,
        invalidDate: invalidDate,
        paymentCollectionMethodAmount: balanceValue,
        stampId: dataStamp ? dataStamp.id : null,
        isUsedStamp: dataStamp ? true : false
      };
      dispatch(sfaEditCollectionProcess(data));
    }
  };

  const editCollectionNewData = data => {
    setNewDataDetailSfa(data);
  };

  const isChangedData = data => {
    setIsChanged(data);
  };

  const isMateraiCheckData = data => {
    setIsMateraiCheck(data);
  };

  const dataReferenceCode = data => {
    setReferenceCode(data);
  };

  const dataBankSource = data => {
    setBankSource(data);
  };

  const dataBankAccount = data => {
    setBankAccount(data);
  };

  const dataTransferDate = data => {
    setTransferDate(data);
  };

  const dataTranserValue = data => {
    setTransferValue(data);
    setTotalBilling((dataStamp ? dataStamp.nominal : 0) + data)
  };

  const dataBillingValue = data => {
    setBillingValue(data);
    setTotalBilling((dataStamp ? dataStamp.nominal : 0) + data)
  };

  const dataTransferImage = data => {
    setTransferImage(data);
  };

  const dataPrincipal = data => {
    setPrincipal(data);
  };

  const dataPromoValue = data => {
    setPromoValue(data);
  };

  const dataPromoImage = data => {
    setPromoImage(data);
  };

  //FUNCTION FOR EDIT CHECK & GIRO
  const onChangePaidAmount = data => {
    setPaidAmount(data);
    setTotalBilling((dataStamp ? dataStamp.nominal : 0) + data)
  };

  const onChangeReference = data => {
    setReference(data);
  };

  const onChangeBalanceValue = data => {
    setBalanceValue(data);
  };

  const onChangeIssuedDate = data => {
    setIssuedDate(data);
  };

  const onChangeDueDate = data => {
    setInvalidDate(data);
  };

  const onChangeDataBank = data => {
    setDataBank(data);
  };

  const onChangeDataStamp = data => {
    setDataStamp(data);
    setTotalBilling((data ? data.nominal : 0) + paidAmount)
  };

  const buttonDisabled = data => {
    setIsButtonDisabled(data);
  };
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  const renderFakturInfo = () => {
    return (
      <View style={styles.container}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View>
            <Text style={Fonts.type48}>Informasi Faktur</Text>
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          {renderItemFakturInfo()}
        </View>
      </View>
    );
  };

  const renderItemFakturInfo = () => {
    const detailSfa = dataSfaGetDetail.data;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>Nama Faktur</Text>
          <Text style={Fonts.type17}>{detailSfa.invoiceGroupName}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>No. Pesanan</Text>
          <Text style={Fonts.type17}>{detailSfa.orderCode}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>No. Referensi</Text>
          <Text style={Fonts.type17}>
            {detailSfa.orderRef === null || detailSfa.orderRef === ''
              ? '-'
              : detailSfa.orderRef}
          </Text>
        </View>
      </View>
    );
  };

  const renderCollectionInfo = () => {
    const detailSfa = dataSfaGetDetail.data;
    const stamp = dataSfaGetCollectionDetail.paymentCollection.paymentCollectionMethod.stamp
    return (
      <View style={styles.container}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View>
            <Text style={Fonts.type48}>Informasi Tagihan</Text>
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={Fonts.type17}>Sisa Tagihan</Text>
            <Text style={Fonts.type100}>
              {MoneyFormatSpace( dataSfaGetCollectionDetail.outstanding + dataSfaGetCollectionDetail.paymentCollection.paidByCollectionMethod + (stamp? stamp.nominal : 0))}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCollectionDetail = () => {
    const collectionMethodType =
      dataSfaGetCollectionDetail.paymentCollection.paymentCollectionMethod
        .paymentCollectionType;
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { marginBottom: 16 }]}>
          <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
            <View>
              <Text style={Fonts.type48}>Detil Penagihan</Text>
            </View>
            <View
              style={[
                GlobalStyle.lines,
                { marginVertical: 8, marginBottom: 16 }
              ]}
            />
            <View style={{ marginLeft: -16 }}>
              <InputType5
                title={`Metode Penagihan`}
                placeholder={collectionMethodType.name}
                editable={false}
              />
              <View style={{ marginLeft: 16 }}>{renderEditForm()}</View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderEditForm = () => {
    const paymentCollectionType =
      detailSfa.paymentCollection.paymentCollectionMethod.paymentCollectionType;
    if (paymentCollectionType.name === TUNAI) {
      return (
        <SfaEditCollectionCash
          data={detailSfa}
          onChangePaidAmount={onChangePaidAmount}
          isChanged={isChangedData}
        />
      );
    } else if (paymentCollectionType.name === TRANSFER) {
      return (
        <SfaEditCollectionTransfer
          data={detailSfa}
          newData={editCollectionNewData}
          isChanged={isChangedData}
          referenceCode={dataReferenceCode}
          bankSource={dataBankSource}
          bankAccount={dataBankAccount}
          transferDate={dataTransferDate}
          transferValue={dataTranserValue}
          billingValue={dataBillingValue}
          transferImage={dataTransferImage}
          buttonDisabled={buttonDisabled}
        />
      );
    } else if (paymentCollectionType.name === PROMO) {
      return (
        <SfaEditCollectionPromo
          data={detailSfa}
          newData={editCollectionNewData}
          isChanged={isChangedData}
          referenceCode={dataReferenceCode}
          principal={dataPrincipal}
          promoValue={dataPromoValue}
          billingPromoValue={dataBillingValue}
          promoImage={dataPromoImage}
          buttonDisabled={buttonDisabled}
        />
      );
    } else if (
      paymentCollectionType.name === CEK ||
      paymentCollectionType.name === GIRO
    ) {
      return (
        <SfaEditCollectionCheckGiro
          data={detailSfa}
          isPrimary={isPrimary}
          onChangePaidAmount={onChangePaidAmount}
          onChangeReference={onChangeReference}
          onChangeBalanceValue={onChangeBalanceValue}
          onChangeIssuedDate={onChangeIssuedDate}
          onChangeDueDate={onChangeDueDate}
          onChangeDataBank={onChangeDataBank}
          onChangeDataStamp={onChangeDataStamp}
          isChanged={isChangedData}
          checkMaterai={isMateraiCheckData}
        />
      );
    } else {
      return <View />;
    }
  };

  const openModalConfirmation = () => {
    setOpenModalEditConfirmation(true);
  };

  const renderButtonSave = () => {
    const paymentCollectionType = detailSfa.paymentCollection.paymentCollectionMethod.paymentCollectionType;
    return (
      <View>
        <View style={{marginTop: 17, marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={Fonts.type88}>Total Penagihan</Text>
          <Text style={Fonts.type112p}>{MoneyFormatSpace(totalBilling)}</Text>
        </View>
        <ButtonSingle
          disabled={
            loadingSfaEditCollection || isButtonDisabled ||
            (
              paymentCollectionType.name === CEK || paymentCollectionType.name === GIRO ?
                isMateraiCheck ?
                  dataStamp ?
                    false : true 
                : false
              : false
            )
          }
          loading={loadingSfaEditCollection}
          title={'Simpan'}
          borderRadius={4}
          onPress={() => openModalConfirmation()}
        />
      </View>
    );
  };

  //RENDER MODAL

  /** MODAL EDIT CONFIRMATION */
  const renderModalEditConfirmation = () => {
    return (
      <View>
        {openModalEditConfirmation ? (
          <ModalConfirmation
            statusBarWhite
            title={'Ubah Transaksi'}
            open={openModalEditConfirmation}
            content={
              'Transaksi dengan nomor referensi yang sama juga akan terubah ?'
            }
            type={'okeNotRed'}
            okText={'Ya, Ubah'}
            cancelText={'Tidak'}
            ok={() => {
              setOpenModalEditConfirmation(false);
              saveEditCollection();
            }}
            cancel={() => setOpenModalEditConfirmation(false)}
          />
        ) : (
          <View />
        )}
      </View>
    );
  };

  /** MODAL BACK EDIT COLLECTION */
  const renderModalBackEdit = () => {
    return (
      <View>
        {openModalBackEdit ? (
          <ModalConfirmation
            statusBarWhite
            title={'Keluar Halaman?'}
            open={openModalBackEdit}
            content={
              'Perubahan yang telah Anda lakukan tidak akan tersimpan'
            }
            type={'okeNotRed'}
            okText={'Ya, Keluar'}
            cancelText={'Tidak'}
            ok={() => {
              setOpenModalBackEdit(false);
              handleBackEdit();
            }}
            cancel={() => setOpenModalBackEdit(false)}
          />
        ) : (
          <View />
        )}
      </View>
    );
  };

  /** MODAL ERROR EDIT COLLECTION */
  const renderModalErrorEditCollection = () => {
    return openModalErrorEditCollection ? (
      <View>
        <ModalBottomFailPayment
          open={openModalErrorEditCollection}
          onPress={() => setOpenModalErrorEditCollection(false)}
          text={errorSfaEditCollection.data.errorMessage}
          buttonTitle={'Ubah Transaksi'}
          errorTittle={'Gagal Mengubah Transaksi'}
        />
      </View>
    ) : (
      <View />
    );
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {renderHeader()}
          {renderFakturInfo()}
          {renderCollectionInfo()}
          {renderCollectionDetail()}
          {renderModalEditConfirmation()}
          {renderModalErrorEditCollection()}
          {renderModalBackEdit()}
        </ScrollView>
        {renderButtonSave()}
      </View>
    );
  };
  return <>{dataSfaGetCollectionDetail ? renderContent() : <LoadingPage />}</>;
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  container: {
    marginHorizontal: 16,
    marginTop: 16
  },
  cardTaskList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: masterColor.backgroundWhite
  },
  inputField: {
    marginTop: 16
  },
  headerContainer: {
    backgroundColor: masterColor.backgroundWhite,
    height: 56,
    justifyContent: 'center'
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row'
  },
  headerBody: {
    marginHorizontal: 8,
    marginVertical: 16
  },
  headerLine: {
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 1
  }
});
export default SfaEditCollectionView;

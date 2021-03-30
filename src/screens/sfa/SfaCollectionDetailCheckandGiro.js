import {React, View, StyleSheet} from '../../library/reactPackage';
import {moment} from '../../library/thirdPartyPackage';
import {InputType5} from '../../library/component';
import { toLocalTime} from '../../helpers/TimeHelper';
import { MoneyFormatSpace } from '../../helpers';

const SfaCollectionDetailCheckandGiro = (props) => {
    const data = props.data

     /**
   * *********************************
   * FUNCTION
   * *********************************
   */
  const formatDate = (date) => {
    const local = toLocalTime(date)
    return (
    moment(local).format(
        'DD MMMM YYYY'
      )
    )
  }
    return (
        <>
        <View style={styles.inputField}>
          <InputType5
            title={`Nomor Referensi`}
            placeholder={data.referenceCode}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Sumber Bank`}
            placeholder={data.bankSource}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Tanggal Terbit`}
            placeholder={formatDate(data.collectionMethodDate)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Tanggal Jatuh Tempo`}
            placeholder={formatDate(data.collectionMethodDueDate)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nilai ${data.collectionMethodType}`}
            placeholder={MoneyFormatSpace(data.paymentCollectionMethodAmount)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Jumlah Penagihan`}
            placeholder={MoneyFormatSpace(data.paidAmount)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nilai Materai`}
            placeholder={MoneyFormatSpace(data.stampAmount)}
            editable={false}
          />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputField: {
        marginTop: 16
      }
})
export default SfaCollectionDetailCheckandGiro
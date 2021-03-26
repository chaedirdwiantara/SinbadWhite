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
            placeholder={formatDate(data.issuedDate)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Tanggal Jatuh Tempo`}
            placeholder={formatDate(data.invalidDate)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nilai ${data.collectionMethod}`}
            placeholder={MoneyFormatSpace(data.checkAmount)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Jumlah Penagihan`}
            placeholder={MoneyFormatSpace(data.billingAmount)}
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
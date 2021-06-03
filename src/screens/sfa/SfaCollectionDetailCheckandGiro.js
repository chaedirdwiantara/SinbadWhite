import {React, View, StyleSheet} from '../../library/reactPackage';
import {moment} from '../../library/thirdPartyPackage';
import {InputType5} from '../../library/component';
import { toLocalTime} from '../../helpers/TimeHelper';
import { MoneyFormatSpace } from '../../helpers';

const SfaCollectionDetailCheckandGiro = (props) => {
    const data = props.data
    const paymentCollection = data.paymentCollection
    const paymentCollectionMethod = paymentCollection.paymentCollectionMethod

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
            placeholder={paymentCollectionMethod.reference? paymentCollectionMethod.reference: ''}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Sumber Bank`}
            placeholder={paymentCollectionMethod.bankFrom?paymentCollectionMethod.bankFrom.name:''}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Tanggal Terbit`}
            placeholder={formatDate(paymentCollectionMethod.date? paymentCollectionMethod.date : '' )}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Tanggal Jatuh Tempo`}
            placeholder={formatDate(paymentCollectionMethod.dueDate? paymentCollectionMethod.dueDate: '' )}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nilai ${paymentCollectionMethod.paymentCollectionType.name? paymentCollectionMethod.paymentCollectionType.name : ''}`}
            placeholder={MoneyFormatSpace(paymentCollectionMethod.amount ? paymentCollectionMethod.amount : 0)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Jumlah Penagihan`}
            placeholder={MoneyFormatSpace(paymentCollection.paidAmount ? paymentCollection.paidAmount : 0)}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nilai Materai`}
            placeholder={MoneyFormatSpace(paymentCollectionMethod.stamp ? paymentCollectionMethod.stamp.nominal : 0)}
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
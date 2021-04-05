import {React, View, StyleSheet, Text, Image} from '../../library/reactPackage';
import {moment} from '../../library/thirdPartyPackage';
import {InputType5} from '../../library/component';
import { toLocalTime} from '../../helpers/TimeHelper';
import { Fonts, MoneyFormatSpace } from '../../helpers';

const SfaCollectionDetailTransfer = (props) => {
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
            placeholder={paymentCollection.reference? paymentCollection.reference: ''}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Sumber Bank`}
            placeholder={paymentCollectionMethod.bankFrom.name?paymentCollectionMethod.bankFrom.name:''}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Tujuan Bank`}
            placeholder={paymentCollectionMethod.bankToAccount.name?paymentCollectionMethod.bankToAccount.name:''}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Tanggal Transfer`}
            placeholder={formatDate(paymentCollectionMethod.date? paymentCollectionMethod.date : '')}
            editable={false}
          />
        </View>
        <View style={styles.inputField}>
          <InputType5
            title={`Nilai Transfer`}
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
        <View style={styles.imageContainer}>
          <Text style={Fonts.type10}>Foto/Gambar</Text>
         
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputField: {
        marginTop: 16
      },
    imageContainer: {
        padding: 16
    }
      
})
export default SfaCollectionDetailTransfer